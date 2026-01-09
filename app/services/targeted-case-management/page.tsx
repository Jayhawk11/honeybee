'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon, UserGroupIcon, DocumentTextIcon, MapIcon, HeartIcon, AcademicCapIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const services = [
  {
    icon: DocumentTextIcon,
    title: 'Individual Needs Assessment',
    description: 'Comprehensive evaluation of each client\'s unique needs, strengths, and goals'
  },
  {
    icon: MapIcon,
    title: 'Service Plan Creation',
    description: 'Development of personalized plans tailored to individual objectives'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Care Coordination',
    description: 'Connecting clients with appropriate medical, behavioral, and social services'
  },
  {
    icon: HeartIcon,
    title: 'Medical Support',
    description: 'Ensuring access to healthcare services and medication management'
  },
  {
    icon: AcademicCapIcon,
    title: 'Educational Support',
    description: 'Helping clients access educational resources and learning opportunities'
  },
  {
    icon: UserGroupIcon,
    title: 'Ongoing Case Management',
    description: 'Continuous support and monitoring to ensure progress and success'
  }
]

const benefits = [
  {
    title: 'Experienced Team',
    description: 'Our case managers have decades of experience supporting individuals with intellectual and developmental disabilities'
  },
  {
    title: 'One-on-One Support',
    description: 'Personal attention from dedicated case managers who build meaningful relationships'
  },
  {
    title: 'Compassionate Approach',
    description: 'We treat every client with dignity, respect, and empathy'
  },
  {
    title: 'Goal-Driven',
    description: 'Focus on achieving measurable outcomes and greater independence'
  },
  {
    title: 'Comprehensive Care',
    description: 'Holistic support across medical, behavioral, social, and educational domains'
  },
  {
    title: 'Advocacy',
    description: 'We advocate for our clients\' needs and rights within the community'
  }
]

const serviceArea = {
  counties: ['Johnson County', 'Wyandotte County'],
  state: 'Kansas'
}

export default function TargetedCaseManagementPage() {
  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center text-primary-400 hover:text-primary-500 mb-6 font-medium"
              >
                <ArrowRightIcon className="w-5 h-5 mr-2 rotate-180" />
                Back to Services
              </Link>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Targeted Case Management
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
                Connecting you to the supports you need
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Targeted Case Management (TCM) is a personalized service that helps individuals with intellectual and developmental disabilities connect with the supports they need to thrive
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative h-96"
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7a3b8e8d-5315-4fb7-81c7-b94a2e2a15d7/5.14.24CatCafe6.jpg"
                alt="Targeted Case Management"
                fill
                className="object-cover object-center rounded-3xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What is Targeted Case Management?
            </h2>
            <div className="bg-gradient-to-br from-amber-50 to-primary-50 dark:from-amber-900/20 dark:to-primary-900/20 rounded-2xl p-8 border border-amber-100 dark:border-amber-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our Targeted Case Management team has decades of collective experience and plays a vital role in our community to help individuals with intellectual and developmental disabilities gain access to medical, social, educational, and other essential services.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The goal is to support clients in achieving greater independence, stability, and quality of life through personalized, goal-driven support. Our case managers work one-on-one with each client to assess their unique needs, create individualized service plans, coordinate care, and ensure ongoing support across multiple domains.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We work closely with local Community Developmental Disability Organizations (CDDOs) to ensure waiver compliance and advocate for our clients in navigating bureaucratic processes to access essential services.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Why Choose Us?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Service Area
              </h2>
              <div className="bg-gradient-to-br from-primary-50 to-amber-50 dark:from-primary-900/20 dark:to-amber-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800 mb-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  We are proud to serve individuals in the Kansas City metropolitan area
                </p>
                <div className="space-y-4">
                  {serviceArea.counties.map((county) => (
                    <div key={county} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-lg text-gray-900 dark:text-white font-medium">
                        {county}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    State: {serviceArea.state}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Eligibility
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Targeted Case Management is available to individuals who qualify for the Kansas HCBS IDD Waiver.
                </p>
                <ul className="space-y-2">
                  {[
                    'Confirmed Intellectual and Developmental Disability diagnosis',
                    'HCBS IDD Waiver eligibility',
                    'Residence in Johnson or Wyandotte County',
                    'Referral through local CDDO'
                  ].map((req) => (
                    <li key={req} className="flex items-center gap-2 text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Approach
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  At Honey Bee Community Services, we are committed to empowering our clients to live fuller, more independent lives through compassionate and goal-driven case management.
                </p>
                <ul className="space-y-2">
                  {['Building rapport with clients and families', 'Personalized service plans', 'Collaborative care coordination', 'Ongoing support and monitoring'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Schedule a consultation to learn how our Targeted Case Management services can help you or your loved one
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Schedule Consultation
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
