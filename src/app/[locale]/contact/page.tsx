"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle, Sparkles, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const t = useTranslations('contact')

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
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

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-br from-emerald-900 to-blue-900 rounded-full opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-white mb-6">{t('info.title')}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t('info.email')}</p>
                    <a href="mailto:contact@liamli.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                      contact@liamli.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t('info.phone')}</p>
                    <a href="tel:+1234567890" className="text-gray-400 hover:text-blue-400 transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-emerald-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{t('info.location')}</p>
                    <p className="text-gray-400">Based in China, tutoring worldwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-amber-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Clock className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Availability</p>
                    <p className="text-gray-400">Flexible scheduling across timezones</p>
                    <p className="text-sm text-gray-500">Mon - Sun by appointment</p>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <Card className="mt-8 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-700">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-gray-300">
                      I typically respond within <span className="font-semibold text-white">24 hours</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-800 border-gray-700 border-t-4 border-t-purple-500">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Send className="h-5 w-5 text-purple-400" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-400 mb-6">
                        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-300">Message</Label>
                        <textarea
                          id="message"
                          className="flex min-h-[150px] w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us about your learning goals, questions, or how we can assist you..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" size="lg" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-gray-800 border-t border-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20 opacity-50"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <Badge variant="outline" className="mb-4 border-gray-600 text-gray-300">
            <Sparkles className="h-3 w-3 inline mr-1" />
            FAQ
          </Badge>
          <h2 className="text-2xl font-bold text-white mb-8">Common Questions</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              { q: "What subjects do you tutor?", a: "Mathematics, Economics, Finance, Statistics, Law, and Oxbridge interview preparation.", color: 'blue' },
              { q: "What levels do you teach?", a: "A-Level, IB, university-level coursework, and professional qualifications (ACA, CFA).", color: 'emerald' },
              { q: "How do sessions work?", a: "Online tutoring via Zoom or similar platforms, with flexible scheduling across timezones.", color: 'purple' },
              { q: "How do I pay?", a: "Credit cards and PayPal accepted through our secure platform.", color: 'amber' }
            ].map((faq, i) => {
              const borderColors: Record<string, string> = {
                blue: 'border-t-blue-500',
                emerald: 'border-t-emerald-500',
                purple: 'border-t-purple-500',
                amber: 'border-t-amber-500'
              }
              return (
                <Card key={i} className={`bg-gray-900 border-gray-700 border-t-4 ${borderColors[faq.color]} hover:border-gray-600 transition-colors`}>
                  <CardContent className="pt-4 pb-4">
                    <p className="font-medium text-white mb-1">{faq.q}</p>
                    <p className="text-sm text-gray-400">{faq.a}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
