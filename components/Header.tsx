'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Logo from '@/components/Logo'
import { useTheme } from '@/contexts/ThemeContext'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', hasSubmenu: true },
  { name: 'Our Vision', href: '/our-vision' },
  { name: 'History', href: '/history' },
  { name: 'Contact', href: '/#contact' },
]

const serviceSubItems = [
  { name: 'Services Overview', href: '/services' },
  { name: 'Residential Services', href: '/services/residential' },
  { name: 'Day Services', href: '/services/day-services' },
  { name: 'Targeted Case Management', href: '/services/targeted-case-management' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const themeContext = useTheme()
  const theme = themeContext?.theme || 'light'
  const mounted = themeContext?.mounted ?? true
  const toggleTheme = themeContext?.toggleTheme || (() => {})

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Logo variant="tier3" size="md" href="/" />
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <span key={item.name} className="text-gray-700 dark:text-gray-300 font-medium">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 dark:bg-black/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Logo variant="tier3" size="md" href="/" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation" data-testid="main-navigation">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasSubmenu ? (
                  <>
                    <button
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-400 transition-colors font-medium flex items-center"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      aria-expanded={isServicesOpen}
                      aria-controls="services-submenu"
                      aria-haspopup="menu"
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          id="services-submenu"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden"
                          role="menu"
                          aria-label="Services"
                        >
                          {serviceSubItems.map((subItem) => {
                   const testId = subItem.href
                     .replace(/^\//, '')
                     .replace(/\//g, '-')
                     .replace(/-/g, '');
                   return (
                     <Link
                        key={subItem.name}
                        href={subItem.href}
                        role="menuitem"
                        prefetch={true}
                        className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-400 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                        data-testid={`nav-${testId}`}
                      >
                       {subItem.name}
                     </Link>
                   );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                 ) : (
                  <Link
                    href={item.href}
                    prefetch={item.href === '/' || item.href === '/services' || item.href === '/our-vision' || item.href === '/#contact'}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-400 dark:hover:text-primary-400 transition-colors font-medium"
                    data-testid={`nav-${item.href.replace(/\//g, '').replace(/-/g, '')}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-pressed={theme === 'dark'}
              data-testid="theme-toggle"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-gray-700" />
              ) : (
                <SunIcon className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <nav className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasSubmenu ? (
                      <>
                        <button
                          className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium flex justify-between items-center"
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          aria-expanded={isServicesOpen}
                          aria-controls={`mobile-${item.name.toLowerCase()}-submenu`}
                        >
                          {item.name}
                          <svg
                            className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              id={`mobile-${item.name.toLowerCase()}-submenu`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                              role="menu"
                            >
                              {serviceSubItems.map((subItem) => (
                                 <Link
                                   key={subItem.name}
                                   href={subItem.href}
                                   role="menuitem"
                                   prefetch={true}
                                   className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-400 transition-colors"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    setIsServicesOpen(false)
                                  }}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
    </motion.header>
  )
}
