import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
})

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const { bookingId, userId } = session.metadata!

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true },
    })

    if (booking) {
      await prisma.payment.create({
        data: {
          userId,
          bookingId,
          amount: booking.service.price,
          provider: "STRIPE",
          transactionId: session.payment_intent as string,
          status: "COMPLETED",
        },
      })

      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
      })
    }
  }

  return NextResponse.json({ received: true })
}
