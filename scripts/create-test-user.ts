import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createTestUser() {
  const email = 'admin@genie.com';
  const password = 'Password123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`🚀 Creating test user: ${email}`);

  try {
    // 1. Create Lead first to satisfy FK
    await prisma.lead.upsert({
      where: { email },
      create: { email },
      update: {},
    });

    // 2. Create User
    const user = await prisma.user.upsert({
      where: { email },
      update: { passwordHash: hashedPassword },
      create: {
        email,
        passwordHash: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Test user created:', user.id);
  } catch (err: any) {
    console.error('❌ Failed to create test user:', err.message);
    if (err.code) console.error('Error Code:', err.code);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
