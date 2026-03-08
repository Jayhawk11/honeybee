import { HomeIcon, SunIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export interface ServiceData {
  id: string
  icon: typeof HomeIcon
  title: string
  description: string
  features: string[]
  color: string
  bgColor: string
  image: string
}

export const services: ServiceData[] = [
  {
    id: 'services-residential',
    icon: HomeIcon,
    title: 'Residential Supports',
    description: 'Our residential program provides individuals with intellectual and developmental disabilities opportunity to live in their own homes or apartments in community. We offer 24/7 support tailored to each person\'s unique needs, helping them develop life skills, maintain their health, and achieve their personal goals.',
    features: [
      '24/7 personalized support',
      'Skill development and training',
      'Community integration activities',
      'Health and medication management',
      'Family collaboration and support'
    ],
    color: 'from-honey-400 to-honey-600',
    bgColor: 'bg-honey-50 dark:bg-honey-900/20',
    image: '/images/residential-supports.jpg'
  },
  {
    id: 'services-day',
    icon: SunIcon,
    title: 'Day Supports',
    description: 'Our Day Supports program offers a variety of activities designed to enhance quality of life, build social connections, and develop new skills in a fun, supportive environment. Participants engage in community outings, creative activities, physical exercise, and educational opportunities.',
    features: [
      'Community integration outings',
      'Art and music therapy',
      'Physical fitness programs',
      'Life skills workshops',
      'Social and recreational activities'
    ],
    color: 'from-bee-amber to-honey-700',
    bgColor: 'bg-bee-cream dark:bg-bee-amber/10',
    image: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7362848a-d668-427c-8a9c-544bb9e95292/IMG_8624.jpg'
  },
  {
    id: 'services-tcm',
    icon: UserGroupIcon,
    title: 'Targeted Case Management',
    description: 'Our Targeted Case Management services help individuals navigate complex system of available supports and services. Our experienced case managers work closely with individuals and their families to coordinate care, advocate for needs, and ensure access to appropriate community resources.',
    features: [
      'Service coordination and planning',
      'Advocacy and resource navigation',
      'Monitoring and support',
      'Crisis intervention assistance',
      'Connection to community resources'
    ],
    color: 'from-honey-500 to-bee-gold',
    bgColor: 'bg-wax-100 dark:bg-wax-900/20',
    image: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7a3b8e8d-5315-4fb7-81c7-b94a2e2a15d7/5.14.24CatCafe6.jpg'
  }
]
