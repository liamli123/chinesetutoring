import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Users, Video, Package, Clock, BookOpen, Target, Zap } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-amber-500 text-white border-0">Our Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Learning Path
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Choose from personalized 1-on-1 lessons, interactive group classes,
            or value-packed lesson packages tailored to your goals.
          </p>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="one-on-one" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="one-on-one" className="text-sm md:text-base">1-on-1 Lessons</TabsTrigger>
              <TabsTrigger value="group" className="text-sm md:text-base">Group Classes</TabsTrigger>
              <TabsTrigger value="packages" className="text-sm md:text-base">Packages</TabsTrigger>
            </TabsList>

            {/* 1-on-1 Lessons */}
            <TabsContent value="one-on-one">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Video className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">1-on-1 Private Lessons</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Get undivided attention from your tutor with lessons customized
                    to your learning style, pace, and goals. Perfect for serious learners
                    who want rapid progress.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Personalized curriculum based on your goals",
                      "Flexible scheduling - book anytime",
                      "Focus on your weaknesses",
                      "Real-time feedback and corrections",
                      "Learn at your own pace",
                      "Materials tailored to your interests"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-gray-900">$50</div>
                    <div className="text-gray-600">
                      <div className="font-medium">per hour</div>
                      <div className="text-sm">60-minute session</div>
                    </div>
                  </div>
                  <Link href="/book?type=one-on-one">
                    <Button size="lg">Book a 1-on-1 Lesson</Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Ideal for:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white">
                      <CardContent className="p-4 text-center">
                        <Target className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Goal-Oriented Learners</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardContent className="p-4 text-center">
                        <Zap className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Fast Progress Seekers</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardContent className="p-4 text-center">
                        <Clock className="h-8 w-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Busy Professionals</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Exam Preparation</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Group Classes */}
            <TabsContent value="group">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Group Classes</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    Learn alongside peers in small, interactive group sessions.
                    Practice conversation, participate in activities, and build
                    confidence in a supportive environment.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Small groups of 4-8 students",
                      "Interactive activities and games",
                      "Practice conversation with peers",
                      "Weekly scheduled sessions",
                      "Build confidence speaking",
                      "Make friends who share your interest"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-gray-900">$25</div>
                    <div className="text-gray-600">
                      <div className="font-medium">per hour</div>
                      <div className="text-sm">90-minute session</div>
                    </div>
                  </div>
                  <Link href="/book?type=group">
                    <Button size="lg">Join a Group Class</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Available Classes:</h3>
                  {[
                    { level: "Beginner", time: "Mon & Wed 7PM EST", spots: 3 },
                    { level: "Intermediate", time: "Tue & Thu 6PM EST", spots: 5 },
                    { level: "Advanced", time: "Sat 10AM EST", spots: 2 },
                    { level: "Conversation", time: "Sun 2PM EST", spots: 4 },
                  ].map((cls, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{cls.level} Chinese</p>
                          <p className="text-sm text-gray-600">{cls.time}</p>
                        </div>
                        <Badge variant={cls.spots <= 2 ? "destructive" : "secondary"}>
                          {cls.spots} spots left
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Packages */}
            <TabsContent value="packages" id="packages">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Lesson Packages</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Commit to your learning journey and save. Our packages offer
                  the best value for dedicated learners.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Starter Pack",
                    sessions: 5,
                    price: 225,
                    originalPrice: 250,
                    savings: 10,
                    validity: 60,
                    features: ["5 x 1-hour lessons", "Valid for 60 days", "Flexible scheduling", "10% savings"]
                  },
                  {
                    name: "Growth Pack",
                    sessions: 10,
                    price: 400,
                    originalPrice: 500,
                    savings: 20,
                    validity: 90,
                    popular: true,
                    features: ["10 x 1-hour lessons", "Valid for 90 days", "Priority booking", "20% savings", "Free study materials"]
                  },
                  {
                    name: "Mastery Pack",
                    sessions: 20,
                    price: 700,
                    originalPrice: 1000,
                    savings: 30,
                    validity: 180,
                    features: ["20 x 1-hour lessons", "Valid for 180 days", "VIP booking priority", "30% savings", "Free study materials", "Progress assessments"]
                  }
                ].map((pkg, i) => (
                  <Card key={i} className={`relative ${pkg.popular ? 'border-2 border-red-500 scale-105' : ''}`}>
                    {pkg.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="h-8 w-8 text-red-600" />
                      </div>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription>{pkg.sessions} lessons</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                        <span className="text-gray-500 line-through ml-2">${pkg.originalPrice}</span>
                      </div>
                      <Badge variant="success" className="mb-6">Save {pkg.savings}%</Badge>
                      <ul className="space-y-2 text-left mb-6">
                        {pkg.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/book?type=package&package=${pkg.sessions}`}>
                        <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                          Get {pkg.name}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What if I need to cancel or reschedule a lesson?",
                a: "You can reschedule or cancel any lesson up to 24 hours before the scheduled time without any penalty. Cancellations with less notice may forfeit the lesson."
              },
              {
                q: "How long are package lessons valid?",
                a: "Package validity varies: Starter Pack (60 days), Growth Pack (90 days), and Mastery Pack (180 days). We can discuss extensions for special circumstances."
              },
              {
                q: "Can I switch between 1-on-1 and group lessons?",
                a: "Yes! If you have a lesson package, you can use your credits for either 1-on-1 lessons (1 credit) or group classes (0.5 credits)."
              },
              {
                q: "What level of Chinese do you teach?",
                a: "We teach all levels from complete beginners to advanced learners. We'll assess your current level and create a customized learning plan."
              },
              {
                q: "What platform do you use for online lessons?",
                a: "We primarily use Zoom for lessons, which allows for screen sharing, digital whiteboards, and recording capabilities. Lessons can also be conducted via Google Meet or Skype."
              }
            ].map((faq, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
