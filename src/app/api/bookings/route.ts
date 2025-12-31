import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const bookingSchema = z.object({
  serviceId: z.string(),
  dateTime: z.string().transform((val) => new Date(val)),
  notes: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const upcoming = searchParams.get("upcoming")

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
        ...(status && { status: status as any }),
        ...(upcoming === "true" && {
          dateTime: { gte: new Date() },
          status: { in: ["PENDING", "CONFIRMED"] }
        }),
      },
      include: {
        service: true,
        payment: true,
      },
      orderBy: { dateTime: upcoming === "true" ? "asc" : "desc" },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { serviceId, dateTime, notes } = bookingSchema.parse(body)

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    })

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      )
    }

    const endTime = new Date(dateTime)
    endTime.setMinutes(endTime.getMinutes() + service.duration)

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        serviceId,
        dateTime,
        endTime,
        notes,
        status: "PENDING",
      },
      include: {
        service: true,
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    )
  }
}
