import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-4xl text-red-500">&#x4E2D;</span>
              <span className="text-xl font-bold text-white">Chinese Tutoring</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Professional Mandarin Chinese tutoring for English speakers.
              Start your journey to fluency with personalized lessons from expert teachers.
            </p>
            <div className="flex space-x-4">
              <span className="text-3xl opacity-50">&#x798F;</span>
              <span className="text-3xl opacity-50">&#x5B66;</span>
              <span className="text-3xl opacity-50">&#x7F8E;</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-red-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-red-400 transition-colors">
                  Book a Lesson
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400" />
                <a href="mailto:hello@chinesetutoring.com" className="hover:text-red-400 transition-colors">
                  hello@chinesetutoring.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400" />
                <a href="tel:+1234567890" className="hover:text-red-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-red-400 mt-1" />
                <span>Online lessons available worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Chinese Tutoring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
