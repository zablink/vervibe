const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY!,
  secretKey: process.env.OMISE_SECRET_KEY!,
})

export default omise

export const createCharge = async (amount: number, token: string, description: string) => {
  try {
    const charge = await omise.charges.create({
      amount: amount * 100, // convert to satangs
      currency: 'THB',
      card: token,
      description,
    })
    return charge
  } catch (error) {
    console.error('Omise charge error:', error)
    throw error
  }
}

export const createPromptPayCharge = async (amount: number, description: string) => {
  try {
    const source = await omise.sources.create({
      type: 'promptpay',
      amount: amount * 100,
      currency: 'THB',
    })

    const charge = await omise.charges.create({
      amount: amount * 100,
      currency: 'THB',
      source: source.id,
      description,
    })

    return { charge, qrCode: source.scannable_code.image.download_uri }
  } catch (error) {
    console.error('PromptPay charge error:', error)
    throw error
  }
}

export const createCustomer = async (email: string, description: string) => {
  try {
    const customer = await omise.customers.create({
      email,
      description,
    })
    return customer
  } catch (error) {
    console.error('Omise customer error:', error)
    throw error
  }
}

export const createSubscription = async (customerId: string, planId: string) => {
  try {
    const subscription = await omise.subscriptions.create({
      customer: customerId,
      plan: planId,
    })
    return subscription
  } catch (error) {
    console.error('Omise subscription error:', error)
    throw error
  }
}
