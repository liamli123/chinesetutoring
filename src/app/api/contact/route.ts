import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = contactSchema.parse(body)

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
