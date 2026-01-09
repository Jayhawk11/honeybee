'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon, HomeIcon, UserGroupIcon, BeakerIcon, ScaleIcon, ShoppingCartIcon, HeartIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const galleryImages = [
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/8b1ba66a-c7d3-49f9-9e08-8156d390ab76/field+day+pic+2+2025.jpg',
    alt: 'Community Activities - Field Day',
    caption: 'Community Activities'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/a47178f2-3ae4-48df-8341-eb5f40e34aa6/gmrb+2025.jpg',
    alt: 'GMRB Event',
    caption: 'GMRB Event'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/79f471bf-cf9e-4293-ada4-f281dcb379ab/royals.jpg',
    alt: 'Royals Game',
    caption: 'Sports Events'
  }
]

const disabilities = [
  'Autism',
  'Asperger syndrome',
  'Down Syndrome',
  'Cerebral palsy',
  'Fragile X Syndrome',
  'Fetal Alcohol Syndrome',
  'Spina Bifida',
  'Williams Syndrome'
]

const approachCards = [
  {
    icon: HomeIcon,
    title: 'Daily Living Skills',
    description: 'Assistance with hygiene, household tasks, and personal care'
  },
  {
    icon: BeakerIcon,
    title: 'Healthy Nutrition',
    description: 'Healthy meal preparation and grocery shopping support'
  },
  {
    icon: HeartIcon,
    title: 'Physical Activity',
    description: 'Encouraging active lifestyles through exercise and recreation'
  },
  {
    icon: UserGroupIcon,
    title: 'Social Activities',
    description: 'Community engagement and building meaningful relationships'
  },
  {
    icon: ScaleIcon,
    title: 'Medication Management',
    description: 'Proper medication administration and health monitoring'
  },
  {
    icon: CalendarIcon,
    title: 'Medical Appointments',
    description: 'Coordination and accompaniment to healthcare visits'
  },
  {
    icon: ShoppingCartIcon,
    title: 'Budgeting & Shopping',
    description: 'Financial planning and practical shopping assistance'
  },
  {
    icon: ChartBarIcon,
    title: 'Advocacy',
    description: 'Standing up for individual rights and preferences'
  }
]

export default function ResidentialServicesPage() {
  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
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
                Residential Services
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
                Supporting independent living with everyday assistance
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We provide residential supports to individuals with intellectual and developmental disabilities, working closely with families to create enriching, independent lifestyles
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative h-96"
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/a47178f2-3ae4-48df-8341-eb5f40e34aa6/gmrb+2025.jpg"
                alt="Residential Services Activities"
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
            className="grid lg:grid-cols-2 gap-16 mb-20"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Who We Serve
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We support individuals who qualify for the Home and Community Based Services (IDD) waiver through Kansas&apos; Medicaid program.
              </p>
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Intellectual and Developmental Disabilities We Support:
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {disabilities.map((disability) => (
                    <div key={disability} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{disability}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Eligibility Requirements
                </h3>
                <ul className="space-y-3">
                  {[
                    'Confirmed IDD diagnosis through qualified assessment',
                    'Qualification for Kansas HCBS IDD Waiver',
                    'Meeting state income and needs criteria',
                    'Referral through local CDDO (Johnson or Wyandotte County)'
                  ].map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Services are provided through the HCBS IDD Waiver, which supports community-based living rather than institutional care.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Collaborative Approach
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We assist our individuals by being an active and involved part of their everyday lives. We work closely with the individual&apos;s family and support team to provide the most enriching lifestyle possible.
              </p>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800 mb-6">
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Our focus areas include:
                </p>
                <ul className="space-y-2">
                  {['Building daily living skills', 'Providing healthy nutritional choices', 'Being physically active'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Community-Integrated Living
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our residential supports are designed to be community-integrated, enabling individuals to live in their own homes or shared living arrangements while receiving the personalized daily support they need to thrive independently.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This model promotes greater autonomy and community connection compared to traditional 24/7 group home settings, while still ensuring safety and personalized care.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Support Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {approachCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary-400 to-primary-600 mb-4">
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Community Life
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Learn More?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Find out if you qualify for our Residential Services
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Check Eligibility
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
