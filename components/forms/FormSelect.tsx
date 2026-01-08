'use client'

import { cn } from '@/lib/utils'

export interface FormSelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  required?: boolean
  options: FormSelectOption[]
  className?: string
  error?: string
}

export function FormSelect({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  required = false,
  options,
  className,
  error
}: FormSelectProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && '*'}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={cn(
          "w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:ring-2 focus:border-transparent transition-all text-gray-900 dark:text-white",
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 dark:border-gray-600 focus:ring-primary-400"
        )}
      >
        <option value="">Select a subject</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-600 text-sm">
          {error}
        </p>
      )}
    </div>
  )
}
