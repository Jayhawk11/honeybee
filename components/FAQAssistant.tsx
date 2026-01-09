'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftIcon, SparklesIcon, SparklesIcon as SparklesIcon24 } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    id: 'services',
    category: 'Services',
    question: 'What services does HBCS provide?',
    answer: 'HBCS provides Residential Supports, Day Supports, and Targeted Case Management for individuals with intellectual and developmental disabilities. Our Residential program helps individuals live in their own homes or shared living arrangements, Day Services offer daily activities and community inclusion, and our Targeted Case Management team helps individuals access and navigate available supports and services.'
  },
  {
    id: 'eligibility',
    category: 'Services',
    question: 'How do I qualify for HBCS services?',
    answer: 'To qualify for HBCS services, you must meet specific criteria: (1) Have an intellectual or developmental disability diagnosis, (2) Be eligible for Kansas HCBS IDD Waiver program, (3) Reside in Johnson or Wyandotte County in Kansas. We work with CDDOs (Community Developmental Disability Organizations) who determine eligibility and help coordinate enrollment. Contact us or your local CDDO to start the qualification process.'
  },
  {
    id: 'residential',
    category: 'Services',
    question: 'What is your Residential Services program?',
    answer: 'Our Residential Services provide 24/7 support for individuals living in their own homes or shared living arrangements. This includes: personalized care planning, daily living skills support, medication administration, community integration assistance, and behavioral support. Our goal is to help individuals live as independently as possible while receiving the support they need to thrive.'
  },
  {
    id: 'day-services',
    category: 'Services',
    question: 'What do you offer in Day Services?',
    answer: 'Our Day Services offer a variety of daily activities focused on community inclusion, skill development, and personal growth. Programs include: Daily Living Skills training (cooking, budgeting, hygiene), Community Activities (outings, social events, recreational activities), Health and Wellness monitoring, and Transportation to activities. Day Services are available Monday through Friday.'
  },
  {
    id: 'case-management',
    category: 'Services',
    question: 'What is Targeted Case Management?',
    answer: 'Targeted Case Management helps individuals and families navigate the disability service system. Our case managers assist with: accessing Medicaid Waiver services, coordinating care across multiple providers, advocating for individual needs, developing person-centered service plans, and ensuring continuity of care. The goal is to help individuals achieve their personal goals for independence and community participation.'
  },
  {
    id: 'cost',
    category: 'General',
    question: 'How much do your services cost?',
    answer: 'Cost for HBCS services varies based on the type and intensity of support needed. Most services are covered through Kansas HCBS IDD Waiver for eligible individuals. Private pay options are available for those not on waiver or needing additional services. Contact us for a personalized quote based on your specific needs and situation.'
  },
  {
    id: 'referral',
    category: 'General',
    question: 'How can I make a referral for myself or a loved one?',
    answer: 'To make a referral, you can: (1) Call us at our main office, (2) Email us at brett.bosley@hbcs.care or ashleigh.young@hbcs.care, or (3) Submit our online contact form with the person\'s information. We will contact you within 24-48 business hours to discuss the referral process and schedule an intake meeting if appropriate.'
  },
  {
    id: 'hours',
    category: 'General',
    question: 'What are your hours of operation?',
    answer: 'Our office and program hours are typically Monday-Friday, 8:00 AM - 5:00 PM, though some programs may vary. Residential supports are available 24/7. Day Services typically operate during business hours. We are closed on major holidays. Contact us for specific program schedules and availability.'
  },
  {
    id: 'funding',
    category: 'Financial',
    question: 'How is HBCS funded?',
    answer: 'HBCS is funded through multiple sources: Kansas HCBS IDD Waiver reimbursements, private pay for additional services, community grants and donations. As a 501(c)(3) non-profit organization, we also accept charitable contributions to support our mission. Donations help us enhance our programs and serve more individuals in our community.'
  },
  {
    id: 'volunteer',
    category: 'General',
    question: 'Do you have volunteer opportunities?',
    answer: 'Yes! We welcome volunteers who can help with: assisting with Day Services activities (arts & crafts, games, outings), sharing special skills (music, art, cooking, etc.), administrative support, event planning and setup, and community outreach. Volunteers must pass background checks and complete required training. Contact us to learn about current volunteer opportunities.'
  },
  {
    id: 'donate',
    category: 'Financial',
    question: 'How can I make a donation?',
    answer: 'Thank you for considering a donation! You can donate by: (1) Check on our website (we accept credit cards online), (2) Mail a check to our mailing address, (3) Call us to donate over the phone, or (4) Set up recurring monthly donations. All donations are tax-deductible. We will provide a receipt for your records. Your generosity helps support our mission of empowering individuals with disabilities.'
  },
  {
    id: 'contact',
    category: 'Contact',
    question: 'How do I contact HBCS?',
    answer: 'You can reach HBCS in several ways: (1) Phone: our main office number, (2) Email: brett.bosley@hbcs.care or ashleigh.young@hbcs.care, (3) Website: Use our contact form at the bottom of any page, (4) Mail: send letters to our mailing address, or (5) In Person: Schedule an appointment at our office. Check our Contact page for specific phone numbers, email addresses, and mailing address. We respond to all inquiries within 24-48 business hours.'
  },
  {
    id: 'emergency',
    category: 'General',
    question: 'What should I do in an emergency?',
    answer: 'For emergencies requiring immediate assistance: (1) Call 911 or your local emergency services, (2) Contact your case manager if you have one, (3) Reach out to your local CDDO emergency line. HBCS staff are available during business hours for urgent non-emergency situations. After hours, please contact your case manager or emergency services. Never hesitate to call for help if you or someone else is in immediate danger.'
  },
  {
    id: 'application',
    category: 'General',
    question: 'What should I expect during the application process?',
    answer: 'The application process typically involves: (1) Initial contact and information gathering, (2) Eligibility verification with CDDO, (3) Intake meeting to discuss needs and goals, (4) Development of person-centered service plan, (5) Scheduling and service coordination, (6) Start of services once approved. This process usually takes 1-2 weeks. We\'re here to guide you through every step and answer any questions.'
  },
]

