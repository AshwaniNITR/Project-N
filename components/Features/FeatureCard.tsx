'use client'
import { FeatureCardProps } from '@/types/features'
import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'

function FeatureCard({ feature, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const triggerOn = () => !isMobile && setIsHovered(true)
  const triggerOff = () => !isMobile && setIsHovered(false)
  const toggleMobile = () => isMobile && setIsHovered(prev => !prev)

  return (
    <div
      className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={triggerOn}
      onMouseLeave={triggerOff}
      onClick={toggleMobile}
    >
      {/* Background overlay */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={
          isHovered
            ? index < 3
              ? { y: '-100%' }
              : { opacity: 0.1 }
            : index < 3
              ? { y: 0 }
              : { opacity: 1 }
        }
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[#212121] z-10 rounded-xl"
      />

      {/* Background image */}
      <motion.img
        src={feature.bgImage}
        alt={feature.title}
        initial={{ opacity: 0.2, scale: 1 }}
        animate={
          isHovered
            ? { opacity: 0.4, scale: 1.1 }
            : { opacity: 0.2, scale: 1 }
        }
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 w-full h-full object-cover rounded-xl z-0 origin-bottom-left"
      />

      {/* Title */}
      <motion.h3
        initial={{
          x: '-50%',
          y: '-50%',
          top: '50%',
          left: '50%',
          position: 'absolute',
        }}
        animate={
          isHovered
            ? isMobile
              ? {
                x: 0,
                y: 0,
                top: '1.3rem',
                left: '1rem',
                position: 'absolute',
              }
              : {
                x: 0,
                y: 0,
                top: 'auto',
                bottom: '5rem',
                left: '1rem',
                position: 'absolute',
              }
            : {
              x: '-50%',
              y: '-50%',
              top: '50%',
              left: '50%',
              position: 'absolute',
            }
        }
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="text-white text-base md:text-3xl font-semibold z-20 whitespace-nowrap "
      >
        {feature.title}
      </motion.h3>


      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isHovered
          ? {
              opacity: 1,
              x: isMobile ? -5 : 0,
              y: -10,
            }
          : {
              opacity: 0,
              x: 0,
              y: 20,
            }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        className="absolute bottom-4 lg:bottom-8 right-4 font-semibold text-sm md:text-[22px] text-gray-300 max-w-[90%] md:max-w-lg text-start z-20 "
      >
        {feature.description}
      </motion.p>
    </div>
  )
}

export default FeatureCard
