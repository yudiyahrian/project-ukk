import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      role: Role.admin,
      password,
    },
  });
  const default_album_1 = await prisma.album.upsert({
    where: { id: "user-profile-image" },
    update: {},
    create: {
      id: "user-profile-image",
      name: "Profile Image",
    },
  });
  const default_album_2 = await prisma.album.upsert({
    where: { id: "user-banner-image" },
    update: {},
    create: {
      id: "user-banner-image",
      name: "Banner Image",
    },
  });
  const default_album_3 = await prisma.album.upsert({
    where: { id: "user-saved-image" },
    update: {},
    create: {
      id: "user-saved-image",
      name: "Saved Image",
    },
  });
  console.log({ user, default_album_1, default_album_2, default_album_3 });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
