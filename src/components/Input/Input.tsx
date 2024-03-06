import React from 'react'
import { UseFormRegister, RegisterOptions, UseFormSetValue } from 'react-hook-form'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  setValue?: UseFormSetValue<any>
}

export default function Input({
  name,
  className,
  errorMessage,
  register,
  rules,
  setValue,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  ...rest
}: InputProps) {
  const registerResult = register && name ? register(name, rules) : null

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const _value = event.target.value.trim()
    if (name && setValue) {
      setValue(name, _value)
      event.target.value = _value
    }
    registerResult && registerResult.onBlur(event)
  }

  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...registerResult} onBlur={handleBlur} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
