import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import logo from '../assets/BBR.jpg'

interface LoadingScreenProps {
  onComplete: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [textVisible, setTextVisible] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const particlesRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)
  
  // Memoized particle data to prevent recreation
  const particles = useMemo(() => Array.from({ length: 30 }), [])
  const floatingParticles = useMemo(() => Array.from({ length: 20 }), [])
  
  // Handle animations and progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoVisible(true)
    }, 300)
    
    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 800)
    
    // Simulate loading progress (still needed for timing)
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)
    
    // Animate particles
    if (particlesRef.current) {
      const particles = particlesRef.current.children
      Array.from(particles).forEach((particle, i) => {
        const element = particle as HTMLElement
        element.style.animationDelay = `${i * 0.1}s`
        element.style.opacity = '0'
        setTimeout(() => {
          element.style.opacity = '1'
        }, i * 100)
      })
    }
    
    // Animate shapes
    if (shapesRef.current) {
      const shapes = shapesRef.current.children
      Array.from(shapes).forEach((shape, i) => {
        const element = shape as HTMLElement
        element.style.animationDelay = `${i * 0.2}s`
      })
    }
    
    return () => {
      clearTimeout(timer)
      clearTimeout(textTimer)
      clearInterval(interval)
    }
  }, [])
  
  // Trigger completion when progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      // Add a small delay before completing
      const timer = setTimeout(() => {
        // Fade out animation before calling onComplete
        const fadeOutTimer = setTimeout(() => {
          onComplete()
        }, 1000)
        return () => clearTimeout(fadeOutTimer)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])
  
  // Memoized style objects to prevent recreation
  const containerStyle = useMemo(() => ({
    opacity: progress === 100 ? 0 : 1,
  }), [progress])
  
  const backgroundStyle = useMemo(() => ({
    transform: `translate(${Math.random() * -20}px, ${Math.random() * -20}px) scale(1.1)`,
  }), [])
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000"
      style={containerStyle}
    >
      {/* Light beam effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-50 to-white opacity-70 blur-3xl"></div>
        <div className="absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#003D7D]/10 to-[#0055b0]/5 opacity-50 blur-2xl"></div>
        <div className="absolute left-2/3 top-1/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#0055b0]/10 to-blue-100/20 opacity-60 blur-xl"></div>
      </div>
      
      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
        {particles.map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#003D7D]/20 transition-opacity duration-1000"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 2 + 0.5})`,
              animation: `float-particle ${Math.random() * 10 + 5}s linear infinite`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo animation */}
        
        {/* Welcome text with reveal animation */}
        <div className="mb-12 overflow-hidden">
          <img src={logo} alt="BBR" className="h-30 w-30" />
        </div>
        {/* Shape transition animation (replacing progress bar) */}
        <div className="relative h-16 w-64 overflow-visible">
          <div
            ref={shapesRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Animated shapes */}
            <div className="absolute h-4 w-4 animate-shape-morph-1 rounded-full border-2 border-[#003D7D]/40"></div>
            <div className="absolute h-8 w-8 animate-shape-morph-2 rounded-full border-2 border-[#003D7D]/30"></div>
            <div className="absolute h-12 w-12 animate-shape-morph-3 rounded-full border-2 border-[#003D7D]/20"></div>
            <div className="absolute h-16 w-16 animate-shape-morph-4 rounded-full border-2 border-[#003D7D]/10"></div>
            {/* Diamond shapes */}
            <div
              className="absolute h-6 w-6 animate-shape-rotate-1 bg-[#003D7D]/5"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            ></div>
            <div
              className="absolute h-10 w-10 animate-shape-rotate-2 bg-[#0055b0]/5"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            ></div>
            {/* Horizontal line that grows */}
            <div className="absolute h-[2px] w-full animate-line-expand bg-gradient-to-r from-[#003D7D]/0 via-[#003D7D]/30 to-[#003D7D]/0"></div>
            {/* Circles that pulse */}
            <div className="absolute h-3 w-3 animate-pulse-1 rounded-full bg-[#003D7D]/20"></div>
            <div
              className="absolute h-3 w-3 animate-pulse-2 rounded-full bg-[#0055b0]/20"
              style={{
                left: '25%',
              }}
            ></div>
            <div
              className="absolute h-3 w-3 animate-pulse-3 rounded-full bg-[#003D7D]/20"
              style={{
                left: '50%',
              }}
            ></div>
            <div
              className="absolute h-3 w-3 animate-pulse-4 rounded-full bg-[#0055b0]/20"
              style={{
                left: '75%',
              }}
            ></div>
            <div
              className="absolute h-3 w-3 animate-pulse-5 rounded-full bg-[#003D7D]/20"
              style={{
                left: '100%',
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* Animation keyframes */}
      <style>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.5);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-10px) translateX(-15px) scale(1);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-25px) translateX(5px) scale(2);
            opacity: 0.4;
          }
        }
        @keyframes shape-morph-1 {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            border-radius: 50%;
          }
          25% {
            transform: scale(1.5) rotate(90deg);
            border-radius: 40%;
          }
          50% {
            transform: scale(1) rotate(180deg);
            border-radius: 30%;
          }
          75% {
            transform: scale(1.5) rotate(270deg);
            border-radius: 40%;
          }
        }
        @keyframes shape-morph-2 {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            border-radius: 50%;
          }
          25% {
            transform: scale(1.2) rotate(-90deg);
            border-radius: 40%;
          }
          50% {
            transform: scale(1) rotate(-180deg);
            border-radius: 30%;
          }
          75% {
            transform: scale(1.2) rotate(-270deg);
            border-radius: 40%;
          }
        }
        @keyframes shape-morph-3 {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            border-radius: 50%;
          }
          25% {
            transform: scale(0.8) rotate(90deg);
            border-radius: 40%;
          }
          50% {
            transform: scale(1) rotate(180deg);
            border-radius: 30%;
          }
          75% {
            transform: scale(0.8) rotate(270deg);
            border-radius: 40%;
          }
        }
        @keyframes shape-morph-4 {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            border-radius: 50%;
          }
          25% {
            transform: scale(0.9) rotate(-90deg);
            border-radius: 40%;
          }
          50% {
            transform: scale(1) rotate(-180deg);
            border-radius: 30%;
          }
          75% {
            transform: scale(0.9) rotate(-270deg);
            border-radius: 40%;
          }
        }
        @keyframes shape-rotate-1 {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: rotate(180deg) scale(1.5);
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 0.3;
          }
        }
        @keyframes shape-rotate-2 {
          0% {
            transform: rotate(0deg) scale(1.2);
            opacity: 0.2;
          }
          50% {
            transform: rotate(-180deg) scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: rotate(-360deg) scale(1.2);
            opacity: 0.2;
          }
        }
        @keyframes line-expand {
          0%,
          100% {
            transform: scaleX(0.3);
            opacity: 0.3;
          }
          50% {
            transform: scaleX(1);
            opacity: 0.7;
          }
        }
        @keyframes pulse-1 {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
        }
        @keyframes pulse-2 {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
        }
        @keyframes pulse-3 {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
        }
        @keyframes pulse-4 {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
        }
        @keyframes pulse-5 {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.2;
          }
        }
        .animate-shape-morph-1 {
          animation: shape-morph-1 3s ease-in-out infinite;
        }
        .animate-shape-morph-2 {
          animation: shape-morph-2 3s ease-in-out infinite;
        }
        .animate-shape-morph-3 {
          animation: shape-morph-3 3s ease-in-out infinite;
        }
        .animate-shape-morph-4 {
          animation: shape-morph-4 3s ease-in-out infinite;
        }
        .animate-shape-rotate-1 {
          animation: shape-rotate-1 4s ease-in-out infinite;
        }
        .animate-shape-rotate-2 {
          animation: shape-rotate-2 4s ease-in-out infinite;
        }
        .animate-line-expand {
          animation: line-expand 2s ease-in-out infinite;
        }
        .animate-pulse-1 {
          animation: pulse-1 2s ease-in-out infinite;
        }
        .animate-pulse-2 {
          animation: pulse-2 2s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        .animate-pulse-3 {
          animation: pulse-3 2s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        .animate-pulse-4 {
          animation: pulse-4 2s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        .animate-pulse-5 {
          animation: pulse-5 2s ease-in-out infinite;
          animation-delay: 1.6s;
        }
      `}</style>
    </div>
  )
}
