import { HeartIcon, UsersIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export interface StatData {
  value: string
  label: string
  color: string
}

export interface ValueData {
  icon: typeof HeartIcon
  title: string
  description: string
}

export const aboutData = {
  mission: {
    title: 'Our Mission',
    content: 'At Honey Bee Community Services, our mission is to provide exceptional, person-centered supports that empower adults with intellectual and developmental disabilities to achieve their highest level of independence and quality of life. We believe that every individual has unique gifts and deserves the opportunity to live, work, and thrive in their community.',
    additional: 'Our team of dedicated professionals works collaboratively with individuals, families, and community partners to create personalized support plans that honor each person&apos;s goals, preferences, and dreams. We are committed to fostering an environment of dignity, respect, and continuous improvement.'
  },
  stats: [
    { value: '10+', label: 'Years Serving', color: 'text-honey-500' },
    { value: '500+', label: 'Individuals Supported', color: 'text-bee-amber' },
    { value: '50+', label: 'Team Members', color: 'text-bee-gold' },
    { value: '98%', label: 'Satisfaction Rate', color: 'text-honey-600' }
  ] as StatData[],
  story: {
    title: 'Our Story',
    summary: 'Founded in 2013 by Brett Bosley, HBCS was born from a personal mission to support individuals with intellectual and developmental disabilities.',
    founder: 'Brett Bosley',
    founded: 2013,
    fullStory: 'Brett grew up with a sibling who had developmental disabilities, giving him a unique perspective on the challenges and triumphs individuals experience. While serving as a Targeted Case Manager, he identified a critical gap: individuals needed daily supports but wanted the independence they couldn&apos;t find in traditional 24/7 group homes.',
    growth: 'Driven by this vision, Brett built HBCS around an independent living model—high-quality, person-centered supports that empower individuals to live in their own homes, make their own choices, and thrive in their communities. What started as one person&apos;s vision has grown into an organization serving hundreds across Johnson and Wyandotte Counties.'
  },
  recognition: {
    title: 'Recognized Community Provider',
    description: 'HBCS is proud to be an affiliated provider listed in official county resources, serving as a trusted partner in the regional disability support network.',
    cddoAffiliations: ['Johnson County CDDO', 'Wyandotte County CDDO'],
    communityInvolvement: [
      'Annual Johnson County IDD Resource Fair',
      'Participating provider in county networks',
      'Community partnerships for client engagement'
    ]
  },
  values: [
    {
      icon: HeartIcon,
      title: 'Compassion',
      description: 'We approach every individual with empathy, dignity, and respect, ensuring they feel valued and heard.'
    },
    {
      icon: UsersIcon,
      title: 'Community',
      description: 'We believe in the power of community and work to create inclusive environments where everyone belongs.'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'We continuously seek new and better ways to support individuals on their journey to independence.'
    },
    {
      icon: ChartBarIcon,
      title: 'Excellence',
      description: 'We are committed to providing the highest quality services and consistently exceeding expectations.'
    }
  ] as ValueData[]
}
