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
    const { status } = await request.json()

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    )
  }
}
