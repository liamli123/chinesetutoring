"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LanguageSwitcher } from "./language-switcher"
import { Menu, X, User, LogOut, LayoutDashboard, Settings, Sparkles } from "lucide-react"

export function Navbar() {
  const t = useTranslations('nav')
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: t('home'), special: false },
    { href: "/services", label: t('services'), special: false },
    { href: "/math-tutor", label: t('mathSolver'), special: true },
    { href: "/tutor/visualize", label: t('mathAnimation'), special: true },
    { href: "/about", label: t('about'), special: false },
    { href: "/contact", label: t('contact'), special: false },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">Liam Li</span>
            <span className="text-sm text-gray-400">Academic Tutoring</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              link.special ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-purple-600 text-white">
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-white">{session.user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-gray-400">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild className="text-gray-300 focus:text-white focus:bg-gray-700">
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t('dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-gray-300 focus:text-white focus:bg-gray-700">
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {session.user?.role === "ADMIN" && (
                    <DropdownMenuItem asChild className="text-gray-300 focus:text-white focus:bg-gray-700">
                      <Link href="/admin" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        {t('admin')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-gray-700"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">{t('login')}</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700">{t('register')}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-700">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              link.special ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 py-2 px-4 rounded-lg bg-blue-600 text-white font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Sparkles className="w-4 h-4" />
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-300 hover:text-white transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="pt-4 border-t border-gray-700 space-y-2">
              <div className="flex justify-center mb-2">
                <LanguageSwitcher />
              </div>
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t('dashboard')}
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">{t('login')}</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">{t('register')}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
