import { motion } from 'framer-motion'
import { categories } from '@/data/faqs'

interface FAQCategoriesProps {
  activeCategory: string
  onCategoryClick: (category: string) => void
}

export default function FAQCategories({ activeCategory, onCategoryClick }: FAQCategoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-2 mb-12"
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryClick(category)}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            activeCategory === category
              ? 'bg-gradient-to-r from-primary-400 to-accent-400 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          aria-label={`Filter by ${category}`}
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </motion.div>
  )
}
