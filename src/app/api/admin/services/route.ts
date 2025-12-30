import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const services = await prisma.service.findMany({
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const service = await prisma.service.create({
      data: {
        name: body.name,
        description: body.description,
        type: body.type,
        price: body.price,
        duration: body.duration,
        maxStudents: body.maxStudents,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    )
  }
}
