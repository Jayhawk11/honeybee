/**
 * Location Data
 * Centralized location information used across the application
 */

export interface Location {
  id: string
  name: string
  address: string
  additional?: string
  city: string
  hours: string
  phone?: string
  services: string[]
  position: [number, number]
  color: string
  image?: string
}

export const locations: Location[] = [
  {
    id: 'overland-park',
    name: 'Overland Park Day Services',
    address: '7600 W. 75th Street',
    additional: 'Inside Overland Park Christian Church',
    city: 'Overland Park, Kansas',
    hours: 'Monday - Friday: 9:00 AM - 2:00 PM',
    services: ['Day Supports', 'Community Activities', 'Social Inclusion'],
    position: [38.9784, -94.6739],
    color: '#F59E0B',
    image: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7362848a-d668427c-8a9c-544bb9e95292/IMG_8624.jpg'
  },
  {
    id: 'olathe',
    name: 'Olathe Day Services',
    address: '413 E. Santa Fe Drive',
    city: 'Olathe, Kansas',
    hours: 'Monday - Friday: 9:00 AM - 2:00 PM',
    services: ['Day Supports', 'Community Activities', 'Skills Training'],
    position: [38.8814, -94.8191],
    color: '#EA580C',
    image: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/8b1ba66a-c7d3-49f9-e08-8156d390ab76/field+day+pic+2+2025.jpg'
  },
  {
    id: 'kansas-city',
    name: 'Service Coverage',
    address: 'Johnson & Wyandotte Counties',
    additional: 'Kansas City Metropolitan Area',
    city: 'Kansas',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
    services: ['HCBS IDD Waiver Services', 'Residential Supports', 'Targeted Case Management'],
    position: [38.9822, -94.6708],
    color: '#8B5CF6'
  }
]
