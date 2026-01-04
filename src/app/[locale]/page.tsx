"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { AnimatedProgress } from "@/components/ui/animated-progress"
import {
  Users,
  Clock,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Video,
  Calculator,
  TrendingUp,
  BarChart3,
  Scale,
  GraduationCap,
  Sparkles
} from "lucide-react"

export default function HomePage() {
  const t = useTranslations('home')
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 animate-[fadeInUp_0.6s_ease-out]">
              {t('hero.title')}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-[fadeInUp_0.8s_ease-out]">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1s_ease-out]">
              <Link href="/book">
                <Button size="lg" className="font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {t('hero.bookSession')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 shadow-md hover:shadow-lg transition-all duration-300">
                  {t('hero.aboutLiam')}
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{t('hero.cambridgeGrad')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{t('hero.acaCfa')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{t('hero.bilingual')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section with Animated Stats */}
      <section className="bg-white py-16 border-b relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 float-element"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-indigo-100 rounded-full opacity-20 float-element-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ScrollReveal direction="scale" delay={0}>
              <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                <GraduationCap className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <div className="font-bold text-gray-900 text-lg">{t('credentials.cambridge')}</div>
                <div className="text-sm text-gray-600 mt-1">{t('credentials.university')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={100}>
              <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                <Award className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <div className="font-bold text-gray-900 text-lg">{t('credentials.acaCfa')}</div>
                <div className="text-sm text-gray-600 mt-1">{t('credentials.qualified')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={200}>
              <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                <BookOpen className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <div className="font-bold text-gray-900 text-lg">{t('credentials.experience')}</div>
                <div className="text-sm text-gray-600 mt-1">{t('credentials.experienceSub')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={300}>
              <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <div className="font-bold text-gray-900">{t('credentials.students')}</div>
                <div className="text-sm text-gray-600 mt-1">{t('credentials.studentsSub')}</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Subject Areas Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 float-element"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full opacity-20 float-element-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="h-3 w-3 inline mr-1" />
                {t('subjects.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('subjects.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('subjects.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mathematics */}
            <ScrollReveal direction="up" delay={0}>
              <Card className="card-hover border-t-4 border-t-blue-600 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <Calculator className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{t('subjects.mathematics.title')}</CardTitle>
                <CardDescription>{t('subjects.mathematics.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.mathematics.topic1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.mathematics.topic2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.mathematics.topic3')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.mathematics.topic4')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Economics */}
            <ScrollReveal direction="up" delay={100}>
              <Card className="card-hover border-t-4 border-t-emerald-600 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
                  <TrendingUp className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">{t('subjects.economics.title')}</CardTitle>
                <CardDescription>{t('subjects.economics.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.economics.topic1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.economics.topic2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.economics.topic3')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.economics.topic4')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Finance */}
            <ScrollReveal direction="up" delay={200}>
              <Card className="card-hover border-t-4 border-t-indigo-600 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors duration-300">
                  <BarChart3 className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">{t('subjects.finance.title')}</CardTitle>
                <CardDescription>{t('subjects.finance.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.finance.topic1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.finance.topic2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.finance.topic3')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.finance.topic4')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Statistics */}
            <ScrollReveal direction="up" delay={0}>
              <Card className="card-hover border-t-4 border-t-purple-600 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors duration-300">
                  <BarChart3 className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{t('subjects.statistics.title')}</CardTitle>
                <CardDescription>{t('subjects.statistics.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.statistics.topic1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.statistics.topic2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.statistics.topic3')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.statistics.topic4')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Law */}
            <ScrollReveal direction="up" delay={100}>
              <Card className="card-hover border-t-4 border-t-amber-600 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors duration-300">
                  <Scale className="h-6 w-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">{t('subjects.law.title')}</CardTitle>
                <CardDescription>{t('subjects.law.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.law.topic1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.law.topic2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.law.topic3')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.law.topic4')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Cambridge Interview Prep */}
            <ScrollReveal direction="up" delay={200}>
              <Card className="card-hover border-t-4 border-t-rose-600 group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-rose-600 transition-colors duration-300">
                  <GraduationCap className="h-6 w-6 text-rose-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl group-hover:text-rose-600 transition-colors">{t('subjects.oxbridge.title')}</CardTitle>
                <CardDescription>{t('subjects.oxbridge.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.oxbridge.topic1')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.oxbridge.topic2')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.oxbridge.topic3')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {t('subjects.oxbridge.topic4')}
                  </li>
                </ul>
              </CardContent>
            </Card>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up">
            <div className="text-center mt-12">
              <Link href="/services">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {t('subjects.viewAll')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expertise Levels - Animated Progress Bars */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50 opacity-50"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <BarChart3 className="h-3 w-3 inline mr-1" />
                {t('expertise.badge')}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('expertise.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('expertise.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <AnimatedProgress value={95} label={t('expertise.financialMath')} color="bg-blue-600" delay={0} />
              <AnimatedProgress value={92} label={t('expertise.corporateFinance')} color="bg-indigo-600" delay={100} />
              <AnimatedProgress value={90} label={t('expertise.economicsTheory')} color="bg-emerald-600" delay={200} />
            </div>
            <div>
              <AnimatedProgress value={93} label={t('expertise.statisticalAnalysis')} color="bg-purple-600" delay={300} />
              <AnimatedProgress value={88} label={t('expertise.legalFrameworks')} color="bg-amber-600" delay={400} />
              <AnimatedProgress value={97} label={t('expertise.oxbridgePrep')} color="bg-rose-600" delay={500} />
            </div>
          </div>

          <ScrollReveal direction="up" delay={600}>
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{t('expertise.provenTrack')}</div>
                    <div className="text-sm text-gray-600">{t('expertise.provenTrackSub')}</div>
                  </div>
                </div>
                <Link href="/about">
                  <Button variant="outline" className="hover:bg-blue-600 hover:text-white transition-all">
                    {t('expertise.learnMore')}
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">{t('whyChoose.badge')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('whyChoose.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('whyChoose.subtitle')}
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('whyChoose.credentials.title')}</h3>
                    <p className="text-gray-600">{t('whyChoose.credentials.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('whyChoose.understanding.title')}</h3>
                    <p className="text-gray-600">{t('whyChoose.understanding.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('whyChoose.crossCultural.title')}</h3>
                    <p className="text-gray-600">{t('whyChoose.crossCultural.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t('whyChoose.flexible.title')}</h3>
                    <p className="text-gray-600">{t('whyChoose.flexible.description')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('whyChoose.areasTitle')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{t('whyChoose.mathematics')}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{t('whyChoose.economics')}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <BarChart3 className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{t('whyChoose.finance')}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{t('whyChoose.statistics')}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <Scale className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{t('whyChoose.law')}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <GraduationCap className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{t('whyChoose.oxbridge')}</p>
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
            <Badge variant="outline" className="mb-4">{t('testimonials.badge')}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t('testimonials.student1.name'),
                role: t('testimonials.student1.role'),
                content: t('testimonials.student1.content'),
                rating: 5,
              },
              {
                name: t('testimonials.student2.name'),
                role: t('testimonials.student2.role'),
                content: t('testimonials.student2.content'),
                rating: 5,
              },
              {
                name: t('testimonials.student3.name'),
                role: t('testimonials.student3.role'),
                content: t('testimonials.student3.content'),
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white card-hover">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400 transition-transform hover:scale-125" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center transition-colors group-hover:bg-blue-600">
                      <span className="text-blue-600 font-semibold group-hover:text-white transition-colors">
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
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-[fadeInUp_0.6s_ease-out]">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed animate-[fadeInUp_0.8s_ease-out]">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1s_ease-out]">
            <Link href="/book">
              <Button size="lg" className="font-semibold bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {t('cta.bookSession')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                {t('cta.getInTouch')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
