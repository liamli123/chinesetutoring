import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Briefcase, Globe, GraduationCap, Languages, TrendingUp, BarChart3 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-600 text-white border-0">About Liam</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Cambridge Education. Finance Experience. Global Perspective.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elite academic credentials combined with professional finance expertise and a genuine passion for helping students excel.
          </p>
        </div>
      </section>

      {/* Background */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Background</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  I'm a Cambridge University graduate with distinguished qualifications including both ACA (Associate Chartered Accountant) and CFA (Chartered Financial Analyst) designations, as well as National Mandarin Test Level 2 Grade A certification.
                </p>
                <p>
                  My professional experience spans top-tier finance institutions including Barclays Capital and Deloitte, where I developed deep expertise in quantitative analysis, financial modeling, and complex problem-solving methodologies.
                </p>
                <p>
                  Today, I operate a specialized overseas academic support service, providing comprehensive tutoring across mathematics, economics, finance, statistics, and law. My unique combination of elite academic training, professional finance credentials, and cross-cultural teaching expertise sets me apart in the competitive educational support market.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Academic Credentials</h2>
              <div className="space-y-3">
                {[
                  { icon: GraduationCap, text: "Cambridge University graduate" },
                  { icon: Award, text: "ACA (Associate Chartered Accountant)" },
                  { icon: Award, text: "CFA (Chartered Financial Analyst)" },
                  { icon: Languages, text: "National Mandarin Test Level 2 Grade A" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <item.icon className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Teaching Expertise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive academic support across multiple disciplines and educational levels
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mathematics</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Engineering Mathematics (MTH101 & advanced)</li>
                  <li>• Complex Analysis & Laurent Series</li>
                  <li>• IB & A-Level Mathematics</li>
                  <li>• Actuarial Mathematics</li>
                  <li>• Portfolio Optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Economics & Finance</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cambridge Economics Interview Prep</li>
                  <li>• Financial Modeling & Analysis</li>
                  <li>• Investment Analysis</li>
                  <li>• Corporate Finance</li>
                  <li>• A-Level & IB Economics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Statistics & Data</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Advanced Statistical Methods</li>
                  <li>• R and Python for Data Analysis</li>
                  <li>• Statistical Computing</li>
                  <li>• Probability Theory</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-blue-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Educational Levels</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• A-Level examination preparation</li>
                  <li>• IB (International Baccalaureate) curriculum</li>
                  <li>• Cambridge & Oxbridge interview preparation</li>
                  <li>• University-level coursework (undergraduate & postgraduate)</li>
                  <li>• Professional qualifications (ACA, CFA prep)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Unique Value Proposition</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Native-level proficiency in English and Mandarin</li>
                  <li>• Bridge Western and Eastern academic approaches</li>
                  <li>• Real-world finance experience from top firms</li>
                  <li>• Deep conceptual understanding over rote memorization</li>
                  <li>• Custom materials tailored to individual needs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Teaching Philosophy</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combining rigorous academic standards with accessible, culturally-sensitive teaching methods
            </p>
          </div>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0">
            <CardContent className="pt-8 pb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                My approach combines rigorous academic standards from Cambridge with professional finance credentials and accessible, culturally-sensitive teaching methods. I focus on developing genuine understanding and analytical thinking skills that serve students beyond immediate examination success.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Core Principles</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Deep conceptual understanding over rote memorization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Integration of real-world applications with theory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Breaking complex systems into comprehensible components</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What Sets Me Apart</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Bilingual capability with cross-cultural experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Practical finance insights from top-tier firms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Custom learning materials for individual needs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Experience</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Barclays Capital</h3>
              <p className="text-blue-100">Investment banking operations and quantitative analysis</p>
            </div>
            <div className="text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Deloitte</h3>
              <p className="text-blue-100">Professional services and financial analysis</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Experience</h3>
              <p className="text-blue-100">Operations across China, UK, and Australia</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
