import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const availability = await prisma.availability.findMany({
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    })

    return NextResponse.json(availability)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { availability } = await request.json()

    // Delete all existing availability
    await prisma.availability.deleteMany()

    // Create new availability slots
    const newSlots = await prisma.availability.createMany({
      data: availability.map((slot: any) => ({
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isActive: slot.isActive,
      })),
    })

    return NextResponse.json({ message: "Availability updated", count: newSlots.count })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update availability" },
      { status: 500 }
    )
  }
}
