import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const availability = await prisma.availability.findMany({
      where: { isActive: true },
      orderBy: { dayOfWeek: "asc" },
    })

    return NextResponse.json(availability)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    )
  }
}
