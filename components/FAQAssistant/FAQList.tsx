import { motion, AnimatePresence } from 'framer-motion'
import type { FAQItem } from '@/data/faqs'

interface FAQListProps {
  faqs: FAQItem[]
  activeFAQ: string | null
  onFAQToggle: (id: string | null) => void
}

export default function FAQList({ faqs, activeFAQ, onFAQToggle }: FAQListProps) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* FAQ Question */}
            <button
              onClick={() => onFAQToggle(activeFAQ === faq.id ? null : faq.id)}
              className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              aria-expanded={activeFAQ === faq.id}
              aria-controls={`faq-answer-${faq.id}`}
            >
              <div className="flex items-start gap-3 flex-1">
                <motion.span
                  animate={{ rotate: activeFAQ === faq.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 flex-shrink-0"
                >
                  <span className="text-2xl text-primary-500 dark:text-primary-400">💬</span>
                </motion.span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
              </div>
              <motion.span
                animate={{ rotate: activeFAQ === faq.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-gray-400">▼</span>
              </motion.span>
            </button>

            {/* FAQ Answer */}
            <AnimatePresence>
              {activeFAQ === faq.id && (
                <motion.div
                  id={`faq-answer-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: { duration: 0.3, ease: 'easeInOut' }
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: 0.3, ease: 'easeInOut' }
                  }}
                  className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700"
                >
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
