"use client"

import { useTranslations } from "next-intl"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Briefcase, Globe, GraduationCap, Languages, TrendingUp, BarChart3, Sparkles, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Badge className="mb-4 bg-purple-600 text-white border-0 shadow-lg">
            <Sparkles className="h-3 w-3 inline mr-1" />
            {t('hero.badge')}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Background */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-br from-emerald-900 to-blue-900 rounded-full opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{t('background.title')}</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>{t('background.para1')}</p>
                <p>{t('background.para2')}</p>
                <p>{t('background.para3')}</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{t('credentials.title')}</h2>
              <div className="space-y-3">
                {[
                  { icon: GraduationCap, text: t('credentials.cambridge'), color: 'purple' },
                  { icon: Award, text: t('credentials.aca'), color: 'blue' },
                  { icon: Award, text: t('credentials.cfa'), color: 'indigo' },
                  { icon: Languages, text: t('credentials.mandarin'), color: 'emerald' },
                ].map((item, i) => {
                  const bgColors: Record<string, string> = {
                    purple: 'bg-purple-900',
                    blue: 'bg-blue-900',
                    indigo: 'bg-indigo-900',
                    emerald: 'bg-emerald-900'
                  }
                  const iconColors: Record<string, string> = {
                    purple: 'text-purple-400',
                    blue: 'text-blue-400',
                    indigo: 'text-indigo-400',
                    emerald: 'text-emerald-400'
                  }
                  return (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors group">
                      <div className={`w-10 h-10 ${bgColors[item.color]} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <item.icon className={`h-5 w-5 ${iconColors[item.color]}`} />
                      </div>
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Expertise */}
      <section className="py-20 bg-gray-800 border-y border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gray-600 text-gray-300">
              <BookOpen className="h-3 w-3 inline mr-1" />
              Teaching
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">{t('expertise.title')}</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('expertise.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-blue-500 bg-gray-900 border-gray-700 hover:border-gray-600 transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">Mathematics</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Engineering Mathematics (MTH101 & advanced)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Complex Analysis & Laurent Series</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> IB & A-Level Mathematics</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Actuarial Mathematics</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Portfolio Optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-emerald-500 bg-gray-900 border-gray-700 hover:border-gray-600 transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-emerald-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">Economics & Finance</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Cambridge Economics Interview Prep</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Financial Modeling & Analysis</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Investment Analysis</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Corporate Finance</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> A-Level & IB Economics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-500 bg-gray-900 border-gray-700 hover:border-gray-600 transition-all duration-300 group">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">Statistics & Data</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Advanced Statistical Methods</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> R and Python for Data Analysis</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Statistical Computing</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Probability Theory</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-700 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Educational Levels</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> A-Level examination preparation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> IB (International Baccalaureate) curriculum</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Cambridge & Oxbridge interview preparation</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> University-level coursework (undergraduate & postgraduate)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> Professional qualifications (ACA, CFA prep)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Unique Value Proposition</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-400" /> Native-level proficiency in English and Mandarin</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-400" /> Bridge Western and Eastern academic approaches</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-400" /> Real-world finance experience from top firms</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-400" /> Deep conceptual understanding over rote memorization</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-400" /> Custom materials tailored to individual needs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gray-600 text-gray-300">
              <Sparkles className="h-3 w-3 inline mr-1" />
              Philosophy
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">Teaching Philosophy</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Combining rigorous academic standards with accessible, culturally-sensitive teaching methods
            </p>
          </div>
          <Card className="bg-gray-800 border-gray-700 border-t-4 border-t-purple-500">
            <CardContent className="pt-8 pb-8">
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                My approach combines rigorous academic standards from Cambridge with professional finance credentials and accessible, culturally-sensitive teaching methods. I focus on developing genuine understanding and analytical thinking skills that serve students beyond immediate examination success.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-purple-400" />
                    </div>
                    Core Principles
                  </h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Deep conceptual understanding over rote memorization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Integration of real-world applications with theory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Breaking complex systems into comprehensible components</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-900 rounded-lg flex items-center justify-center">
                      <Award className="h-4 w-4 text-indigo-400" />
                    </div>
                    What Sets Me Apart
                  </h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Bilingual capability with cross-cultural experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Practical finance insights from top-tier firms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Professional Experience</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-purple-700 hover:border-purple-500 transition-colors group">
              <div className="w-16 h-16 bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Barclays Capital</h3>
              <p className="text-purple-200">Investment banking operations and quantitative analysis</p>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-purple-700 hover:border-purple-500 transition-colors group">
              <div className="w-16 h-16 bg-indigo-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Deloitte</h3>
              <p className="text-purple-200">Professional services and financial analysis</p>
            </div>
            <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-purple-700 hover:border-purple-500 transition-colors group">
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Global Experience</h3>
              <p className="text-purple-200">Operations across China, UK, and Australia</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
