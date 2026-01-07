'use client'

import { motion } from 'framer-motion'
import { HeartIcon, UsersIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const values = [
  {
    icon: HeartIcon,
    title: 'Compassion',
    description: 'We approach every individual with empathy, dignity, and respect, ensuring they feel valued and heard.'
  },
  {
    icon: UsersIcon,
    title: 'Community',
    description: 'We believe in the power of community and work to create inclusive environments where everyone belongs.'
  },
  {
    icon: LightBulbIcon,
    title: 'Innovation',
    description: 'We continuously seek new and better ways to support individuals on their journey to independence.'
  },
  {
    icon: ChartBarIcon,
    title: 'Excellence',
    description: 'We are committed to providing the highest quality services and consistently exceeding expectations.'
  }
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About HBCS
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Founded in 2013, Honey Bee Community Services has been dedicated to empowering individuals with intellectual and developmental disabilities to live their best lives
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              At Honey Bee Community Services, our mission is to provide exceptional, person-centered supports that empower adults with intellectual and developmental disabilities to achieve their highest level of independence and quality of life. We believe that every individual has unique gifts and deserves the opportunity to live, work, and thrive in their community.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our team of dedicated professionals works collaboratively with individuals, families, and community partners to create personalized support plans that honor each person&apos;s goals, preferences, and dreams. We are committed to fostering an environment of dignity, respect, and continuous improvement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-accent-400 rounded-3xl transform rotate-3 opacity-20 blur-xl" />
            <div className="relative bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-3xl p-12 shadow-xl">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <p className="text-5xl font-bold text-primary-400 mb-2">10+</p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Years Serving</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-accent-400 mb-2">500+</p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Individuals Supported</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-yellow-500 mb-2">50+</p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Team Members</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-primary-400 mb-2">98%</p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            These core values guide everything we do and reflect our commitment to those we serve
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-primary-400 to-primary-600 mb-6">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
