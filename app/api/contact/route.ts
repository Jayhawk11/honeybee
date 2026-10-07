import { NextResponse } from 'next/server'

// Contact form delivery.
//
// The browser posts to this route on our own domain, and the server forwards the
// message to FormSubmit (https://formsubmit.co), which emails it to the recipient.
// Calling FormSubmit directly from the browser failed for visitors whose network or
// content blocker stops requests to third-party form services.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RECIPIENT = 'brett.bosley@hbcs.care'
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT}`
const SITE_ORIGIN = 'https://hbcs.care'

const SUBJECT_LABELS: Record<string, string> = {
  services: 'Services Inquiry',
  referral: 'Make a Referral',
  employment: 'Employment Opportunities',
  partnership: 'Partnership Inquiry',
  other: 'Other'
}

const LIMITS = { name: 200, email: 320, phone: 50, message: 5000 }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function fail(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status })
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return fail('Invalid request.', 400)
  }

  const name = text(body.name, LIMITS.name)
  const email = text(body.email, LIMITS.email)
  const phone = text(body.phone, LIMITS.phone)
  const subjectKey = text(body.subject, 50)
  const message = text(body.message, LIMITS.message)

  if (!name || !message || !EMAIL_PATTERN.test(email) || !(subjectKey in SUBJECT_LABELS)) {
    return fail('Please fill in your name, a valid email, a subject and a message.', 400)
  }

  const subject = SUBJECT_LABELS[subjectKey]

  let upstream: Response
  try {
    upstream = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: SITE_ORIGIN,
        Referer: `${SITE_ORIGIN}/`
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || 'Not provided',
        subject,
        message,
        _subject: `Website contact form: ${subject} - ${name}`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false'
      }),
      signal: AbortSignal.timeout(15000)
    })
  } catch (error) {
    console.error('Contact form: could not reach FormSubmit', error)
    return fail('The mail service could not be reached from the server.', 502)
  }

  const raw = await upstream.text()
  let result: { success?: unknown; message?: unknown } | null = null
  try {
    result = JSON.parse(raw)
  } catch {
    result = null
  }

  if (!upstream.ok || !result || String(result.success) !== 'true') {
    console.error('Contact form: FormSubmit rejected the message', {
      status: upstream.status,
      body: raw.slice(0, 500)
    })
    const reason =
      typeof result?.message === 'string' && result.message
        ? result.message
        : `Mail service responded with status ${upstream.status}`
    return fail(reason, 502)
  }

  return NextResponse.json({ ok: true })
}
