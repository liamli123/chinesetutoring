"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Video, Users, Package, Clock, ArrowRight, Check, Loader2 } from "lucide-react"
import { format, addDays, setHours, setMinutes, isBefore, isAfter } from "date-fns"

const services = [
  {
    id: "one-on-one",
    type: "ONE_ON_ONE",
    name: "1-on-1 Tutoring Session",
    description: "Personalized academic instruction tailored to your goals",
    price: 50,
    duration: 60,
    icon: Video,
  },
  {
    id: "group",
    type: "GROUP",
    name: "Group Tutoring",
    description: "Small group sessions with other students",
    price: 25,
    duration: 90,
    icon: Users,
  },
]

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
]

function BookContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(
    searchParams.get("type") || null
  )
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notes, setNotes] = useState("")

  const selectedServiceData = services.find(s => s.id === selectedService)

  const disabledDays = (date: Date) => {
    return isBefore(date, new Date()) || isAfter(date, addDays(new Date(), 30))
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep(2)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleBooking = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=/book?type=${selectedService}`)
      return
    }

    if (!selectedServiceData || !selectedDate || !selectedTime) return

    setIsSubmitting(true)

    const [hours, minutes] = selectedTime.split(":").map(Number)
    const dateTime = setMinutes(setHours(selectedDate, hours), minutes)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedServiceData.id,
          dateTime: dateTime.toISOString(),
          notes,
        }),
      })

      if (response.ok) {
        const booking = await response.json()
        router.push(`/book/checkout?booking=${booking.id}`)
      }
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-600 text-white border-0">Book a Session</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Schedule Your Tutoring Session
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choose your session type, pick a date and time, and you&apos;re all set!
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {["Select Service", "Choose Date & Time", "Confirm & Pay"].map((label, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step > i + 1 ? "bg-green-500 text-white" :
                  step === i + 1 ? "bg-blue-600 text-white" :
                  "bg-gray-200 text-gray-600"
                }`}>
                  {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  step === i + 1 ? "font-medium text-gray-900" : "text-gray-500"
                }`}>
                  {label}
                </span>
                {i < 2 && <ArrowRight className="h-4 w-4 mx-4 text-gray-400" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Content */}
      <section className="py-12 flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Select Your Lesson Type
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedService === service.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <service.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        {selectedService === service.id && (
                          <Badge className="bg-blue-600">Selected</Badge>
                        )}
                      </div>
                      <CardTitle className="mt-4">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          {service.duration} minutes
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${service.price}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Package Option */}
              <Card className="mt-6 bg-gradient-to-r from-amber-50 to-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">Looking for better value?</h3>
                      <p className="text-sm text-gray-600">Save up to 30% with our lesson packages</p>
                    </div>
                    <Link href="/services#packages">
                      <Button variant="gold">View Packages</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && selectedServiceData && (
            <div>
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="mb-6"
              >
                &larr; Back to services
              </Button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Choose Date & Time
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Select Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={disabledDays}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedDate
                        ? `Available Times - ${format(selectedDate, "EEEE, MMMM d")}`
                        : "Select a date first"
                      }
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className={selectedTime === time ? "bg-blue-600" : ""}
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        Please select a date to see available times
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Confirm & Pay */}
          {step === 3 && selectedServiceData && selectedDate && selectedTime && (
            <div>
              <Button
                variant="ghost"
                onClick={() => setStep(2)}
                className="mb-6"
              >
                &larr; Back to date selection
              </Button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Confirm Your Booking
              </h2>
              <div className="max-w-lg mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Lesson Type</span>
                      <span className="font-medium">{selectedServiceData.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{selectedServiceData.duration} minutes</span>
                    </div>
                    <div>
                      <label className="text-gray-600 text-sm">
                        Notes for your tutor (optional)
                      </label>
                      <textarea
                        className="mt-2 w-full rounded-md border border-input px-3 py-2 text-sm"
                        placeholder="Any specific topics you'd like to cover?"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-between py-4 border-t text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-blue-600">
                        ${selectedServiceData.price}
                      </span>
                    </div>

                    {!session && (
                      <div className="bg-amber-50 text-amber-800 p-4 rounded-lg text-sm">
                        Please sign in to complete your booking
                      </div>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleBooking}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : session ? (
                        <>
                          Continue to Payment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        "Sign In to Book"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <BookContent />
    </Suspense>
  )
}
