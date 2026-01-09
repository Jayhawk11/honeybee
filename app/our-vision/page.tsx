'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HeartIcon, UserGroupIcon, BeakerIcon, ChartBarIcon, CheckCircleIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const physicalHealthConditions = [
  { condition: 'Obesity', support: 'Healthy meal planning and portion control' },
  { condition: 'High Cholesterol', support: 'Low-fat cooking and nutritional guidance' },
  { condition: 'Diabetes', support: 'Diabetic-friendly meals and glucose monitoring' },
  { condition: 'High Blood Pressure', support: 'Low-sodium diet and stress management' }
]

const mentalHealthConditions = [
  'Anxiety',
  'Depression',
  'Bipolar Disorder',
  'OCD',
  'Tourette\'s Syndrome'
]

const expertiseAreas = [
  {
    icon: BeakerIcon,
    title: 'Physical Health Support',
    description: 'Our population commonly struggles with physical health conditions. We have strong knowledge in these areas and support clients with cooking healthy meals and physical exercise to improve these conditions.',
    color: 'from-green-400 to-emerald-500',
    conditions: physicalHealthConditions
  },
  {
    icon: HeartIcon,
    title: 'Mental Health Support',
    description: 'We are experienced with supporting various mental health conditions. We work closely with therapists, psychiatrists, social workers, and pharmacists to ensure clients get the support they need and access needed medication.',
    color: 'from-purple-400 to-pink-500',
    conditions: mentalHealthConditions.map(condition => ({ condition, support: 'Collaborative care with mental health professionals' }))
  }
]

const teamApproach = [
  { icon: UserGroupIcon, title: 'Individual', description: 'Supporting personal independence and autonomy' },
  { icon: HeartIcon, title: 'Family', description: 'Collaborating with family members for comprehensive care' },
  { icon: ChartBarIcon, title: 'Case Manager', description: 'Coordinating care plans and services' },
  { icon: SparklesIcon, title: 'Team Members', description: 'Working with therapists, doctors, and specialists' }
]

export default function OurVisionPage() {
  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center text-primary-400 hover:text-primary-500 mb-6 font-medium"
              >
                <ArrowRightIcon className="w-5 h-5 mr-2 rotate-180" />
                Back to Home
              </Link>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Supporting Adults With Intellectual and Developmental Disabilities
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8 italic">
                &ldquo;Diversity and inclusion are about giving value to every human being, no matter our differences&rdquo;
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative h-96"
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/bc38fa18-9c87-413a-933f-571640c2f78b/IMG_20230303_181254.jpg"
                alt="HBCS Team"
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
              Our Vision
            </h2>
            <div className="bg-gradient-to-br from-primary-50 to-amber-50 dark:from-primary-900/20 dark:to-amber-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our vision is to assist individuals with being successfully independent in their own home. We serve individuals who don&apos;t fit into the traditional 24/7 setting but need daily supports.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We believe in a collaborative approach by working with the individual, family members, case manager, and other important team members to develop a support schedule that will give them independence, health, and joy.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Who We Serve
            </h2>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-primary-50 dark:from-amber-900/20 dark:to-primary-900/20 rounded-2xl p-8 border border-amber-100 dark:border-amber-800 text-center">
              <p className="text-xl text-gray-900 dark:text-white font-medium">
                Individuals who don&apos;t fit into the traditional 24/7 setting but need daily supports
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
              Our Expertise Areas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${area.color} mb-6`}>
                    <area.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {area.description}
                  </p>
                  <div className="space-y-3">
                    {area.conditions.map((item) => (
                      <div key={item.condition} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">{item.condition}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.support}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="order-2 lg:order-1">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/45042478-ec17-47fe-93fe-b72b121b824f/Andrew+Diane+Jenny+Conner.jpg"
                alt="HBCS Team Members"
                width={600}
                height={400}
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Collaborative Team Approach
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We believe in the power of collaboration. Our team approach ensures that each individual receives comprehensive, personalized support from multiple perspectives.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {teamApproach.map((member, index) => (
                  <motion.div
                    key={member.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="inline-flex p-2 rounded-lg bg-gradient-to-r from-primary-400 to-accent-400 mb-3">
                      <member.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {member.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
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
              Learn More About Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Discover how we can support you or your loved one
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Explore Our Services
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
