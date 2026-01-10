import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface FAQSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onClear: () => void
}

export default function FAQSearch({ searchQuery, onSearchChange, onClear }: FAQSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            aria-label="Search FAQ"
          />
          {searchQuery && (
            <button
              onClick={onClear}
              className="absolute right-4 top-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