const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]

const suggestedQuestions = [
  'What services do you provide?',
  'How do I qualify for HBCS?',
  'What are your hours?',
  'How much does it cost?',
  'How can I make a referral?',
]

export default function FAQAssistant() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: number}>>([])
  const [isTyping, setIsTyping] = useState(false)
  const [suggestedIndex, setSuggestedIndex] = useState(0)
  const [chatInput, setChatInput] = useState('')

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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                aria-label="Search FAQ"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <span className="text-2xl">×</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Suggested Questions */}
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
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

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {searchedFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* FAQ Question */}
                <button
                  onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
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

        {/* AI Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-primary-400 p-6">
            <div className="flex items-center gap-3 mb-6">
              <ChatBubbleLeftIcon className="w-8 h-8 text-primary-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ask Me Anything
              </h3>
              {isTyping && (
                <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    AI is thinking...
                  </motion.span>
                </span>
              )}
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {chatMessages.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500 dark:text-gray-400 italic"
                >
                  No messages yet. Ask me a question to get started!
                </motion.p>
              )}

              {chatMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.role === 'user' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'user' && (
                    <div className="max-w-[70%] bg-primary-100 dark:bg-primary-600 text-white rounded-2xl rounded-tl-none px-4 py-3">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  )}
                  {message.role === 'assistant' && (
                    <div className="flex items-start gap-2 max-w-[70%]">
                      <div className="w-8 h-8 rounded-full bg-primary-400 dark:bg-primary-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                        <ChatBubbleLeftIcon className="w-4 h-4" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tr-2xl rounded-bl-2xl px-4 py-3">
                        <p className="text-sm text-gray-800 dark:text-gray-200">{message.content}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Type your question here..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && chatInput.trim()) {
                    handleAskQuestion(chatInput)
                    setChatInput('')
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                aria-label="Type your question"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (chatInput.trim()) {
                    handleAskQuestion(chatInput)
                    setChatInput('')
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-primary-400 to-accent-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>

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
