import { NextResponse } from "next/server"
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

export async function GET(request: Request) {
  try {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || ''}/book/checkout?error=paypal_not_configured`
      )
    }

    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const bookingId = searchParams.get("bookingId")

    if (!token || !bookingId) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/book/checkout?error=invalid_params`
      )
    }

    const accessToken = await getPayPalAccessToken()

    const response = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    const captureData = await response.json()

    if (captureData.status === "COMPLETED") {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { service: true },
      })

      if (booking) {
        await prisma.payment.create({
          data: {
            userId: booking.userId,
            bookingId: booking.id,
            amount: booking.service.price,
            provider: "PAYPAL",
            transactionId: captureData.id,
            status: "COMPLETED",
          },
        })

        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: "CONFIRMED" },
        })
      }

      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/book/confirmation?paypal=success`
      )
    }

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/book/checkout?booking=${bookingId}&error=payment_failed`
    )
  } catch (error) {
    console.error("PayPal capture error:", error)
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/book/checkout?error=capture_failed`
    )
  }
}
