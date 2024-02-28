import React, { ForwardedRef, forwardRef } from 'react'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

function InputNumber(
  {
    name,
    className,
    errorMessage,
    onChange,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }

  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default forwardRef(InputNumber)
