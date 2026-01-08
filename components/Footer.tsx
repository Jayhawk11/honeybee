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
      { name: 'Wyandotte County CDDO', href: 'https://www.wycokck.org/Departments/Human-Services/Community-Developmental-Disabilities-Organization' },
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
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Logo variant="tier2" size="lg" href="/" withPattern={false} withParticles={false} className="mb-6" />

            <p className="text-gray-400 mb-6 max-w-md">
              Honey Bee Community Services, Inc. assists individuals with developmental disabilities to live independently in the community through Residential, Day Supports, and Targeted Case Management. Serving Johnson and Wyandotte Counties in Kansas as an HCBS IDD Waiver provider since 2013.
            </p>

            {/* Social Links */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute -inset-2 bg-bee-gold rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                    <div className="relative w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full group-hover:bg-bee-gold transition-colors duration-300">
                      <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                        {social.icon}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-bee-gold-dark rounded-full"></span>
                Founded in 2013
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-bee-gold-dark rounded-full"></span>
                Serving Kansas City metropolitan area
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-bee-gold-dark rounded-full"></span>
                HCBS IDD Waiver Provider for Kansas
              </p>
            </div>

            <div className="text-sm text-gray-400 space-y-2">
              <p className="font-medium text-white mb-2">Mailing Address:</p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-bee-gold-dark rounded-full"></span>
                PO Box 23532, Overland Park, KS 66283
              </p>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-bee-gold-dark transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Honey Bee Community Services, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-bee-gold-dark transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-bee-gold-dark transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-bee-gold-dark transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
