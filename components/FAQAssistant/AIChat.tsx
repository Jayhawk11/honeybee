import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface AIChatProps {
  messages: ChatMessage[]
  isTyping: boolean
  onSend: (message: string) => void
}

export default function AIChat({ messages, isTyping, onSend }: AIChatProps) {
  const [chatInput, setChatInput] = useState('')

  const handleSend = () => {
    if (chatInput.trim()) {
      onSend(chatInput)
      setChatInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && chatInput.trim()) {
      onSend(chatInput)
      setChatInput('')
    }
  }

  return (
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
          {messages.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 dark:text-gray-400 italic"
            >
              No messages yet. Ask me a question to get started!
            </motion.p>
          )}

          {messages.map((message, index) => (
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
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            aria-label="Type your question"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="px-6 py-3 bg-gradient-to-r from-primary-400 to-accent-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Send
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
