'use client'

import { cn } from '@/lib/utils'

interface FormInputProps {
  id: string
  name: string
  label: string
  type?: 'text' | 'email' | 'tel'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
  className?: string
  error?: string
}

export function FormInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
  placeholder,
  className,
  error
}: FormInputProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && '*'}
      </label>
      <input
        type={type}
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
        placeholder={placeholder}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-600 text-sm">
          {error}
        </p>
      )}
    </div>
  )
}
