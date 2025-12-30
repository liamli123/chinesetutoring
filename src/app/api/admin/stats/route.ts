import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [totalStudents, totalBookings, payments, upcomingLessons] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.booking.count(),
      prisma.payment.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.booking.count({
        where: {
          status: "CONFIRMED",
          dateTime: {
            gte: new Date(),
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ])

    return NextResponse.json({
      totalStudents,
      totalBookings,
      totalRevenue: payments._sum.amount || 0,
      upcomingLessons,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
