import '@testing-library/jest-dom'

jest.mock('next/image', () => {
  const { forwardRef } = require('react')
  return {
    __esModule: true,
    default: forwardRef(({ fill, priority, ...props }, ref) => {
      return <img ref={ref} {...props} />
    }),
  }
})

jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
  },
  AnimatePresence: ({ children }) => children,
}))

jest.mock('@heroicons/react/24/outline', () => ({
  XMarkIcon: () => null,
  ChevronLeftIcon: () => null,
  ChevronRightIcon: () => null,
  MagnifyingGlassIcon: () => null,
}))
