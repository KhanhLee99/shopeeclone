import React from 'react'
import { LoadingIndicator } from '../Icons'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonType?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'middle' | 'large'
  block?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

export default function Button(props: ButtonProps) {
  const {
    className,
    loading,
    disabled,
    children,
    buttonType = 'primary',
    size = 'middle',
    block,
    icon,
    ...rest
  } = props
  let newClassName = `${className} flex items-center justify-center`

  switch (buttonType) {
    case 'primary':
      newClassName += disabled
        ? ' cursor-not-allowed text-gray-200 bg-gray-300'
        : ' bg-orange text-white hover:bg-orange/80'
      break
    case 'secondary':
      newClassName += disabled
        ? ' cursor-not-allowed text-gray-200 bg-gray-300'
        : ' bg-white text-black hover:bg-slate-100'
      break
    case 'ghost':
      newClassName += disabled
        ? ' cursor-not-allowed text-gray-200 bg-gray-300 border border-gray-200'
        : ' border border-orange text-orange bg-orange/10 hover:bg-orange/5'
      break
  }

  switch (size) {
    case 'small':
      newClassName += ' p-1 text-xs'
      break
    case 'middle':
      newClassName += ' p-2 text-sm'
      break
    case 'large':
      newClassName += ' p-3 text-base'
      break
  }

  newClassName += block ? ' w-full' : ''

  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {loading && <LoadingIndicator />}
      {icon}
      <span>{children}</span>
    </button>
  )
}
