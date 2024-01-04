import { motion, AnimatePresence } from 'framer-motion'

interface AnimationWrapperProps {
  children: React.ReactNode
  keyvalue: string
  initial?: { opacity: number }
  animate?: { opacity: number }
  transition?: { duration: number }
  className?: string
}

const AnimationWrapper = ({
  children,
  keyvalue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}: AnimationWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        key={keyvalue}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default AnimationWrapper
