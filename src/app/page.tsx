import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Clock,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Video,
  Package
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 chinese-pattern opacity-10"></div>
        <div className="absolute top-10 right-10 text-[200px] font-bold opacity-10 hidden lg:block">
          &#x4E2D;&#x6587;
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-amber-500 text-white border-0">
              Start Learning Today
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master Mandarin Chinese with{" "}
              <span className="text-amber-400">Expert Tutors</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 leading-relaxed">
              Personalized 1-on-1 lessons, engaging group classes, and flexible packages
              designed for English speakers at every level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <Button size="xl" variant="gold" className="font-semibold">
                  Book Your First Lesson
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="xl" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-700">
                  Explore Services
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-8 mt-12 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-amber-400" />
                <span>Free Trial Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-amber-400" />
                <span>Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-amber-400" />
                <span>Native Teachers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600">500+</div>
              <div className="text-gray-600 mt-1">Students Taught</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600">10,000+</div>
              <div className="text-gray-600 mt-1">Lessons Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600">4.9</div>
              <div className="text-gray-600 mt-1">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600">5+</div>
              <div className="text-gray-600 mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you prefer individual attention or group learning, we have the perfect option for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 1-on-1 Lessons */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-shadow border-2 hover:border-red-200">
              <div className="absolute top-0 right-0 w-32 h-32 text-red-50 text-8xl font-bold">
                &#x4E00;
              </div>
              <CardHeader className="relative">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">1-on-1 Lessons</CardTitle>
                <CardDescription>Personalized attention for maximum progress</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Customized curriculum
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Flexible scheduling
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Focus on your goals
                  </li>
                </ul>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-gray-900">$50</span>
                  <span className="text-gray-600">/ hour</span>
                </div>
                <Link href="/book">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Group Classes */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-shadow border-2 border-red-500 scale-105">
              <Badge className="absolute top-4 right-4 bg-red-600">Popular</Badge>
              <div className="absolute top-0 right-0 w-32 h-32 text-red-50 text-8xl font-bold">
                &#x7FA4;
              </div>
              <CardHeader className="relative">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Group Classes</CardTitle>
                <CardDescription>Learn together, grow together</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Small groups (4-8 students)
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Interactive activities
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Practice with peers
                  </li>
                </ul>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-gray-900">$25</span>
                  <span className="text-gray-600">/ hour</span>
                </div>
                <Link href="/book">
                  <Button className="w-full">Join Class</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Packages */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-shadow border-2 hover:border-red-200">
              <div className="absolute top-0 right-0 w-32 h-32 text-red-50 text-8xl font-bold">
                &#x5305;
              </div>
              <CardHeader className="relative">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-xl">Lesson Packages</CardTitle>
                <CardDescription>Best value for committed learners</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Save up to 20%
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Flexible redemption
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Priority booking
                  </li>
                </ul>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-gray-900">$400</span>
                  <span className="text-gray-600">/ 10 lessons</span>
                </div>
                <Link href="/services#packages">
                  <Button variant="gold" className="w-full">View Packages</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Success is Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We combine traditional teaching methods with modern technology to create
                an engaging and effective learning experience tailored to your needs.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Certified Native Teachers</h3>
                    <p className="text-gray-600">All our tutors are native Mandarin speakers with teaching certifications and years of experience.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Structured Curriculum</h3>
                    <p className="text-gray-600">Follow a proven learning path from beginner to advanced, with clear milestones and progress tracking.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Flexible Scheduling</h3>
                    <p className="text-gray-600">Book lessons that fit your schedule. Available 7 days a week with easy rescheduling.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-100 to-amber-100 rounded-2xl p-8 lg:p-12">
                <div className="text-center">
                  <div className="text-8xl mb-4">&#x5B66;&#x4E60;</div>
                  <p className="text-gray-600 text-lg">xuéxí - to learn, to study</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-4xl mb-2">&#x542C;</div>
                    <p className="text-sm text-gray-600">Listening</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-4xl mb-2">&#x8BF4;</div>
                    <p className="text-sm text-gray-600">Speaking</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-4xl mb-2">&#x8BFB;</div>
                    <p className="text-sm text-gray-600">Reading</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-4xl mb-2">&#x5199;</div>
                    <p className="text-sm text-gray-600">Writing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Business Professional",
                content: "I went from zero Chinese to holding basic conversations in just 3 months. The 1-on-1 lessons were exactly what I needed for my business trips to Shanghai.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Heritage Learner",
                content: "Growing up, I only spoke English. Now I can finally communicate with my grandparents in Mandarin. The group classes made learning fun and social.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "University Student",
                content: "The lesson packages saved me money and kept me committed. I passed my HSK 4 exam with flying colors thanks to the structured curriculum.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 chinese-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Chinese Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Book your first lesson today and take the first step towards fluency.
            New students get a free trial lesson!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="xl" variant="gold" className="font-semibold">
                Book Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="xl" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
