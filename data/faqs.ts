export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export const faqs: FAQItem[] = [
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
  }
]

export const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]

export const suggestedQuestions = [
  'What services do you provide?',
  'How do I qualify for HBCS?',
  'What are your hours?',
  'How much does it cost?',
  'How can I make a referral?',
]
