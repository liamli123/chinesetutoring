"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Clock, Loader2, Plus, Save, Trash2 } from "lucide-react"

interface Availability {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export default function AdminAvailabilityPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [availability, setAvailability] = useState<Availability[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/dashboard")
    }
  }, [status, session, router])

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchAvailability()
    }
  }, [session])

  const fetchAvailability = async () => {
    try {
      const response = await fetch("/api/admin/availability")
      if (response.ok) {
        const data = await response.json()
        setAvailability(data)
      }
    } catch (error) {
      console.error("Error fetching availability:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTimeSlot = (dayOfWeek: number) => {
    const newSlot: Availability = {
      id: `temp-${Date.now()}`,
      dayOfWeek,
      startTime: "09:00",
      endTime: "17:00",
      isActive: true,
    }
    setAvailability([...availability, newSlot])
  }

  const updateSlot = (id: string, field: string, value: string | boolean) => {
    setAvailability(
      availability.map((slot) =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    )
  }

  const removeSlot = (id: string) => {
    setAvailability(availability.filter((slot) => slot.id !== id))
  }

  const saveAvailability = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/availability", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability }),
      })

      if (response.ok) {
        fetchAvailability()
      }
    } catch (error) {
      console.error("Error saving availability:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-3xl text-red-600">&#x4E2D;</span>
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
              </Link>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/admin" className="text-gray-600 hover:text-red-600">Dashboard</Link>
              <Link href="/admin/bookings" className="text-gray-600 hover:text-red-600">Bookings</Link>
              <Link href="/admin/students" className="text-gray-600 hover:text-red-600">Students</Link>
              <Link href="/admin/services" className="text-gray-600 hover:text-red-600">Services</Link>
              <Link href="/admin/availability" className="text-red-600 font-medium">Availability</Link>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Exit Admin</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Availability</h1>
            <p className="text-gray-600 mt-1">Set your weekly teaching schedule</p>
          </div>
          <Button onClick={saveAvailability} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>

        <div className="space-y-4">
          {DAYS.map((day, index) => {
            const daySlots = availability.filter((slot) => slot.dayOfWeek === index)

            return (
              <Card key={day}>
                <CardHeader className="py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{day}</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addTimeSlot(index)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Slot
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {daySlots.length > 0 ? (
                    <div className="space-y-3">
                      {daySlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) =>
                                updateSlot(slot.id, "startTime", e.target.value)
                              }
                              className="w-32"
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) =>
                                updateSlot(slot.id, "endTime", e.target.value)
                              }
                              className="w-32"
                            />
                          </div>
                          <div className="flex items-center gap-2 ml-auto">
                            <Switch
                              checked={slot.isActive}
                              onCheckedChange={(checked) =>
                                updateSlot(slot.id, "isActive", checked)
                              }
                            />
                            <Badge variant={slot.isActive ? "success" : "secondary"}>
                              {slot.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => removeSlot(slot.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm py-2">
                      No availability set for {day}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
