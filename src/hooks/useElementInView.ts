import { useEffect, useRef, useState } from 'react'

export default function useElementInView<T extends Element>(options: IntersectionObserverInit = { threshold: 1 }) {
  const ref = useRef<T>(null)
  const [isVisible, setVisible] = useState(false)
  const callbackFunc = (entries: any) => {
    const [entry] = entries
    setVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunc, options)
    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref, options])

  return {
    isVisible,
    ref
  }
}
