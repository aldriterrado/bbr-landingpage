import { useEffect, useState, useRef, useCallback } from 'react'
import { Navbar } from './components/Navbar'
import { Section1 } from './components/section/Section1'
import { Section2 } from './components/section/Section2'
import { Section3 } from './components/section/Section3'
import { Section4 } from './components/section/Section4'
import { Section5 } from './components/section/Section5'
import { LoadingScreen } from './components/LoadingScreen'
import { createScrollHandler } from './utils/performance'

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [loading, setLoading] = useState(true)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  
  // Handle loading screen completion
  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])
  
  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    createScrollHandler(() => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      let newActiveSection = 0
      
      sectionsRef.current.forEach((section, index) => {
        if (!section) return
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          newActiveSection = index
        }
      })
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection)
      }
    }, 16), // ~60fps throttling
    [activeSection]
  )
  
  // Handle scrolling to update active section
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
  
  // Handle dot navigation to scroll to section
  const scrollToSection = useCallback((index: number) => {
    setActiveSection(index)
    const section = sectionsRef.current[index]
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [])
  
  return (
    <div className="flex w-full flex-col bg-black text-white">
      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <>
          <Navbar
            activeSection={activeSection}
            setActiveSection={scrollToSection}
          />
          <main className="relative">
            {[
              <Section1 key="section1" />,
              <Section2 key="section2" />,
              <Section3 key="section3" />,
              <Section4 key="section4" />,
              <Section5 key="section5" />,
            ].map((section, index) => (
              <div
                key={index}
                className="min-h-screen w-full"
                ref={(el) => {
                  if (el) {
                    sectionsRef.current[index] = el;
                  }
                }}
              >
                {section}
              </div>
            ))}
          </main>
        </>
      )}
    </div>
  )
}

export default App
