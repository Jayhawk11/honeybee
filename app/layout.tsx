import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HBCS, Inc. - Honey Bee Community Services',
  description: 'Supporting adults with intellectual and developmental disabilities to live independently in the community through Residential, Day Supports, and Targeted Case Management.',
  keywords: ['HBCS', 'Honey Bee Community Services', 'intellectual disabilities', 'developmental disabilities', 'residential services', 'day services', 'case management'],
  openGraph: {
    title: 'HBCS, Inc.',
    description: 'Supporting independence for individuals with disabilities',
    images: [
      {
        url: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/20f6fffd-16e1-45bf-8730-175b47b87910/honeybee.png',
        width: 1200,
        height: 630,
      },
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
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
