// prisma/seed/seed.ts
import { PrismaClient, Role, ApplicationStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");

    const TOTAL_USERS = 50;

    const createdUsers: { id: string; email: string }[] = [];
    const createdJobs: { id: string; userId: string }[] = [];

    // 1) Create users and points
    for (let i = 0; i < TOTAL_USERS; i++) {
        const fullName = faker.person.fullName();
        const email = faker.internet.email({ firstName: fullName.split(" ")[0] });
        const password = faker.internet.password({ length: 10 }); // placeholder hashed password or plaintext depending on your dev workflow
        const location = `${faker.location.city()}, ${faker.location.country()}`;
        const image = faker.image.avatar();

        const user = await prisma.user.create({
            data: {
                name: fullName,
                email,
                password,
                role: Role.USER,
                image,
                location,
                // resume and other optional fields left as defaults or small fake string
                resume: faker.lorem.sentence(),
            },
        });

        createdUsers.push({ id: user.id, email: user.email });

        // create Points record for user
        await prisma.point.create({
            data: {
                userId: user.id,
                points: faker.number.int({ min: 0, max: 200 }),
                default_point: 100,
                // last_reset uses default now(), so we can omit or set to faker date
            },
        });
    }
    console.log(`Created ${createdUsers.length} users and points.`);

    // 2) Create jobs. For each user create 0-3 jobs
    const categories = [
        "Engineering",
        "Design",
        "Marketing",
        "Sales",
        "Customer Support",
        "Product",
        "Data Science",
        "HR",
    ];
    const levels = ["Intern", "Junior", "Mid", "Senior", "Lead", "Principal"];

    for (const u of createdUsers) {
        const jobsCount = faker.number.int({ min: 0, max: 3 });
        for (let j = 0; j < jobsCount; j++) {
            const salary = faker.number.float({ min: 20000, max: 200000, fractionDigits: 2 });
            const title = faker.hacker.phrase();
            const description = faker.lorem.paragraphs({ min: 1, max: 3 });
            const location = faker.location.city();
            const category = faker.helpers.arrayElement(categories);
            const level = faker.helpers.arrayElement(levels);
            const visible = faker.datatype.boolean();
            const dateInt = Math.floor(Date.now() / 1000); // seconds since epoch as Int

            const job = await prisma.job.create({
                data: {
                    title,
                    description,
                    location,
                    category,
                    level,
                    salary,
                    date: dateInt,
                    visible,
                    userID: u.id,
                },
            });

            createdJobs.push({ id: job.id, userId: u.id });
        }
    }

    console.log(`Created ${createdJobs.length} jobs.`);

    // 3) Create job applications randomly
    // We'll create up to TOTAL_USERS * 1 applications (some users apply to jobs)
    const maxApplications = TOTAL_USERS;
    let createdApplications = 0;

    for (let k = 0; k < maxApplications; k++) {
        // choose random user (applicant) and random job
        const applicant = faker.helpers.arrayElement(createdUsers);
        const job = faker.helpers.arrayElement(createdJobs);

        if (!job) continue; // if no jobs exist, skip

        // avoid applying to own job sometimes (you can allow or disallow)
        const applicantIsOwner = job.userId === applicant.id;
        if (applicantIsOwner && faker.datatype.boolean()) {
            // skip some self-applications to keep data realistic
            continue;
        }

        const status = faker.helpers.arrayElement([
            ApplicationStatus.Pending,
            ApplicationStatus.Accepted,
            ApplicationStatus.Rejected,
        ]);

        const applicationDate = new Date(faker.date.recent({ days: 90 })).toISOString();

        await prisma.jobApplication.create({
            data: {
                userId: applicant.id,
                jobId: job.id,
                status,
                date: applicationDate,
            },
        });

        createdApplications++;
    }

    console.log(`Created ${createdApplications} job applications.`);

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error("Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
