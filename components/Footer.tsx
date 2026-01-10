'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Logo from './Logo'

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: 'Our Vision', href: '/our-vision' },
      { name: 'History', href: '/history' },
      { name: 'Contact', href: '/#contact' },
    ]
  },
  {
    title: 'Services',
    links: [
      { name: 'Residential Supports', href: '/services/residential' },
      { name: 'Day Supports', href: '/services/day-services' },
      { name: 'Case Management', href: '/services/targeted-case-management' },
    ]
  },
  {
    title: 'CDDO Affiliations',
    links: [
      { name: 'Johnson County CDDO', href: 'https://www.jocogov.org/department/community-developmental-disabilities-organization' },
      { name: 'Wyandotte County CDDO', href: 'https://www.wyckck.org/Departments/Human-Services/Community-Developmental-Disabilities-Organization' },
      { name: 'Kansas HCBS IDD Waiver', href: 'https://kdads.ks.gov/disability-services/hcbs' },
    ]
  },
  {
    title: 'Kansas Resources',
    links: [
      { name: 'KDADS', href: 'https://kdads.ks.gov' },
    ]
  }
]

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61559277947065',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* SECTION 1: Logo Only - Top Border */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800">
        <div className="flex justify-center">
          <Logo variant="tier2" size="sm" showInc={false} href="/" />
        </div>
      </div>

      {/* SECTION 2: Links Only - Middle Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {footerLinks.map((column) => (
            <div key={column.title} className="min-w-0">
              <h3 className="text-lg font-semibold mb-3 text-white">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-amber-500 transition-colors text-sm block"
                      title={link.name}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Organization Info + Copyright - Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Organization Info */}
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">
              Empowering individuals with disabilities to live independently.
            </p>

            <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute -inset-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
                  <div className="relative w-9 h-9 flex items-center justify-center bg-gray-800 rounded-full group-hover:bg-amber-500 transition-colors duration-300">
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                      {social.icon}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="space-y-1.5 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                Founded in 2013
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                Serving Kansas City
              </p>
            </div>
          </div>

          {/* Right: Copyright */}
          <div className="text-sm space-y-3">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Honey Bee Community Services, Inc. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Accessibility
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
