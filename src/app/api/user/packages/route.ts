import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const packages = await prisma.userPackage.findMany({
      where: {
        userId: session.user.id,
        sessionsRemaining: { gt: 0 },
        expiresAt: { gt: new Date() },
      },
      include: {
        package: true,
      },
      orderBy: { expiresAt: "asc" },
    })

    return NextResponse.json(packages)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    )
  }
}
