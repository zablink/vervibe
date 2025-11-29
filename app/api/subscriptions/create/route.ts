import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import omise, { createCustomer, createSubscription } from '@/lib/omise'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, tierId, cardToken } = body

    // Get tier details
    const tier = await prisma.membershipTier.findUnique({
      where: { id: tierId },
      include: {
        artist: true,
      },
    })

    if (!tier) {
      return NextResponse.json(
        { error: 'Tier not found' },
        { status: 404 }
      )
    }

    // Get or create Omise customer
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Create Omise customer
    const customer = await createCustomer(
      user.email,
      `${user.fullName} (VV User)`
    )

    // Create subscription in Omise
    // Note: You need to create a plan in Omise first
    const omiseSubscription = await omise.subscriptions.create({
      customer: customer.id,
      plan: `tier-${tier.id}`, // Plan should be created in Omise beforehand
      card: cardToken,
    })

    // Calculate period end (1 month from now)
    const periodStart = new Date()
    const periodEnd = new Date()
    periodEnd.setMonth(periodEnd.getMonth() + 1)

    // Create subscription in database
    const subscription = await prisma.subscription.create({
      data: {
        fanId: userId,
        tierId: tier.id,
        status: 'ACTIVE',
        startedAt: periodStart,
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
        omiseCustomerId: customer.id,
        omiseSubscriptionId: omiseSubscription.id,
      },
    })

    // Create initial payment record
    await prisma.payment.create({
      data: {
        subscriptionId: subscription.id,
        amountCents: tier.priceCents,
        currency: 'THB',
        status: 'PENDING',
        paymentMethod: cardToken ? 'CARD' : 'PROMPTPAY',
      },
    })

    // Create notification for artist
    await prisma.notification.create({
      data: {
        userId: tier.artist.userId,
        type: 'NEW_MEMBER',
        title: 'สมาชิกใหม่!',
        message: `${user.fullName} สมัครสมาชิก ${tier.name}`,
        linkUrl: `/dashboard/members`,
      },
    })

    return NextResponse.json({
      success: true,
      subscription,
    })
  } catch (error: any) {
    console.error('Subscription creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    )
  }
}
