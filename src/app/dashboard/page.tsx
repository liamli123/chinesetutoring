"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import {
  Calendar,
  Clock,
  Package,
  BookOpen,
  ArrowRight,
  Video,
  Loader2
} from "lucide-react"
import { formatDate, formatTime } from "@/lib/utils"

interface Booking {
  id: string
  dateTime: string
  status: string
  service: {
    name: string
    duration: number
  }
}

interface UserPackage {
  id: string
  sessionsRemaining: number
  expiresAt: string
  package: {
    name: string
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([])
  const [packages, setPackages] = useState<UserPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    try {
      const [bookingsRes, packagesRes] = await Promise.all([
        fetch("/api/bookings?upcoming=true"),
        fetch("/api/user/packages"),
      ])

      if (bookingsRes.ok) {
        const bookings = await bookingsRes.json()
        setUpcomingBookings(bookings.slice(0, 3))
      }

      if (packagesRes.ok) {
        const pkgs = await packagesRes.json()
        setPackages(pkgs)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  const totalSessions = packages.reduce((acc, pkg) => acc + pkg.sessionsRemaining, 0)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {session?.user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here&apos;s an overview of your learning journey
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Lessons</p>
                    <p className="text-3xl font-bold text-gray-900">{upcomingBookings.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Package Sessions</p>
                    <p className="text-3xl font-bold text-gray-900">{totalSessions}</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Lessons</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Hours Learned</p>
                    <p className="text-3xl font-bold text-gray-900">15</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upcoming Lessons */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Lessons</CardTitle>
                    <CardDescription>Your scheduled sessions</CardDescription>
                  </div>
                  <Link href="/dashboard/bookings">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <Video className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {booking.service.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(new Date(booking.dateTime))} at{" "}
                                {formatTime(new Date(booking.dateTime))}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                booking.status === "CONFIRMED" ? "success" : "secondary"
                              }
                            >
                              {booking.status}
                            </Badge>
                            <Button size="sm">Join</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No upcoming lessons</p>
                      <Link href="/book">
                        <Button>Book a Lesson</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Packages */}
            <div className="space-y-6">
              {/* Book New Lesson */}
              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Book Your Next Lesson</h3>
                  <p className="text-red-100 mb-4">
                    Continue your learning journey with a new session
                  </p>
                  <Link href="/book">
                    <Button variant="secondary" className="w-full">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Active Packages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">My Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  {packages.length > 0 ? (
                    <div className="space-y-3">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className="p-3 bg-amber-50 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900">
                              {pkg.package.name}
                            </p>
                            <Badge variant="warning">
                              {pkg.sessionsRemaining} left
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">
                            Expires: {formatDate(new Date(pkg.expiresAt))}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600 text-sm mb-3">
                        No active packages
                      </p>
                      <Link href="/services#packages">
                        <Button variant="outline" size="sm">
                          View Packages
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Learning Tip */}
              <Card className="bg-gradient-to-br from-amber-50 to-red-50">
                <CardContent className="pt-6 text-center">
                  <div className="text-5xl mb-3">&#x52A0;&#x6CB9;</div>
                  <p className="text-gray-600 text-sm">jiāyóu - Keep it up!</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Practice makes perfect. Try to study a little every day!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
