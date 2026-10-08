'use client'

import { MapPinIcon, ClockIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { FadeIn, FadeInLeft, FadeInRight } from '@/lib/animations'
import { ContactForm, ContactFormData } from '@/components/forms/ContactForm'

const contactInfo = [
  {
    icon: ClockIcon,
    label: 'Hours',
    value: 'Monday - Friday: 9:00 AM - 2:00 PM',
    link: undefined
  },
  {
    icon: MapPinIcon,
    label: 'Overland Park Location',
    value: '7600 W. 75th Street Overland Park, Kansas (Inside Overland Park Christian Church)',
    link: 'https://maps.google.com/?q=7600+W+75th+Street,+Overland+Park,+Kansas'
  },
  {
    icon: MapPinIcon,
    label: 'Olathe Location',
    value: '413 E. Santa Fe Drive Olathe, Kansas',
    link: 'https://maps.google.com/?q=413+E+Santa+Fe+Drive,+Olathe,+Kansas'
  },
  {
    icon: PaperAirplaneIcon,
    label: 'Mailing Address',
    value: 'PO Box 23532, Overland Park, KS 66283',
    link: undefined
  },
  {
    icon: PaperAirplaneIcon,
    label: 'General Inquiries',
    value: '913-948-3002',
    link: 'tel:913-948-3002'
  },
  {
    icon: PaperAirplaneIcon,
    label: 'Brett Bosley - Owner/Operator',
    value: '913-710-1406',
    link: 'tel:913-710-1406'
  }
]

const CONTACT_FORM_RECIPIENT = 'brett.bosley@hbcs.care'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
// Web3Forms access keys are public by design: the key only identifies which inbox
// receives the messages. To change the recipient, create a new key at web3forms.com.
const WEB3FORMS_ACCESS_KEY = '98a1361c-c6f6-4e6b-bbbe-98132aecabbf'

const SUBJECT_LABELS: Record<string, string> = {
  services: 'Services Inquiry',
  referral: 'Make a Referral',
  employment: 'Employment Opportunities',
  partnership: 'Partnership Inquiry',
  other: 'Other'
}

export default function Contact() {
  const handleSubmit = async (data: ContactFormData) => {
    // Sent from the visitor's browser to Web3Forms (https://web3forms.com), which emails
    // it to the inbox the access key was created for. Sent as form data so the browser
    // makes a simple request with no CORS preflight. Throws on failure so ContactForm
    // can show an error, keep the visitor's text, and offer the direct-email fallback.
    const subject = SUBJECT_LABELS[data.subject] ?? data.subject
    const body = new FormData()
    body.append('access_key', WEB3FORMS_ACCESS_KEY)
    body.append('subject', `Website contact form: ${subject} - ${data.name}`)
    body.append('from_name', 'HBCS Website')
    body.append('replyto', data.email)
    body.append('name', data.name)
    body.append('email', data.email)
    body.append('phone', data.phone || 'Not provided')
    body.append('topic', subject)
    body.append('message', data.message)

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body
    })

    const result = await response.json().catch(() => null)
    if (!response.ok || !result || result.success !== true) {
      console.error('Contact form delivery failed', { status: response.status, result })
      throw new Error(result?.message || `Mail service responded with status ${response.status}`)
    }
  }

  return (
    <section id="contact" data-testid="contact-section" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          <FadeInLeft>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Get in Touch
            </h3>

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-3 bg-gradient-to-r from-primary-400 to-accent-400 rounded-xl">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      {item.label}
                    </p>
                    {item.label.includes('Brett Bosley') ? (
                      <div>
                        <a
                          href={item.link}
                          className="text-gray-900 dark:text-white hover:text-primary-400 transition-colors block"
                        >
                          {item.value}
                        </a>
                        <a
                          href="mailto:brett.bosley@hbcs.care"
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-400 transition-colors"
                        >
                          brett.bosley@hbcs.care
                        </a>
                      </div>
                    ) : item.label.includes('General Inquiries') ? (
                      <div>
                        <a
                          href={item.link}
                          className="text-gray-900 dark:text-white hover:text-primary-400 transition-colors block"
                        >
                          {item.value}
                        </a>
                        <a
                          href="mailto:luke.barton@hbcs.care"
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-400 transition-colors"
                        >
                          luke.barton@hbcs.care
                        </a>
                      </div>
                    ) : item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-900 dark:text-white hover:text-primary-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeInLeft>

          <FadeInRight>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Send a Message
            </h3>

            <ContactForm onSubmit={handleSubmit} fallbackEmail={CONTACT_FORM_RECIPIENT} />
          </FadeInRight>
        </div>
      </div>
    </section>
  )
}
