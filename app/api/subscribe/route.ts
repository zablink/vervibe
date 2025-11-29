import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import omise from '@/lib/omise'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fanId, tierId, paymentMethod, token } = body

    // Get tier details
    const tier = await prisma.membershipTier.findUnique({
      where: { id: tierId },
      include: { artist: true },
    })

    if (!tier) {
      return NextResponse.json(
        { error: 'Tier not found' },
        { status: 404 }
      )
    }

    // Get or create Omise customer
    const fan = await prisma.user.findUnique({
      where: { id: fanId },
    })

    if (!fan) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    let omiseCustomer
    const existingSub = await prisma.subscription.findFirst({
      where: { fanId },
    })

    if (existingSub?.omiseCustomerId) {
      omiseCustomer = await omise.customers.retrieve(existingSub.omiseCustomerId)
    } else {
      omiseCustomer = await omise.customers.create({
        email: fan.email,
        description: `${fan.fullName || fan.email} - VerVibe`,
      })
    }

    // Create charge based on payment method
    let charge
    if (paymentMethod === 'promptpay') {
      const source = await omise.sources.create({
        type: 'promptpay',
        amount: tier.priceCents,
        currency: 'THB',
      })

      charge = await omise.charges.create({
        amount: tier.priceCents,
        currency: 'THB',
        source: source.id,
        description: `Subscription - ${tier.name} - ${tier.artist.displayName}`,
      })

      // Return QR code for scanning
      return NextResponse.json({
        requiresAction: true,
        qrCodeUrl: source.scannable_code.image.download_uri,
        chargeId: charge.id,
      })
    } else if (paymentMethod === 'card') {
      charge = await omise.charges.create({
        amount: tier.priceCents,
        currency: 'THB',
        card: token,
        description: `Subscription - ${tier.name} - ${tier.artist.displayName}`,
        customer: omiseCustomer.id,
      })
    }

    // Create subscription in database
    const currentPeriodStart = new Date()
    const currentPeriodEnd = new Date()
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)

    const subscription = await prisma.subscription.create({
      data: {
        fanId,
        tierId,
        status: 'ACTIVE',
        startedAt: currentPeriodStart,
        currentPeriodStart,
        currentPeriodEnd,
        omiseCustomerId: omiseCustomer.id,
        omiseSubscriptionId: charge?.id,
      },
    })

    // Create payment record
    await prisma.payment.create({
      data: {
        subscriptionId: subscription.id,
        amountCents: tier.priceCents,
        currency: 'THB',
        status: charge?.paid ? 'SUCCEEDED' : 'PENDING',
        omiseChargeId: charge?.id,
        paymentMethod: paymentMethod.toUpperCase(),
        paidAt: charge?.paid ? new Date() : null,
      },
    })

    // Send notification
    await prisma.notification.create({
      data: {
        userId: tier.artist.userId,
        type: 'NEW_MEMBER',
        title: 'สมาชิกใหม่!',
        message: `${fan.fullName || fan.email} เข้าร่วม ${tier.name}`,
      },
    })

    return NextResponse.json({
      success: true,
      subscription,
      charge: charge?.paid ? 'succeeded' : 'pending',
    })
  } catch (error: any) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: error.message || 'Subscription failed' },
      { status: 500 }
    )
  }
}
