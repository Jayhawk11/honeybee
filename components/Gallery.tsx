'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const galleryImages = [
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/d7b9137c-c4d9-4120-9c8c-950cc6937350/dance+62025.jpg',
    alt: 'Group of people with intellectual and developmental disabilities dancing together at a themed community dance event, wearing colorful coordinated outfits and smiling with joy',
    caption: 'Themed dances and community events',
    category: 'Events'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/d057acf6-5a97-485c-8d52-bda8cde44147/10Mahaffie6242024.jpg',
    alt: 'Group of individuals from HBCS visiting the historic Mahaffie Farmstead for an educational field trip, exploring the heritage farm grounds together',
    caption: 'Historical site visits and educational trips',
    category: 'Activities'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/889b8de9-59fc-4c35-9c9a-0e49fafe5d43/IMG_9455.jpg',
    alt: 'HBCS community members enjoying a group outing in the local community, practicing inclusion and social skills while having fun together',
    caption: 'Community inclusion activities',
    category: 'Community'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/7362848a-d668-427c-8a9c-544bb9e95292/IMG_8624.jpg',
    alt: 'Adults with developmental disabilities participating in engaging day services activities, including arts and crafts, skill-building exercises, and social interaction',
    caption: 'Daily activities and skill building',
    category: 'Day Services'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/8b1ba66a-c7d3-49f9-9e08-8156d390ab76/field+day+pic+2+2025.jpg',
    alt: 'HBCS residential program participants actively enjoying outdoor field day activities including games, sports, and team-building exercises',
    caption: 'Field day and community sports',
    category: 'Residential'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/a0deab37-ae72-4086-bb86-26ce61b68c60/2Mahaffie6242024.jpg',
    alt: 'Large group photograph of HBCS members and staff during a fun group outing to Mahaffie Farmstead, showing community connection and joy',
    caption: 'Group outings to local attractions',
    category: 'Activities'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/bb364508-f9dc-4075-bdd4-d9a4f55b8376/ErnieMiller7.jpg',
    alt: 'HBCS community members exploring nature trails and outdoor activities at Ernie Miller Nature Center, enjoying the outdoors and learning about wildlife',
    caption: 'Nature and outdoor activities',
    category: 'Outdoors'
  },
  {
    src: 'https://images.squarespace-cdn.com/content/v1/607f3625e431676659d422f5/43f36e3b-2390-49d7-9656-77a67319c316/5.30.24Family+Night+4.jpg',
    alt: 'Warm and joyful family night event bringing together individuals, their families, and HBCS staff for community building and celebration',
    caption: 'Family and community events',
    category: 'Community'
  }
]

const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const lightboxRef = useRef<HTMLDivElement>(null)

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setSelectedImage(filteredImages[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  // Focus trap for lightbox
  useEffect(() => {
    if (selectedImage && lightboxRef.current) {
      const focusableElements = lightboxRef.current.querySelectorAll(
        'button, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      document.addEventListener('keydown', handleTab)
      firstElement?.focus()

      return () => {
        document.removeEventListener('keydown', handleTab)
      }
    }
  }, [selectedImage])

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <MagnifyingGlassIcon className="w-8 h-8 text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Life at HBCS
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore moments of joy, growth, and community in our gallery
          </p>
        </motion.div>

        {/* Live region for screen readers */}
        <div
          role="status"
          aria-live="polite"
          className="sr-only"
        >
          Showing {filteredImages.length} images in {selectedCategory === 'All' ? 'all categories' : selectedCategory}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              aria-label={`Filter by ${category === 'All' ? 'all categories' : category}`}
              aria-pressed={selectedCategory === category}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-400 to-accent-400 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold mb-1">{image.caption}</p>
                  <span className="text-white/80 text-sm">{image.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-pointer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
            >
              <motion.div
                ref={lightboxRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[90vh] w-full"
              >
                <button
                  onClick={closeLightbox}
                  aria-label="Close image viewer"
                  className="absolute -top-4 -right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-900 dark:text-white" />
                </button>

                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-900 dark:text-white" />
                </button>

                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-900 dark:text-white" />
                </button>

                <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <p id="lightbox-title" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedImage.caption}
                    </p>
                    <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {selectedImage.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
