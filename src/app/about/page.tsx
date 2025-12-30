import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Heart, Globe, GraduationCap, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-amber-500 text-white border-0">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bridging Cultures Through Language
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Our mission is to make learning Mandarin Chinese accessible, enjoyable,
            and effective for English speakers around the world.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded with a passion for language education, Chinese Tutoring began
                  when our founder recognized a gap in quality Mandarin instruction for
                  English speakers. Having experienced the challenges of learning Chinese
                  firsthand, we understood what works and what doesn&apos;t.
                </p>
                <p>
                  Today, we&apos;ve helped hundreds of students achieve their Chinese language
                  goals - from business professionals preparing for international roles to
                  heritage learners reconnecting with their roots, and curious individuals
                  exploring one of the world&apos;s oldest and most fascinating cultures.
                </p>
                <p>
                  Our approach combines the best of traditional Chinese teaching methods with
                  modern pedagogical techniques, creating an immersive yet structured learning
                  experience that produces real results.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-amber-100 rounded-2xl p-8 text-center">
              <div className="text-9xl mb-4">&#x5E08;</div>
              <p className="text-gray-600 text-lg">shī - teacher, master</p>
              <p className="text-gray-500 text-sm mt-2">The character represents wisdom passed down through generations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience
              we create for our students.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Passion for Teaching",
                description: "We love what we do. Our enthusiasm for Chinese language and culture is contagious and makes learning enjoyable.",
                character: "&#x7231;"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We maintain the highest standards in our teaching methods, materials, and student support.",
                character: "&#x4F18;"
              },
              {
                icon: Users,
                title: "Student-Centered",
                description: "Every student is unique. We adapt our approach to match individual learning styles and goals.",
                character: "&#x751F;"
              },
              {
                icon: Globe,
                title: "Cultural Bridge",
                description: "Language is a gateway to culture. We teach not just words, but the rich context behind them.",
                character: "&#x6587;"
              },
              {
                icon: BookOpen,
                title: "Continuous Learning",
                description: "We constantly improve our methods and stay updated with the latest in language education.",
                character: "&#x8FDB;"
              },
              {
                icon: GraduationCap,
                title: "Results-Driven",
                description: "We measure our success by your progress. Your achievements are our greatest reward.",
                character: "&#x6210;"
              }
            ].map((value, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="text-4xl mb-2" dangerouslySetInnerHTML={{ __html: value.character }} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Teaching Methodology</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A balanced approach that combines multiple proven techniques for comprehensive language acquisition.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Immersive Input",
                description: "Maximum exposure to authentic Chinese through conversations, media, and real-world materials.",
                character: "&#x542C;"
              },
              {
                step: "2",
                title: "Structured Grammar",
                description: "Clear explanations of grammar patterns with plenty of examples and practice exercises.",
                character: "&#x8BED;"
              },
              {
                step: "3",
                title: "Active Production",
                description: "Regular speaking and writing practice to build fluency and confidence.",
                character: "&#x8BF4;"
              },
              {
                step: "4",
                title: "Cultural Context",
                description: "Understanding the culture behind the language for deeper comprehension.",
                character: "&#x6587;"
              }
            ].map((method, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {method.step}
                </div>
                <div className="text-5xl mb-3" dangerouslySetInnerHTML={{ __html: method.character }} />
                <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-red-200">Happy Students</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-red-200">Lessons Taught</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5+</div>
              <div className="text-red-200">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-red-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
