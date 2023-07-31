import { UserRole, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const prismaService = new PrismaService();
async function initial() {
  await prismaService.user.create({
    data: {
      email: '123132@email.com',
      username: '12313',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });
}

initial().catch((err) => {
  console.log(err);
  process.exit(1);
});
