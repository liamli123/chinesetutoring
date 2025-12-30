import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")

    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        service: true,
      },
      orderBy: { dateTime: "desc" },
      ...(limit && { take: parseInt(limit) }),
    })

    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
