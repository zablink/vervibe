import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  try {
    const users = await prisma.user.findMany({ take: 1 })
    console.log('DB connection success! Example user:', users[0] || 'No users')
  } catch (err) {
    console.error('DB connection failed:', err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
