"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Loader2, Lock, CheckCircle } from "lucide-react"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bookingId = searchParams.get("booking")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/book")
    }
  }, [status, router])

  const handleStripePayment = async () => {
    setIsProcessing(true)
    setError(null)
    try {
      const response = await fetch("/api/payments/stripe/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else if (data.error) {
        setError(data.error)
      } else {
        setError("Failed to create payment session")
      }
    } catch (err) {
      console.error("Stripe error:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePayPalPayment = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/payments/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      })

      const data = await response.json()

      if (data.approvalUrl) {
        window.location.href = data.approvalUrl
      }
    } catch (error) {
      console.error("PayPal error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePayment = () => {
    if (paymentMethod === "stripe") {
      handleStripePayment()
    } else {
      handlePayPalPayment()
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="py-12 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-red-600">Checkout</Badge>
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-600 mt-2">Secure payment powered by Stripe & PayPal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Payment Options */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your preferred payment option</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="stripe" onValueChange={(v) => setPaymentMethod(v as "stripe" | "paypal")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="stripe">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>

                    <TabsContent value="stripe" className="space-y-4 mt-6">
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <CreditCard className="h-8 w-8 text-gray-600" />
                        <div>
                          <p className="font-medium">Pay with Credit Card</p>
                          <p className="text-sm text-gray-500">
                            Visa, Mastercard, American Express
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Lock className="h-4 w-4" />
                        <span>Secured by Stripe encryption</span>
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="space-y-4 mt-6">
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                          PP
                        </div>
                        <div>
                          <p className="font-medium">Pay with PayPal</p>
                          <p className="text-sm text-gray-500">
                            Use your PayPal balance or linked cards
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Lock className="h-4 w-4" />
                        <span>Protected by PayPal Buyer Protection</span>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Separator className="my-6" />

                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePayment}
                    disabled={isProcessing || !bookingId}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {paymentMethod === "stripe" ? "Pay with Card" : "Pay with PayPal"}
                      </>
                    )}
                  </Button>

                  {!bookingId && (
                    <p className="mt-2 text-sm text-red-600">No booking found. Please start from the booking page.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">1-on-1 Lesson</span>
                    <span>$50.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span>60 min</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-red-600">$50.00</span>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Free cancellation up to 24h
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Instant confirmation
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Secure payment
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4 text-center text-xs text-gray-500">
                By completing this purchase, you agree to our{" "}
                <a href="/terms" className="text-red-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-red-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
