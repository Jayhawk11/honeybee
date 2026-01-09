import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true, // Force preload for faster text rendering
})

export const metadata: Metadata = {
  title: 'HBCS, Inc. - Honey Bee Community Services',
  description: 'Supporting adults with intellectual and developmental disabilities to live independently in community through Residential, Day Supports, and Targeted Case Management.',
  keywords: ['HBCS', 'Honey Bee Community Services', 'intellectual disabilities', 'developmental disabilities', 'residential services', 'day services', 'case management'],
  openGraph: {
    title: 'HBCS, Inc. - Honey Bee Community Services',
    description: 'Supporting independence for individuals with intellectual and developmental disabilities',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        type: 'image/svg+xml',
        alt: 'HBCS Honey Bee Community Services - Supporting Independence, Building Community',
      },
    ],
  },

  // Add resource hints for faster loading
  other: {
    'preconnect': [
      'https://images.squarespace-cdn.com',
    ],
    'dns-prefetch': [
      'images.squarespace-cdn.com',
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
       <body className={poppins.variable}>
         <Analytics />
         <SpeedInsights />
         <ThemeProvider>
           <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-400 focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
