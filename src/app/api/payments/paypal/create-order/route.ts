import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const PAYPAL_API_URL = process.env.PAYPAL_MODE === "sandbox"
  ? "https://api-m.sandbox.paypal.com"
  : "https://api-m.paypal.com"

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64")

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request: Request) {
  try {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      return NextResponse.json({ error: "PayPal not configured" }, { status: 503 })
    }

    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { bookingId } = await request.json()

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true },
    })

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    const accessToken = await getPayPalAccessToken()

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: booking.id,
            description: `${booking.service.name} - ${booking.service.duration} min`,
            amount: {
              currency_code: "USD",
              value: booking.service.price.toFixed(2),
            },
          },
        ],
        application_context: {
          return_url: `${process.env.NEXTAUTH_URL}/api/payments/paypal/capture?bookingId=${bookingId}`,
          cancel_url: `${process.env.NEXTAUTH_URL}/book/checkout?booking=${bookingId}`,
        },
      }),
    })

    const order = await response.json()

    const approvalLink = order.links?.find(
      (link: { rel: string }) => link.rel === "approve"
    )

    return NextResponse.json({
      orderId: order.id,
      approvalUrl: approvalLink?.href,
    })
  } catch (error) {
    console.error("PayPal order error:", error)
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { status: 500 }
    )
  }
}
