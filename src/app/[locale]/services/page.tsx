"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calculator, TrendingUp, BarChart3, Scale, GraduationCap, BookOpen, Cpu, Radio, Sparkles, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const t = useTranslations('services')

  const subjects = [
    {
      title: t('mathematics.title'),
      icon: Calculator,
      description: t('mathematics.description'),
      color: 'blue',
      topics: [
        t('mathematics.topic1'),
        t('mathematics.topic2'),
        t('mathematics.topic3'),
        t('mathematics.topic4'),
        t('mathematics.topic5'),
        t('mathematics.topic6'),
        t('mathematics.topic7')
      ]
    },
    {
      title: t('signalSystems.title'),
      icon: Radio,
      description: t('signalSystems.description'),
      color: 'cyan',
      topics: [
        t('signalSystems.topic1'),
        t('signalSystems.topic2'),
        t('signalSystems.topic3'),
        t('signalSystems.topic4'),
        t('signalSystems.topic5'),
        t('signalSystems.topic6')
      ]
    },
    {
      title: t('electronics.title'),
      icon: Cpu,
      description: t('electronics.description'),
      color: 'orange',
      topics: [
        t('electronics.topic1'),
        t('electronics.topic2'),
        t('electronics.topic3'),
        t('electronics.topic4'),
        t('electronics.topic5'),
        t('electronics.topic6')
      ]
    },
    {
      title: t('economics.title'),
      icon: TrendingUp,
      description: t('economics.description'),
      color: 'emerald',
      topics: [
        t('economics.topic1'),
        t('economics.topic2'),
        t('economics.topic3'),
        t('economics.topic4'),
        t('economics.topic5'),
        t('economics.topic6')
      ]
    },
    {
      title: t('finance.title'),
      icon: BarChart3,
      description: t('finance.description'),
      color: 'indigo',
      topics: [
        t('finance.topic1'),
        t('finance.topic2'),
        t('finance.topic3'),
        t('finance.topic4'),
        t('finance.topic5'),
        t('finance.topic6')
      ]
    },
    {
      title: t('statistics.title'),
      icon: BarChart3,
      description: t('statistics.description'),
      color: 'purple',
      topics: [
        t('statistics.topic1'),
        t('statistics.topic2'),
        t('statistics.topic3'),
        t('statistics.topic4'),
        t('statistics.topic5'),
        t('statistics.topic6')
      ]
    },
    {
      title: t('law.title'),
      icon: Scale,
      description: t('law.description'),
      color: 'amber',
      topics: [
        t('law.topic1'),
        t('law.topic2'),
        t('law.topic3'),
        t('law.topic4'),
        t('law.topic5')
      ]
    },
    {
      title: t('oxbridge.title'),
      icon: GraduationCap,
      description: t('oxbridge.description'),
      color: 'rose',
      topics: [
        t('oxbridge.topic1'),
        t('oxbridge.topic2'),
        t('oxbridge.topic3'),
        t('oxbridge.topic4'),
        t('oxbridge.topic5'),
        t('oxbridge.topic6')
      ]
    }
  ]

  const colorClasses: Record<string, { border: string; bg: string; icon: string; hover: string }> = {
    blue: { border: 'border-t-blue-500', bg: 'bg-blue-900', icon: 'text-blue-400', hover: 'group-hover:text-blue-400' },
    cyan: { border: 'border-t-cyan-500', bg: 'bg-cyan-900', icon: 'text-cyan-400', hover: 'group-hover:text-cyan-400' },
    orange: { border: 'border-t-orange-500', bg: 'bg-orange-900', icon: 'text-orange-400', hover: 'group-hover:text-orange-400' },
    emerald: { border: 'border-t-emerald-500', bg: 'bg-emerald-900', icon: 'text-emerald-400', hover: 'group-hover:text-emerald-400' },
    indigo: { border: 'border-t-indigo-500', bg: 'bg-indigo-900', icon: 'text-indigo-400', hover: 'group-hover:text-indigo-400' },
    purple: { border: 'border-t-purple-500', bg: 'bg-purple-900', icon: 'text-purple-400', hover: 'group-hover:text-purple-400' },
    amber: { border: 'border-t-amber-500', bg: 'bg-amber-900', icon: 'text-amber-400', hover: 'group-hover:text-amber-400' },
    rose: { border: 'border-t-rose-500', bg: 'bg-rose-900', icon: 'text-rose-400', hover: 'group-hover:text-rose-400' },
  }

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

      {/* Subject Areas */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-br from-emerald-900 to-blue-900 rounded-full opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => {
              const Icon = subject.icon
              const colors = colorClasses[subject.color]
              return (
                <Card key={index} className={`border-t-4 ${colors.border} group cursor-pointer bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg`}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <CardTitle className={`text-xl text-white ${colors.hover} transition-colors`}>{subject.title}</CardTitle>
                    <CardDescription className="text-gray-400">{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {subject.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-800 border-y border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gray-600 text-gray-300">
              <Sparkles className="h-3 w-3 inline mr-1" />
              {t('howItWorks.title')}
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">{t('howItWorks.title')}</h2>
            <p className="text-lg text-gray-400">{t('howItWorks.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{t('howItWorks.step1Title')}</h3>
                <p className="text-gray-400">{t('howItWorks.step1Desc')}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{t('howItWorks.step2Title')}</h3>
                <p className="text-gray-400">{t('howItWorks.step2Desc')}</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{t('howItWorks.step3Title')}</h3>
                <p className="text-gray-400">{t('howItWorks.step3Desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Levels */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-gray-600 text-gray-300">
              <GraduationCap className="h-3 w-3 inline mr-1" />
              Educational Levels
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">{t('levels.title')}</h2>
            <p className="text-lg text-gray-400">{t('levels.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('levels.aLevel'), description: t('levels.aLevelDesc'), color: 'blue' },
              { title: t('levels.ib'), description: t('levels.ibDesc'), color: 'emerald' },
              { title: t('levels.university'), description: t('levels.universityDesc'), color: 'purple' },
              { title: t('levels.professional'), description: t('levels.professionalDesc'), color: 'amber' }
            ].map((level, i) => {
              const colors = colorClasses[level.color]
              return (
                <Card key={i} className={`text-center border-t-4 ${colors.border} bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 group`}>
                  <CardContent className="pt-6 pb-6">
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <BookOpen className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <h3 className="font-semibold text-white mb-1">{level.title}</h3>
                    <p className="text-sm text-gray-400">{level.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="font-semibold bg-white text-purple-900 hover:bg-purple-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {t('cta.bookNow')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-900 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                {t('cta.contactUs')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
