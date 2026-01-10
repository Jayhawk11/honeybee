import { motion } from 'framer-motion'
import { suggestedQuestions } from '@/data/faqs'

interface FAQSuggestedQuestionsProps {
  onQuestionClick: (question: string) => void
}

export default function FAQSuggestedQuestions({ onQuestionClick }: FAQSuggestedQuestionsProps) {
  const handleSuggestedClick = (question: string) => {
    onQuestionClick(question)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Try asking:
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {suggestedQuestions.map((question, index) => (
          <motion.button
            key={index}
            onClick={() => handleSuggestedClick(question)}
            className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border-2 border-primary-400 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-400 hover:text-white dark:hover:bg-primary-500 transition-all shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {question}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
