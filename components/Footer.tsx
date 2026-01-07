'use client'

import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '#services' },
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ]
  },
  {
    title: 'Services',
    links: [
      { name: 'Residential Supports', href: '#services-residential' },
      { name: 'Day Supports', href: '#services-day' },
      { name: 'Case Management', href: '#services-tcm' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'FAQ', href: '#faq' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/20f6fffd-16e1-45bf-8730-175b47b87910/honeybee.png"
                  alt="HBCS Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold">HBCS, Inc.</span>
            </Link>

            <p className="text-gray-400 mb-6 max-w-md">
              Honey Bee Community Services, Inc. assists individuals with developmental disabilities to live independently in the community through Residential, Day Supports, and Targeted Case Management.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-primary-400 rounded-full"></span>
                Founded in 2013
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-primary-400 rounded-full"></span>
                Serving Raleigh and surrounding areas
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 bg-primary-400 rounded-full"></span>
                Licensed by North Carolina DHHS
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
                      className="text-gray-400 hover:text-primary-400 transition-colors"
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
            <a href="#" className="hover:text-primary-400 transition-colors">
              Accessibility
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-400 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
