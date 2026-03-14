// prisma/seed/seed.ts
import { PrismaClient, Role, JobType } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding started...");

    const USER_COUNT = 5;
    const JOBS_PER_USER = 5;

    const users: { id: string }[] = [];

    // -------------------------------
    // 1. Create Users + Points
    // -------------------------------
    for (let i = 0; i < USER_COUNT; i++) {
        const user = await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 10 }),
                role: Role.USER,
                image: faker.image.avatar(),
                location: `${faker.location.city()}, ${faker.location.country()}`,
                resumeUrl: faker.lorem.sentence(),
            },
        });

        // Assign default points (100)
        await prisma.point.create({
            data: {
                userId: user.id,
                points: 100,
                default_point: 100,
            },
        });

        users.push({ id: user.id });
    }

    console.log(`✅ Created ${users.length} users with points`);

    // -------------------------------
    // 2. Create Jobs (5 per user)
    // -------------------------------
    const categories = [
        "Software Engineering",
        "Design",
        "Marketing",
        "Data Science",
        "Product",
    ];

    const levels = ["Intern", "Junior", "Mid", "Senior"];

    for (const user of users) {
        for (let j = 0; j < JOBS_PER_USER; j++) {
            await prisma.job.create({
                data: {
                    title: faker.person.jobTitle(),
                    description: faker.lorem.paragraph(),
                    location: faker.location.city(),
                    category: faker.helpers.arrayElement(categories),
                    level: faker.helpers.arrayElement(levels),
                    salary: faker.number.int({ min: 50000, max: 300000 }),
                    bannerImage: faker.image.urlLoremFlickr({ category: "office" }),
                    requirements: [
                        faker.lorem.words(3),
                        faker.lorem.words(4),
                        faker.lorem.words(5),
                    ],
                    qualifications: [
                        faker.lorem.words(4),
                        faker.lorem.words(5),
                    ],
                    jobType: faker.helpers.arrayElement([
                        JobType.FullTime,
                        JobType.PartTime,
                        JobType.Remote,
                        JobType.Contract,
                        JobType.Internship,
                    ]),
                    visible: true,
                    userID: user.id,
                },
            });
        }
    }

    console.log(`✅ Created ${USER_COUNT * JOBS_PER_USER} jobs`);
    console.log("🌱 Seeding finished successfully");
}

main()
    .catch((err) => {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
