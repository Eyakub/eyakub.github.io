import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function SlideUpWhenVisible({ children, threshold }) {
  const [mounted, setMounted] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: threshold ? threshold : 0.35 })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && inView) {
      controls.start('visible')
    }
  }, [controls, inView, mounted])

  if (!mounted) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.4 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  )
}
