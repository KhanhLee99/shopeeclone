import React from 'react'
import { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  errorMessage?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  placeholder,
  autoComplete,
  name,
  className,
  errorMessage,
  register,
  rules
}: InputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name as string, rules)}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
