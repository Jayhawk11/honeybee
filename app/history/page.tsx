'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, UserIcon, CalendarIcon, MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const timelineEvents = [
  {
    year: '2013',
    title: 'A Vision is Born',
    description: 'Brett Bosley founded Honey Bee Community Services, Inc. with a mission to provide unique residential supports for individuals who wanted independence beyond traditional 24/7 group homes.',
    icon: SparklesIcon,
    color: 'from-primary-400 to-primary-600',
    position: 'left'
  },
  {
    year: '2013-2021',
    title: 'Growing Community Impact',
    description: 'HBCS established itself as a trusted provider of residential supports, helping individuals with intellectual and developmental disabilities achieve independence while receiving the daily support they needed.',
    icon: UserIcon,
    color: 'from-accent-400 to-orange-500',
    position: 'right'
  },
  {
    year: '2022',
    title: 'Expanding Services',
    description: 'HBCS expanded its operations to begin providing Day Service supports in Overland Park, Kansas, bringing community inclusion opportunities to even more individuals.',
    icon: MapPinIcon,
    color: 'from-yellow-400 to-amber-500',
    position: 'left'
  },
  {
    year: '2024',
    title: 'Olathe Opens',
    description: 'Day Services expanded to include a second location in downtown Olathe, Kansas, doubling community capacity and reach across the Kansas City metropolitan area.',
    icon: CalendarIcon,
    color: 'from-primary-400 to-accent-400',
    position: 'right'
  }
]

const founderStory = {
  name: 'Brett Bosley',
  title: 'Founder & CEO',
  story: 'Brett grew up with a sibling who had developmental disabilities. This personal connection gave him a unique perspective on the challenges and triumphs that individuals with intellectual and developmental disabilities experience. He understood that true support wasn\'t about providing care—it was about empowering individuals to live their best lives with dignity, respect, and independence.',
  vision: 'While serving as a Targeted Case Manager, Brett saw a critical gap in services. He met numerous individuals with Intellectual and Developmental Disabilities who needed daily supports but craved independence they couldn\'t find in traditional 24/7 group home settings. They wanted more—they wanted to live in their own homes, make their own choices, and be part of their communities on their own terms.',
  mission: 'Driven by this vision, Brett made the bold decision to focus HBCS\'s entire operation on developing high-quality supports using an independent living model. He built an organization centered on collaboration, person-centered care, and the belief that everyone deserves the opportunity to thrive. Today, HBCS serves hundreds of individuals across Johnson and Wyandotte Counties, honoring Brett\'s original mission: to provide exceptional support that empowers independence, health, and joy.'
}

const impactStats = [
  {
    label: 'Founded',
    value: '2013',
    color: 'text-primary-400'
  },
  {
    label: 'Service Years',
    value: '10+',
    color: 'text-accent-400'
  },
  {
    label: 'Locations',
    value: '3',
    color: 'text-yellow-500'
  },
  {
    label: 'Service Area',
    value: '2 Counties',
    color: 'text-primary-400'
  }
]

export default function HistoryPage() {
  return (
    <div className="w-full">
      <section data-testid="history-hero" className="relative pt-32 pb-20 bg-gradient-to-br from-amber-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity:1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center text-primary-400 hover:text-primary-500 mb-6 font-medium"
                data-testid="back-to-home-link"
                aria-label="Navigate back to home page"
              >
                <ArrowRightIcon className="w-5 h-5 mr-2 rotate-180" aria-hidden="true" />
                Back to Home
              </Link>
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/f7862e02-3bc3-4366-8db3-a634618d5d02/Honey+Bee+%28tshirt%29.png"
                  alt="Honey Bee Branding"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2" data-testid="history-heading">
                    Our History
                  </h1>
                  <p className="text-2xl text-gray-600 dark:text-gray-400" data-testid="history-subheading">
                    From Vision to Impact
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A journey of dedication, growth, and commitment to empowering individuals with intellectual and developmental disabilities
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative h-96"
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/d7b9137c-c4d9-4120-9c8c-950cc6937350/dance+62025.jpg"
                alt="HBCS Community Event"
                fill
                className="object-cover object-center rounded-3xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section data-testid="founder-section" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" data-testid="founder-heading">
              Our Founder
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The person behind the vision
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/45042478-ec17-47fe-93fe-b72b121b824f/Andrew+Diane+Jenny+Conner.jpg"
                alt="HBCS Leadership Team"
                width={600}
                height={500}
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-400 to-accent-400 rounded-2xl p-6 shadow-xl max-w-xs">
                <p className="text-white font-bold text-xl mb-1" data-testid="founder-name">
                  {founderStory.name}
                </p>
                <p className="text-white/90 text-sm">
                  {founderStory.title}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Personal Connection
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {founderStory.story}
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Identifying the Gap
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {founderStory.vision}
                </p>
              </div>

              <div className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-2xl p-8 border border-accent-100 dark:border-accent-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  A New Approach
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {founderStory.mission}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section data-testid="timeline-section" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" data-testid="timeline-heading">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Milestones that shaped our organization
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-400 via-accent-400 to-yellow-400" />

            <div className="space-y-16 md:space-y-24">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    event.position === 'left' ? 'md:text-right' : ''
                  }`}
                  data-testid={`timeline-event-${index}`}
                >
                  <div className={event.position === 'left' ? 'md:pr-12' : 'md:pr-12 md:col-start-2'}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow"
                    >
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${event.color} mb-4`}>
                        <event.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {event.year}
                      </h3>
                      <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                        {event.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className={`hidden md:flex ${event.position === 'left' ? 'md:col-start-2' : ''} items-center justify-center`}>
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${event.color} ring-4 ring-white dark:ring-gray-900 shadow-lg`} />
                  </div>

                  <div className={event.position === 'right' ? 'md:pl-12' : 'md:pl-12 md:col-start-1 md:row-start-1'}>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-testid="impact-stats-section" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6" data-testid="impact-stats-heading">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Building a legacy of support and independence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
                data-testid={`impact-stat-${index}`}
              >
                <p className={`text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-50 to-amber-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Join Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Whether you're seeking services for yourself or a loved one, or interested in joining our team, we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                aria-label="Learn more about our services"
              >
                Our Services
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/#contact"
                className="px-8 py-4 bg-white dark:bg-black border-2 border-gray-300 dark:border-gray-700 hover:border-primary-400 text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-300"
                aria-label="Go to contact section to get in touch"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
