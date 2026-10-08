'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { FormInput } from './FormInput'
import { FormSelect, FormSelectOption } from './FormSelect'
import { cn } from '@/lib/utils'

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void> | void
  /** Address offered as a "send it from your own email" link when delivery fails. */
  fallbackEmail?: string
  className?: string
}

export function ContactForm({ onSubmit, fallbackEmail, className }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorDetail, setErrorDetail] = useState('')
  // Honeypot: hidden from people, filled in by bots. A filled value means we drop the submission.
  const [honeypot, setHoneypot] = useState('')

  const validateField = (name: string, value: string) => {
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value) return 'Email is required'
      if (!emailRegex.test(value)) return 'Please enter a valid email address'
    }
    if (name === 'name' && !value) return 'Name is required'
    if (name === 'subject' && !value) return 'Please select a subject'
    if (name === 'message' && !value) return 'Message is required'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value.trim())
      if (error) newErrors[name] = error
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    if (honeypot) {
      // Pretend it worked so bots get no signal, but send nothing.
      setStatus('success')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setErrorDetail('')
    try {
      await onSubmit(formData)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setStatus('success')
    } catch (error) {
      // Keep what the visitor typed so they can retry.
      const detail = error instanceof Error ? error.message : ''
      setErrorDetail(
        detail === 'Failed to fetch' || detail.startsWith('NetworkError')
          ? 'The mail service could not be reached (network problem or a content blocker).'
          : detail
      )
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Validate on blur or after error exists
    if (errors[name]) {
      const error = validateField(name, value)
      setErrors(prev => {
        const newErrors = { ...prev }
        if (error) {
          newErrors[name] = error
        } else {
          delete newErrors[name]
        }
        return newErrors
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[name] = error
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }

  // Pre-filled email carrying what the visitor typed, for when the form cannot deliver.
  const fallbackHref = fallbackEmail
    ? `mailto:${fallbackEmail}?subject=${encodeURIComponent(
        `Website message from ${formData.name || 'a visitor'}`
      )}&body=${encodeURIComponent(
        `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}`
      )}`
    : undefined

  const subjectOptions: FormSelectOption[] = [
    { value: 'services', label: 'Services Inquiry' },
    { value: 'referral', label: 'Make a Referral' },
    { value: 'employment', label: 'Employment Opportunities' },
    { value: 'partnership', label: 'Partnership Inquiry' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="Your name"
          error={errors.name}
        />
        <FormInput
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="your@email.com"
          error={errors.email}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="(913) 555-0100"
          error={errors.phone}
        />
        <FormSelect
          id="subject"
          name="subject"
          label="Subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          options={subjectOptions}
          error={errors.subject}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          className={cn(
            "w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:ring-2 focus:border-transparent transition-all text-gray-900 dark:text-white resize-none",
            errors.message
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 dark:border-gray-600 focus:ring-primary-400"
          )}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-red-600 text-sm">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'success' && (
        <p
          role="status"
          data-testid="contact-form-success"
          className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200"
        >
          Thank you for your message! We will get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p
          role="alert"
          data-testid="contact-form-error"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200"
        >
          Sorry, your message could not be sent. Please try again, or call us at 913-710-1406.
          {fallbackHref && (
            <a
              href={fallbackHref}
              data-testid="contact-form-email-fallback"
              className="mt-1 block font-semibold underline"
            >
              Or send this message from your own email
            </a>
          )}
          {errorDetail && (
            <span data-testid="contact-form-error-detail" className="mt-1 block text-xs opacity-80">
              Details: {errorDetail}
            </span>
          )}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          <>
            <PaperAirplaneIcon className="w-5 h-5" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  )
}
