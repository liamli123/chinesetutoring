import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@chinesetutoring.com" },
    update: {},
    create: {
      email: "admin@chinesetutoring.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  })
  console.log("Created admin user:", admin.email)

  // Create sample student
  const studentPassword = await bcrypt.hash("student123", 12)
  const student = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: {},
    create: {
      email: "student@example.com",
      name: "Test Student",
      password: studentPassword,
      role: "STUDENT",
    },
  })
  console.log("Created student user:", student.email)

  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: "one-on-one" },
      update: {},
      create: {
        id: "one-on-one",
        name: "1-on-1 Private Lesson",
        description: "Personalized instruction tailored to your goals",
        type: "ONE_ON_ONE",
        price: 50,
        duration: 60,
        maxStudents: 1,
      },
    }),
    prisma.service.upsert({
      where: { id: "group" },
      update: {},
      create: {
        id: "group",
        name: "Group Class",
        description: "Learn with 4-8 other students",
        type: "GROUP",
        price: 25,
        duration: 90,
        maxStudents: 8,
      },
    }),
  ])
  console.log("Created services:", services.length)

  // Create packages
  const packages = await Promise.all([
    prisma.package.upsert({
      where: { id: "starter" },
      update: {},
      create: {
        id: "starter",
        name: "Starter Pack",
        description: "5 lessons to get started",
        sessions: 5,
        price: 225,
        validDays: 60,
      },
    }),
    prisma.package.upsert({
      where: { id: "growth" },
      update: {},
      create: {
        id: "growth",
        name: "Growth Pack",
        description: "10 lessons for steady progress",
        sessions: 10,
        price: 400,
        validDays: 90,
      },
    }),
    prisma.package.upsert({
      where: { id: "mastery" },
      update: {},
      create: {
        id: "mastery",
        name: "Mastery Pack",
        description: "20 lessons for serious learners",
        sessions: 20,
        price: 700,
        validDays: 180,
      },
    }),
  ])
  console.log("Created packages:", packages.length)

  // Create default availability (Mon-Fri 9AM-6PM)
  const availabilityData = []
  for (let day = 1; day <= 5; day++) {
    availabilityData.push({
      dayOfWeek: day,
      startTime: "09:00",
      endTime: "12:00",
      isActive: true,
    })
    availabilityData.push({
      dayOfWeek: day,
      startTime: "14:00",
      endTime: "18:00",
      isActive: true,
    })
  }
  // Saturday morning
  availabilityData.push({
    dayOfWeek: 6,
    startTime: "10:00",
    endTime: "14:00",
    isActive: true,
  })

  await prisma.availability.deleteMany()
  await prisma.availability.createMany({ data: availabilityData })
  console.log("Created availability slots:", availabilityData.length)

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
