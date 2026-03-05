import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const user = await prisma.user.upsert({
        where: { email: "admin@furiafit.com" },
        update: {},
        create: {
            email: "admin@furiafit.com",
            password: hashedPassword,
        },
    });

    console.log("Admin user seeded:", user.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
