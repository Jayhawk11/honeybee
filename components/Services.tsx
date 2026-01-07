'use client'

import { motion } from 'framer-motion'
import { HomeIcon, SunIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const services = [
  {
    id: 'services-residential',
    icon: HomeIcon,
    title: 'Residential Supports',
    description: 'Our residential program provides individuals with intellectual and developmental disabilities the opportunity to live in their own homes or apartments in the community. We offer 24/7 support tailored to each person\'s unique needs, helping them develop life skills, maintain their health, and achieve their personal goals.',
    features: [
      '24/7 personalized support',
      'Skill development and training',
      'Community integration activities',
      'Health and medication management',
      'Family collaboration and support'
    ],
    color: 'from-primary-400 to-primary-600'
  },
  {
    id: 'services-day',
    icon: SunIcon,
    title: 'Day Supports',
    description: 'Our Day Supports program offers a variety of activities designed to enhance quality of life, build social connections, and develop new skills in a fun, supportive environment. Participants engage in community outings, creative activities, physical exercise, and educational opportunities.',
    features: [
      'Community integration outings',
      'Art and music therapy',
      'Physical fitness programs',
      'Life skills workshops',
      'Social and recreational activities'
    ],
    color: 'from-accent-400 to-orange-500'
  },
  {
    id: 'services-tcm',
    icon: UserGroupIcon,
    title: 'Targeted Case Management',
    description: 'Our Targeted Case Management services help individuals navigate the complex system of available supports and services. Our experienced case managers work closely with individuals and their families to coordinate care, advocate for needs, and ensure access to appropriate community resources.',
    features: [
      'Service coordination and planning',
      'Advocacy and resource navigation',
      'Monitoring and support',
      'Crisis intervention assistance',
      'Connection to community resources'
    ],
    color: 'from-yellow-400 to-amber-500'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive support services tailored to help individuals with intellectual and developmental disabilities live fulfilling, independent lives
          </p>
        </motion.div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl transform rotate-3 opacity-20 blur-xl`} />
                <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-primary-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl transform -rotate-3 opacity-20 blur-xl`} />
                <div className="relative h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-32 h-32 bg-gradient-to-r ${service.color} rounded-full blur-3xl opacity-50`} />
                  </div>
                  <div className="relative h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <service.icon className="w-24 h-24 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                      <p className="text-gray-500 dark:text-gray-500 font-medium">
                        Service Image Placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  )
}
