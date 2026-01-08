import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Gallery from '../Gallery'

expect.extend(toHaveNoViolations)

describe('Gallery Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Gallery />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
