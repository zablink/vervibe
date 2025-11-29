import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, data } = body

    // Verify webhook signature (implement in production)
    // const signature = request.headers.get('omise-signature')

    switch (key) {
      case 'charge.complete':
        await handleChargeComplete(data)
        break
      
      case 'charge.failed':
        await handleChargeFailed(data)
        break
      
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(data)
        break
      
      default:
        console.log('Unhandled webhook event:', key)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function handleChargeComplete(data: any) {
  const { id: chargeId, amount, metadata } = data

  // Update payment status
  await prisma.payment.updateMany({
    where: { omiseChargeId: chargeId },
    data: {
      status: 'SUCCEEDED',
      paidAt: new Date(),
    },
  })

  // Get subscription and create notification
  const payment = await prisma.payment.findFirst({
    where: { omiseChargeId: chargeId },
    include: {
      subscription: {
        include: {
          fan: true,
          tier: {
            include: {
              artist: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (payment) {
    // Notify artist
    await prisma.notification.create({
      data: {
        userId: payment.subscription.tier.artist.userId,
        type: 'PAYMENT_SUCCESS',
        title: 'ได้รับเงินจากสมาชิกใหม่',
        message: `${payment.subscription.fan.fullName} สมัครสมาชิก ${payment.subscription.tier.name}`,
        linkUrl: `/dashboard/members`,
      },
    })

    // Notify fan
    await prisma.notification.create({
      data: {
        userId: payment.subscription.fanId,
        type: 'PAYMENT_SUCCESS',
        title: 'ชำระเงินสำเร็จ',
        message: `คุณได้สมัครสมาชิก ${payment.subscription.tier.name} กับ ${payment.subscription.tier.artist.displayName} แล้ว`,
        linkUrl: `/artist/${payment.subscription.tier.artist.slug}`,
      },
    })
  }
}

async function handleChargeFailed(data: any) {
  const { id: chargeId, failure_message } = data

  // Update payment status
  await prisma.payment.updateMany({
    where: { omiseChargeId: chargeId },
    data: {
      status: 'FAILED',
    },
  })

  // Get subscription and notify
  const payment = await prisma.payment.findFirst({
    where: { omiseChargeId: chargeId },
    include: {
      subscription: {
        include: {
          fan: true,
        },
      },
    },
  })

  if (payment) {
    await prisma.notification.create({
      data: {
        userId: payment.subscription.fanId,
        type: 'PAYMENT_FAILED',
        title: 'การชำระเงินล้มเหลว',
        message: `การชำระเงินล้มเหลว: ${failure_message}`,
        linkUrl: `/dashboard/subscriptions`,
      },
    })

    // Update subscription status if payment failed
    await prisma.subscription.update({
      where: { id: payment.subscriptionId },
      data: { status: 'FAILED' },
    })
  }
}

async function handleSubscriptionCancelled(data: any) {
  const { id: omiseSubscriptionId } = data

  // Update subscription status
  const subscription = await prisma.subscription.findFirst({
    where: { omiseSubscriptionId },
    include: {
      fan: true,
      tier: {
        include: {
          artist: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  })

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'CANCELLED',
        cancelAtPeriodEnd: true,
      },
    })

    // Notify artist
    await prisma.notification.create({
      data: {
        userId: subscription.tier.artist.userId,
        type: 'SUBSCRIPTION_CANCELLED',
        title: 'สมาชิกยกเลิก',
        message: `${subscription.fan.fullName} ยกเลิก ${subscription.tier.name}`,
        linkUrl: `/dashboard/members`,
      },
    })

    // Notify fan
    await prisma.notification.create({
      data: {
        userId: subscription.fanId,
        type: 'SUBSCRIPTION_CANCELLED',
        title: 'ยกเลิกสมาชิกแล้ว',
        message: `คุณได้ยกเลิกสมาชิก ${subscription.tier.name} แล้ว สมาชิกจะคงอยู่จนสิ้นสุดรอบบิล`,
        linkUrl: `/dashboard`,
      },
    })
  }
}
