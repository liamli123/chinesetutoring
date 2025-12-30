import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const service = await prisma.service.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        type: body.type,
        price: body.price,
        duration: body.duration,
        maxStudents: body.maxStudents,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await prisma.service.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Service deleted" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    )
  }
}
