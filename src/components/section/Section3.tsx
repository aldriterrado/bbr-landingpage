import React, { useEffect, useState, useRef } from 'react'
import greentech from '../../assets/greentech.jpg'

export const Section3: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<number>(0)
  const [isInView, setIsInView] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const segmentsRef = useRef<HTMLDivElement>(null)

  // Business segments data with enhanced content
  const businessSegments = [
    {
      title: 'General Construction',
      subtitle: 'Building Excellence',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 2H7C4 2 3 3.79 3 6V22H21V6C21 3.79 20 2 17 2Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16.5H10" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 16.5H17" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 12H10" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 12H17" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7.5H10" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 7.5H17" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Our General Construction segment specializes in building residential, commercial, and industrial properties with precision and quality. We handle everything from new constructions to renovations and retrofits.',
      features: ['Residential & Commercial', 'Renovations & Retrofits', 'Quality Assurance', 'Timely Delivery'],
      color: '#60A5FA',
      gradient: 'from-[#60A5FA] to-[#3B82F6]'
    },
    {
      title: 'Specialized Engineering',
      subtitle: 'Innovation at Core',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      image: 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Our Specialized Engineering division provides cutting-edge solutions for complex structural challenges. We excel in post-tensioning, prefabrication, and specialized civil engineering works.',
      features: ['Post-tensioning Systems', 'Prefabrication Solutions', 'Structural Analysis', 'Advanced Materials'],
      color: '#3B82F6',
      gradient: 'from-[#3B82F6] to-[#2563EB]'
    },
    {
      title: 'Property Development',
      subtitle: 'Creating Tomorrow',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 9.96997L12 4.96997L21 9.96997" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 12.9699V19.9699" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 12.9699V19.9699" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 19.9699V15.9699C9 14.8699 9.9 13.9699 11 13.9699H13C14.1 13.9699 15 14.8699 15 15.9699V19.9699" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'The Property Development arm focuses on creating innovative residential and commercial spaces that combine functionality, aesthetics, and sustainability to meet the evolving needs of modern living.',
      features: ['Residential Projects', 'Commercial Spaces', 'Sustainable Design', 'Smart Technology'],
      color: '#2563EB',
      gradient: 'from-[#2563EB] to-[#1D4ED8]'
    },
    {
      title: 'Green Technology',
      subtitle: 'Sustainable Future',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.25 22.5C17.8068 22.5 19.25 21.0568 19.25 19.5C19.25 17.9432 17.8068 16.5 16.25 16.5C14.6932 16.5 13.25 17.9432 13.25 19.5C13.25 21.0568 14.6932 22.5 16.25 22.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.25 10.5C9.80685 10.5 11.25 9.05685 11.25 7.5C11.25 5.94315 9.80685 4.5 8.25 4.5C6.69315 4.5 5.25 5.94315 5.25 7.5C5.25 9.05685 6.69315 10.5 8.25 10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.25 7.5C20.8068 7.5 22.25 6.05685 22.25 4.5C22.25 2.94315 20.8068 1.5 19.25 1.5C17.6932 1.5 16.25 2.94315 16.25 4.5C16.25 6.05685 17.6932 7.5 19.25 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.25 4.5H16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.25 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.25 16.5H13.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.25 19.5H13.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      image: greentech,
      description: 'Our Green Technology initiatives focus on sustainable building practices, renewable energy solutions, and eco-friendly materials to minimize environmental impact while maximizing efficiency.',
      features: ['Renewable Energy', 'Eco-friendly Materials', 'Carbon Reduction', 'Green Certifications'],
      color: '#1D4ED8',
      gradient: 'from-[#1D4ED8] to-[#1E40AF]'
    },
  ]

  // Set active segment
  const handleSegmentChange = (index: number) => {
    setActiveSegment(index)
  }

  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
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

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden text-white"
    >
      {/* Dark blue background with building image overlay */}
      <div className="absolute inset-0 z-0">
        {/* Building background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100"
            alt="Modern architecture cityscape"
            className="h-full w-full object-cover object-center"
          />
        </div>
        
        {/* Dark blue overlay layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#1E293B]/85 to-[#0F172A]/95" />
        <div className="absolute inset-0 bg-[#0F172A]/70" />
        
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(37, 99, 235, 0.08) 0%, transparent 50%)
              `
            }}
          />
        </div>
        
        {/* Modern grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(59,130,246,0.1) 1px, transparent 1px),
                linear-gradient(135deg, rgba(59,130,246,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        
        {/* Geometric accent lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#60A5FA]/30 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#3B82F6]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#60A5FA]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-transparent via-[#3B82F6]/30 to-transparent" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Enhanced section header */}
        <div className="mb-20 text-center">
          <div
            className={`inline-flex items-center space-x-3 mb-6 bg-gradient-to-r from-[#60A5FA]/20 to-[#3B82F6]/20 px-6 py-3 border border-[#60A5FA]/30 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-2 h-2 bg-[#60A5FA] animate-pulse-slow" />
            <span className="text-sm font-semibold uppercase tracking-wider text-[#60A5FA]">
              Our Expertise
            </span>
            <div className="w-2 h-2 bg-[#3B82F6] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          </div>
          
          <h2
            className={`text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 transition-all duration-1000 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="relative inline-block">
              <span className="relative z-10">Business</span>
              <div
                className={`absolute -bottom-3 left-0 h-4 w-full bg-gradient-to-r from-[#60A5FA]/30 to-[#3B82F6]/30 transition-all duration-1000 delay-500 ${
                  isInView ? 'w-full' : 'w-0'
                }`}
              />
            </span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#2563EB]">
              Segments
            </span>
          </h2>
          
          <p
            className={`text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Comprehensive solutions across multiple sectors, delivering specialized expertise 
            and innovative engineering solutions that shape the future of construction.
          </p>
        </div>

        {/* Ultra-modern business segments display */}
        <div
          ref={segmentsRef}
          className={`relative transition-all duration-1000 ease-out ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Modern tab navigation with enhanced design */}
          <div className="relative mb-16">
            {/* Active indicator line */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-700" />
            <div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] transition-all duration-500 ease-out"
              style={{
                width: `${100 / businessSegments.length}%`,
                transform: `translateX(${activeSegment * 100}%)`,
              }}
            />
            
            {/* Tab items with enhanced hover effects */}
            <div className="flex flex-nowrap overflow-x-auto hide-scrollbar">
              {businessSegments.map((segment, index) => (
                <div
                  key={index}
                  className={`relative flex-1 cursor-pointer transition-all duration-300 ease-out pb-8 flex flex-col items-center min-w-[140px] group ${
                    activeSegment === index ? 'text-[#60A5FA]' : 'text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => handleSegmentChange(index)}
                >
                  {/* Enhanced icon container */}
                  <div
                    className={`mb-4 w-16 h-16 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                      activeSegment === index
                        ? `bg-gradient-to-br ${segment.gradient} text-white shadow-[0_8px_32px_rgba(96,165,250,0.4)]`
                        : 'bg-slate-800/80 text-slate-400 group-hover:bg-slate-700 group-hover:text-[#60A5FA] shadow-lg group-hover:shadow-xl border border-slate-700/50'
                    }`}
                  >
                    {segment.icon}
                    
                    {/* Active state animations */}
                    {activeSegment === index && (
                      <>
                        <div className="absolute inset-0 border-2 border-white/30 animate-ping-slow opacity-50" />
                        <div className="absolute inset-0 border border-white/50 animate-pulse-ring opacity-30" />
                      </>
                    )}
                  </div>
                  
                  {/* Enhanced title */}
                  <h3
                    className={`text-sm font-semibold text-center transition-colors duration-300 px-3 leading-tight ${
                      activeSegment === index ? 'text-[#60A5FA]' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {segment.title}
                  </h3>
                  
                  {/* Active indicator */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 transition-all duration-300 ${
                      activeSegment === index ? 'bg-[#60A5FA] scale-150' : 'bg-transparent scale-0'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced content display area */}
          <div className="relative overflow-hidden border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
            {/* Content panels with smooth transitions */}
            <div className="relative min-h-[600px]">
              {businessSegments.map((segment, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    activeSegment === index
                      ? 'opacity-100 translate-y-0 relative z-10'
                      : 'opacity-0 translate-y-8 absolute inset-0 -z-10'
                  }`}
                >
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
                    {/* Enhanced left side - Image with modern effects */}
                    <div className="relative h-[400px] xl:h-[600px] overflow-hidden">
                      <div className="absolute inset-0">
                        <img
                          src={segment.image}
                          alt={segment.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwRjE3MkEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+SW1hZ2UgTG9hZCBFcnJvcjwvdGV4dD48L3N2Zz4='
                          }}
                        />
                        
                        {/* Enhanced overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                        
                        {/* Modern mesh grid */}
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `
                              linear-gradient(to right, rgba(59,130,246,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(59,130,246,0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '30px 30px',
                          }}
                        />
                      </div>
                      
                      {/* Enhanced floating elements */}
                      <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-[#60A5FA]/40 opacity-60" />
                      <div
                        className="absolute bottom-6 right-6 w-16 h-16"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          background: 'linear-gradient(45deg, rgba(96,165,250,0.1), rgba(59,130,246,0.05))',
                          border: '1px solid rgba(96,165,250,0.2)',
                        }}
                      />
                      
                      {/* Segment badge */}
                      <div className="absolute top-6 right-6 bg-slate-900/95 backdrop-blur-md px-4 py-2 shadow-lg border border-slate-700/50">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 bg-gradient-to-r ${segment.gradient}`} />
                          <span className="text-sm font-semibold text-white">{segment.subtitle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced right side - Content with modern layout */}
                    <div className="bg-slate-900/80 backdrop-blur-md p-8 xl:p-12 flex flex-col justify-center border-l border-slate-700/50">
                      {/* Enhanced segment header */}
                      <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${segment.gradient} flex items-center justify-center text-white shadow-lg`}>
                            {segment.icon}
                          </div>
                          <div>
                            <h3 className="text-3xl xl:text-4xl font-bold text-white">
                              {segment.title}
                            </h3>
                            <p className="text-lg text-blue-200 font-medium">{segment.subtitle}</p>
                          </div>
                        </div>
                        
                        {/* Animated underline */}
                        <div className="h-1 w-24 bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] animate-width-expand" />
                      </div>

                      {/* Enhanced description */}
                      <div className="mb-8">
                        <p className="text-slate-300 leading-relaxed text-lg animate-fade-in">
                          {segment.description}
                        </p>
                      </div>

                      {/* Enhanced feature list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {segment.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center animate-slide-up"
                            style={{ animationDelay: `${0.1 + featureIndex * 0.1}s` }}
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${segment.gradient} mr-3`} />
                            <span className="text-slate-300 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Enhanced CTA Button */}
                      <button className="group relative overflow-hidden bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] text-white px-10 py-4 text-lg font-semibold transition-all duration-500 mt-auto self-start shadow-lg hover:shadow-xl hover:-translate-y-1">
                        <span className="relative z-10 flex items-center">
                          <span>Explore {segment.title}</span>
                          <svg
                            className="ml-3 w-5 h-5 transition-all duration-500 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                        
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>

                      {/* Enhanced decorative elements */}
                      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden opacity-20">
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#60A5FA]/30" />
                      </div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 overflow-hidden opacity-20">
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#3B82F6]/30" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced bottom navigation */}
          <div className="flex justify-center mt-12 space-x-3">
            {businessSegments.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSegmentChange(index)}
                className={`w-3 h-3 transition-all duration-300 hover:scale-125 ${
                  activeSegment === index 
                    ? 'bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] w-8' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to segment ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.8); opacity: 0.5; }
          80%, 100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
          100% { transform: scale(0.8); opacity: 0.3; }
        }
        @keyframes width-expand {
          0% { width: 0; }
          100% { width: 96px; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-ring { animation: pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-width-expand { animation: width-expand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
