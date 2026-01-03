"use client"

import Link from "next/link"
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
              Academic Excellence
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 animate-[fadeInUp_0.6s_ease-out]">
              Expert Academic Tutoring in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Finance, Maths & More</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-[fadeInUp_0.8s_ease-out]">
              Cambridge-educated tutor with professional finance credentials offering personalized instruction across mathematics, economics, finance, statistics, and law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1s_ease-out]">
              <Link href="/book">
                <Button size="lg" className="font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Book a Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 shadow-md hover:shadow-lg transition-all duration-300">
                  About Liam
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Cambridge Graduate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>ACA & CFA Qualified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Bilingual (English/Mandarin)</span>
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
                <div className="font-bold text-gray-900 text-lg">Cambridge</div>
                <div className="text-sm text-gray-600 mt-1">University</div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={100}>
              <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                <Award className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <div className="font-bold text-gray-900 text-lg">ACA & CFA</div>
                <div className="text-sm text-gray-600 mt-1">Qualified</div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={200}>
              <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                <BookOpen className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <div className="font-bold text-gray-900 text-lg">Barclays & Deloitte</div>
                <div className="text-sm text-gray-600 mt-1">Experience</div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={300}>
              <div className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <div className="font-bold text-gray-900">Students</div>
                <div className="text-sm text-gray-600 mt-1">Tutored</div>
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
                Subject Areas
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Academic Support
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From A-Level to university and professional qualifications, get expert guidance across multiple disciplines.
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
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">Mathematics</CardTitle>
                <CardDescription>From basics to advanced topics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Engineering Mathematics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Complex Analysis & Laurent Series
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    IB & A-Level Mathematics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Actuarial Mathematics
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
                <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">Economics</CardTitle>
                <CardDescription>Macro, micro, and applied economics</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Cambridge Interview Prep
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    A-Level & IB Economics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Economic Theory
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Applied Economics
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
                <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">Finance</CardTitle>
                <CardDescription>Corporate finance to investments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Financial Modeling & Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Investment Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Corporate Finance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Portfolio Optimization
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
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">Statistics</CardTitle>
                <CardDescription>Data analysis and statistical methods</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Advanced Statistical Methods
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    R and Python for Data Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Statistical Computing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Probability Theory
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
                <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">Law</CardTitle>
                <CardDescription>Legal frameworks and case analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Competition Law
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Legal Frameworks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Case Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    University Law Modules
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
                <CardTitle className="text-xl group-hover:text-rose-600 transition-colors">Oxbridge Prep</CardTitle>
                <CardDescription>Specialized admissions coaching</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Cambridge Interview Preparation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Personal Statement Review
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Mock Interviews
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    Application Strategy
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
                  View All Services
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
                Expertise Levels
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Proficiency Across Disciplines
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Years of academic and professional experience translated into expert-level knowledge
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <AnimatedProgress value={95} label="Financial Mathematics" color="bg-blue-600" delay={0} />
              <AnimatedProgress value={92} label="Corporate Finance" color="bg-indigo-600" delay={100} />
              <AnimatedProgress value={90} label="Economics Theory" color="bg-emerald-600" delay={200} />
            </div>
            <div>
              <AnimatedProgress value={93} label="Statistical Analysis" color="bg-purple-600" delay={300} />
              <AnimatedProgress value={88} label="Legal Frameworks" color="bg-amber-600" delay={400} />
              <AnimatedProgress value={97} label="Oxbridge Interview Prep" color="bg-rose-600" delay={500} />
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
                    <div className="font-bold text-gray-900">Proven Track Record</div>
                    <div className="text-sm text-gray-600">Cambridge standards + Professional experience</div>
                  </div>
                </div>
                <Link href="/about">
                  <Button variant="outline" className="hover:bg-blue-600 hover:text-white transition-all">
                    Learn More About My Background
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
              <Badge variant="outline" className="mb-4">Why Choose Liam</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Elite Education Meets Real-World Experience
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Combining Cambridge academic rigor with professional finance expertise and a genuine passion for teaching.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Elite Credentials</h3>
                    <p className="text-gray-600">Cambridge graduate with ACA and CFA qualifications, plus professional experience at Barclays Capital and Deloitte.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Deep Conceptual Understanding</h3>
                    <p className="text-gray-600">Focus on genuine comprehension over rote learning, integrating real-world applications with theoretical knowledge.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Cross-Cultural Expertise</h3>
                    <p className="text-gray-600">Bilingual capability with experience across China, UK, and Australia. Understand different learning approaches and cultural backgrounds.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Flexible & Personalized</h3>
                    <p className="text-gray-600">Tailored learning materials and approaches adapted to your individual needs, goals, and learning style.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Areas of Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Mathematics</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Economics</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <BarChart3 className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Finance</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Statistics</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <Scale className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Law</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <GraduationCap className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Oxbridge Prep</p>
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
            <Badge variant="outline" className="mb-4">Student Success</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "James W.",
                role: "University Economics Student",
                content: "Liam's Cambridge interview prep was invaluable. His deep understanding of economics and ability to explain complex concepts made all the difference. I got my offer!",
                rating: 5,
              },
              {
                name: "Sarah L.",
                role: "IB Mathematics Student",
                content: "Finally found someone who could explain Laurent Series in a way that makes sense! Liam's patient approach and real-world examples transformed my understanding.",
                rating: 5,
              },
              {
                name: "Chen M.",
                role: "Finance Professional",
                content: "Preparing for my CFA with Liam's guidance was excellent. His Barclays and Deloitte experience brings practical insights you won't find in textbooks.",
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
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed animate-[fadeInUp_0.8s_ease-out]">
            Get expert guidance from a Cambridge-educated tutor with real-world experience. Whether you're preparing for exams, university interviews, or professional qualifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1s_ease-out]">
            <Link href="/book">
              <Button size="lg" className="font-semibold bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Book a Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
