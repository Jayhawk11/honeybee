'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon, CalendarIcon, ClockIcon, MapPinIcon, BeakerIcon, MusicalNoteIcon, ComputerDesktopIcon, HomeIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const locations = [
  {
    name: 'Overland Park',
    address: '7600 W. 75th Street',
    additional: '(Inside the Overland Park Christian Church)',
    city: 'Overland Park, Kansas'
  },
  {
    name: 'Olathe',
    address: '413 E. Santa Fe Drive',
    additional: '',
    city: 'Olathe, Kansas'
  }
]

const activities = [
  {
    category: 'Sports',
    icon: BeakerIcon,
    items: ['Royals Games', 'Chiefs Games', 'KC Mavericks Hockey']
  },
  {
    category: 'Entertainment',
    icon: MusicalNoteIcon,
    items: ['Worlds of Fun', 'Haunted Houses', 'Night To Shine Prom Dance']
  },
  {
    category: 'Culture & Learning',
    icon: ComputerDesktopIcon,
    items: ['Nelson Atkins Museum', 'Kansas City Zoo', 'Educational Programs']
  },
  {
    category: 'Community & Nature',
    icon: HomeIcon,
    items: ['Family Night Events', 'Ernie Miller Park', 'Community Outings']
  }
]

const galleryImages = [
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7362848a-d668-427c-8a9c-544bb9e95292/IMG_8624.jpg',
    alt: 'Day Services Activity',
    caption: 'Daily Activities'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/a0deab37-ae72-4086-bb86-26ce61b68c60/2Mahaffie6242024.jpg',
    alt: 'Mahaffie Farmstead Visit',
    caption: 'Historical Visits'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/bb364508-f9dc-4075-bdd4-d9a4f55b8376/ErnieMiller7.jpg',
    alt: 'Ernie Miller Park',
    caption: 'Nature Activities'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/43f36e3b-2390-49d7-9656-77a67319c316/5.30.24Family+Night+4.jpg',
    alt: 'Family Night',
    caption: 'Community Events'
  }
]

export default function DayServicesPage() {
  return (
    <div className="w-full">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
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
                Day Services
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">
                Community inclusion through choice and adventure
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We offer Day Service supports focused on community inclusion, offering daily activities, fostering lifelong friendships, and a wide array of experiences
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative h-96"
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7362848a-d668-427c-8a9c-544bb9e95292/IMG_8624.jpg"
                alt="Day Services Activities"
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
                Our Locations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We offer Day Service supports at two convenient locations in the Kansas City area
              </p>
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <motion.div
                    key={location.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {location.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 dark:text-gray-300">
                          {location.address}
                        </p>
                      </div>
                      {location.additional && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm ml-8">
                          {location.additional}
                        </p>
                      )}
                      <div className="flex items-start gap-3">
                        <ClockIcon className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 dark:text-gray-300">
                          Monday - Friday, 9:00 AM - 2:00 PM
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Philosophy
              </h2>
              <div className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-2xl p-8 border border-accent-100 dark:border-accent-800 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-accent-400 to-orange-500 flex-shrink-0">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Client-Led Planning
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Each month, clients and staff put together a monthly calendar for community and in-house activities they want to participate in
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white italic">
                    &ldquo;Client-led, community-based, everyone deserves a voice&rdquo;
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  What We Offer
                </h3>
                <ul className="space-y-3">
                  {['Daily community activities', 'Lifelong friendships', 'Themed dances and events', 'Wide array of experiences', 'Inclusive environment'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-primary-50 dark:from-amber-900/20 dark:to-primary-900/20 rounded-2xl p-8 border border-amber-100 dark:border-amber-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Eligibility
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Day Services are available to individuals who qualify for the HCBS IDD Waiver.
                </p>
                <ul className="space-y-2">
                  {[
                    'Valid HCBS IDD Waiver required',
                    'Ages 18 and over',
                    'Residing in Johnson or Wyandotte County'
                  ].map((req) => (
                    <li key={req} className="flex items-center gap-2 text-sm">
                      <CheckCircleIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
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
              Our Activities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-accent-400 to-orange-500 mb-4">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircleIcon className="w-4 h-4 text-accent-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
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
              Our Experiences
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
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

      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Interested in Joining Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Request our monthly calendar or learn more about our Day Services
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-400 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Request Information
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
