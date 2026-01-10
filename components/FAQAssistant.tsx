'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftIcon, SparklesIcon, SparklesIcon as SparklesIcon24 } from '@heroicons/react/24/outline'
import { faqs, categories } from '@/data/faqs'
import FAQSuggestedQuestions from './FAQAssistant/FAQSuggestedQuestions'
import FAQCategories from './FAQAssistant/FAQCategories'
import FAQSearch from './FAQAssistant/FAQSearch'
import FAQList from './FAQAssistant/FAQList'
import AIChat from './FAQAssistant/AIChat'

export default function FAQAssistant() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: number}>>([])
  const [isTyping, setIsTyping] = useState(false)

  const filteredFAQs = activeCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory)

  const searchedFAQs = searchQuery.trim()
    ? filteredFAQs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredFAQs

  const handleAskQuestion = (question: string) => {
    const userMessage = { role: 'user' as const, content: question, timestamp: Date.now() }
    setChatMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
      const relevantFAQ = faqs.find(faq =>
        question.toLowerCase().includes('services') ||
        question.toLowerCase().includes('cost') ||
        question.toLowerCase().includes('hours') ||
        question.toLowerCase().includes('qualify')
      )

      let response = ''
      if (relevantFAQ) {
        response = `Based on your question about "${relevantFAQ.question}", here's what I can tell you: ${relevantFAQ.answer}`
      } else if (question.toLowerCase().includes('contact') || question.toLowerCase().includes('call') || question.toLowerCase().includes('email')) {
        response = "You can contact HBCS in several ways: 📞 Phone: Call our main office during business hours. 📧 Email: brett.bosley@hbcs.care or ashleigh.young@hbcs.care. 📧 Website: Use the contact form on any page. 📧 Mail: Send to our mailing address. 💻 In Person: Schedule an appointment. We respond within 24-48 hours!"
      } else if (question.toLowerCase().includes('help') || question.toLowerCase().includes('support')) {
        response = "I'm here to help! HBCS provides Residential Supports, Day Supports, and Targeted Case Management. Which type of support are you interested in learning about? You can also ask about eligibility, costs, or how to make a referral. What would you like to know more about?"
      } else {
        response = "I'd be happy to help answer that! Let me search our FAQ database for relevant information about: " + question + "\n\nSome common topics include our services, eligibility requirements, costs, hours, and contact information. Feel free to ask me anything about HBCS!"
      }

      const assistantMessage = { role: 'assistant' as const, content: response, timestamp: Date.now() }
      setChatMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestedClick = (question: string) => {
    setChatMessages(prev => [...prev, { role: 'user' as const, content: question, timestamp: Date.now() }])
    handleAskQuestion(question)
  }

  return (
    <section id="faq" data-testid="faq-section" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y:  0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <SparklesIcon className="w-10 h-10 text-primary-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              AI-Powered FAQ Assistant
            </h2>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <SparklesIcon24 className="w-8 h-8 text-primary-400" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ask me anything about HBCS services, eligibility, costs, or general questions.
            I'm here to help!
          </p>
        </motion.div>

        {/* Search Bar */}
        <FAQSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />

        {/* Suggested Questions */}
        <FAQSuggestedQuestions onQuestionClick={handleSuggestedClick} />

        {/* Category Filter */}
        <FAQCategories
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />

        {/* FAQ Accordion */}
        <FAQList
          faqs={searchedFAQs}
          activeFAQ={activeFAQ}
          onFAQToggle={setActiveFAQ}
        />

        {/* AI Chat Interface */}
        <AIChat
          messages={chatMessages}
          isTyping={isTyping}
          onSend={handleAskQuestion}
        />

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Can't find what you're looking for?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-xl font-semibold border-2 border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg transition-all"
          >
            <SparklesIcon className="w-5 h-5" />
            Contact Us Directly
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
