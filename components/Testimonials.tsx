'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Family Member',
    content: 'HBCS has been a blessing for our family. The care and support they provide to our son has been exceptional. We\'ve seen him grow and thrive in ways we never thought possible.',
    rating: 5
  },
  {
    name: 'John D.',
    role: 'Program Participant',
    content: 'I love coming to the day program! The staff are so nice and I\'ve made lots of friends. We do fun activities and I feel happy and supported here.',
    rating: 5
  },
  {
    name: 'Michael R.',
    role: 'Program Participant',
    content: 'Living in my own apartment with HBCS support has given me independence and confidence. I\'m proud of how far I\'ve come and grateful for everyone who helps me.',
    rating: 5
  },
  {
    name: 'Linda T.',
    role: 'Family Member',
    content: 'The case management team has been incredible. They\'ve helped us navigate the complex system of services and always advocate for what\'s best for our daughter.',
    rating: 5
  },
  {
    name: 'Robert K.',
    role: 'Program Participant',
    content: 'I\'ve learned so many new skills through the residential program. I can cook meals, manage my schedule, and feel more confident every day.',
    rating: 5
  },
  {
    name: 'Emily W.',
    role: 'Family Member',
    content: 'The staff at HBCS truly care about the individuals they support. They go above and beyond every single day. We couldn\'t ask for a better partner in our loved one\'s care.',
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <QuoteIcon className="w-8 h-8 text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What People Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hear from the individuals and families who have experienced the HBCS difference
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative border border-gray-100 dark:border-gray-700"
            >
              <div className="absolute -top-4 left-8">
                <QuoteIcon className="w-8 h-8 text-primary-300" />
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl max-w-4xl mx-auto border border-gray-100 dark:border-gray-700">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Join the hundreds of individuals and families who trust HBCS
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
