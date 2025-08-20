import { useEffect, useRef, useState } from 'react'
import hero from '../../assets/hero.jpg'
import hero2 from '../../assets/hero3.jpg'

export const Section1: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Intersection observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  
  // Text reveal animation on load
  useEffect(() => {
    if (textRef.current) {
      textRef.current.classList.add('animate-text-reveal')
    }
  }, [])
  
  return (
    <div
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-end overflow-hidden text-white"
    >
      {/* Static background image - no parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero2}
          alt="Modern Singapore cityscape with skyscrapers"
          className="h-full w-full  object-center"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+SW1hZ2UgTG9hZCBFcnJvcjwvdGV4dD48L3N2Zz4='
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001429]/40 via-[#001f3f]/40 to-[#00264F]/40"></div>
      </div>
      
      {/* Animated gradient overlays with staggered entrance */}
      <div
        className={`absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent opacity-80 transition-all duration-1000 delay-200 ${isInView ? 'opacity-80' : 'opacity-0'}`}
      ></div>
      <div
        className={`absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-40 transition-all duration-1000 delay-400 ${isInView ? 'opacity-40' : 'opacity-0'}`}
      ></div>
      
      {/* Content with enhanced modern text layout */}
      <div className="relative z-20 mx-auto w-full px-6 text-left md:px-10 pb-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          {/* Left column for main heading - New header style matching Section3 */}
          <div className="md:col-span-7">
            {/* Section header with modern typography (matching Section3 style) */}
            <div className={`mb-12 relative transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="absolute -top-10 -left-6 w-20 h-20 border-l-2 border-t-2 border-white/30 opacity-60"></div>
              <div className="flex flex-col items-start">
                <div className={`inline-flex items-center space-x-2 mb-3 bg-gradient-to-r from-white/20 to-transparent px-4 py-1.5 rounded-full transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse-subtle"></div>
                  <span className="text-xs font-medium uppercase tracking-wider text-white">
                    Singapore
                  </span>
                </div>
                <h2 className={`text-5xl md:text-7xl font-bold text-white tracking-tight transition-all duration-1000 delay-600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="relative inline-block">
                    <span className="relative z-10">Building</span>
                    <div className="absolute -bottom-2 left-0 h-3 w-full bg-white/20 animate-line-expand"></div>
                  </span>{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Tomorrow
                  </span>
                </h2>
                <p className={`mt-4 text-lg text-white/60 max-w-xl transition-all duration-1000 delay-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  From a trusted global logistics solutions provider, we have
                  grown and evolved into a dynamic company with a suite of
                  complementary business lines.
                </p>
                <div className={`mt-6 h-px w-32 bg-gradient-to-r from-white to-transparent transition-all duration-1000 delay-1000 ${isInView ? 'w-32' : 'w-0'}`}></div>
              </div>
            </div>
            <div className={`mt-10 flex flex-wrap items-center gap-6 transition-all duration-1000 delay-1200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Modern button with liquid effect */}
              <button className="group relative overflow-hidden rounded-none  px-8 py-3 text-sm font-light uppercase tracking-widest text-white shadow-md transition-all duration-500 hover:scale-105 cursor-pointer">
                <span className="relative z-10 transition-all duration-500 group-hover:text-white">
                  Discover More
                </span>
                <div className="absolute inset-0 -translate-y-full bg-gradient-to-r from-[#0055b0] to-[#003D7D] transition-transform duration-500 group-hover:translate-y-0"></div>
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#0055b0] transition-all duration-500 group-hover:h-full"></div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#003D7D]/50 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:scale-150"></div>
                <div className="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-[#0055b0]/50 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:scale-150"></div>
              </button>
              
            </div>
          </div>
        </div>
      </div>
      {/* Interactive scroll indicator */}
      <div className={`absolute bottom-10 left-0 right-0 z-20 flex justify-center transition-all duration-1000 delay-1600 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-1">
          <span className="mb-2 text-xs font-light uppercase tracking-widest text-white/70 transition-all duration-300 group-hover:text-white">
            Scroll to explore
          </span>
          <div className="relative h-8 w-5 overflow-hidden rounded-full border border-white/30 p-1 transition-all duration-300 group-hover:border-white/70">
            <div className="h-1 w-1 rounded-full bg-white/70 transition-all duration-300 group-hover:bg-white animate-scroll-bounce"></div>
          </div>
        </div>
      </div>
      {/* Enhanced keyframes for smooth animations */}
      <style>{`
        .animate-text-reveal {
          animation: text-reveal 1.5s ease-out forwards;
        }
        @keyframes text-reveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-border-glow {
          animation: border-glow 3s ease-in-out infinite;
        }
        @keyframes border-glow {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 5px rgba(255,255,255,0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(255,255,255,0.6);
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        .animate-line-expand {
          animation: line-expand 1.5s ease-out 1s forwards;
        }
        @keyframes line-expand {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.2;
          }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 8s ease-in-out infinite;
        }
        @keyframes float-slow-reverse {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(10px);
          }
        }
        .animate-scroll-bounce {
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
        }
      `}</style>
    </div>
  )
}
