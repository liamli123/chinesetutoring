"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calculator, TrendingUp, BarChart3, Scale, GraduationCap, BookOpen } from "lucide-react"

export default function ServicesPage() {
  const t = useTranslations('services')

  const subjects = [
    {
      title: t('mathematics.title'),
      icon: Calculator,
      color: "blue",
      description: t('mathematics.description'),
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
      title: t('economics.title'),
      icon: TrendingUp,
      color: "emerald",
      description: t('economics.description'),
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
      color: "indigo",
      description: t('finance.description'),
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
      color: "purple",
      description: t('statistics.description'),
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
      color: "amber",
      description: t('law.description'),
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
      color: "rose",
      description: t('oxbridge.description'),
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

  const colorClasses: Record<string, {bg: string, iconBg: string, iconColor: string, border: string, hoverIconBg: string, hoverIconColor: string}> = {
    blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-600", border: "border-t-blue-600", hoverIconBg: "group-hover:bg-blue-600", hoverIconColor: "group-hover:text-white" },
    emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", border: "border-t-emerald-600", hoverIconBg: "group-hover:bg-emerald-600", hoverIconColor: "group-hover:text-white" },
    indigo: { bg: "bg-indigo-50", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", border: "border-t-indigo-600", hoverIconBg: "group-hover:bg-indigo-600", hoverIconColor: "group-hover:text-white" },
    purple: { bg: "bg-purple-50", iconBg: "bg-purple-100", iconColor: "text-purple-600", border: "border-t-purple-600", hoverIconBg: "group-hover:bg-purple-600", hoverIconColor: "group-hover:text-white" },
    amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", iconColor: "text-amber-600", border: "border-t-amber-600", hoverIconBg: "group-hover:bg-amber-600", hoverIconColor: "group-hover:text-white" },
    rose: { bg: "bg-rose-50", iconBg: "bg-rose-100", iconColor: "text-rose-600", border: "border-t-rose-600", hoverIconBg: "group-hover:bg-rose-600", hoverIconColor: "group-hover:text-white" }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-600 text-white border-0">{t('hero.badge')}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Subject Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, index) => {
              const colors = colorClasses[subject.color]
              const Icon = subject.icon
              return (
                <Card key={index} className={`card-hover border-t-4 ${colors.border} group cursor-pointer`}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${colors.iconBg} ${colors.hoverIconBg} rounded-lg flex items-center justify-center mb-4 transition-colors duration-300`}>
                      <Icon className={`h-6 w-6 ${colors.iconColor} ${colors.hoverIconColor} transition-colors duration-300`} />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-${subject.color}-600 transition-colors">{subject.title}</CardTitle>
                    <CardDescription className="text-base">{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {subject.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('howItWorks.title')}</h2>
            <p className="text-lg text-gray-600">{t('howItWorks.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step1Title')}</h3>
                <p className="text-gray-600">{t('howItWorks.step1Desc')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step2Title')}</h3>
                <p className="text-gray-600">{t('howItWorks.step2Desc')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step3Title')}</h3>
                <p className="text-gray-600">{t('howItWorks.step3Desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Levels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('levels.title')}</h2>
            <p className="text-lg text-gray-600">{t('levels.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('levels.aLevel'), description: t('levels.aLevelDesc') },
              { title: t('levels.ib'), description: t('levels.ibDesc') },
              { title: t('levels.university'), description: t('levels.universityDesc') },
              { title: t('levels.professional'), description: t('levels.professionalDesc') }
            ].map((level, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <BookOpen className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{level.title}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="font-semibold bg-white text-blue-600 hover:bg-blue-50">
                {t('cta.bookNow')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-700">
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
