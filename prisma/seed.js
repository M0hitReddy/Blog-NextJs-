import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      password: "alice123",
      posts: {
        create: {
          title: "Hello World",
          content: "Welcome to Prisma",
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
      password: "bob123",
      posts: {
        create: {
          title: "Hello Prisma",
          content: "This is my first post",
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
