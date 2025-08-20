import React, { useEffect, useState, useRef } from 'react'

export const Section4: React.FC = () => {
  const [isInView, setIsInView] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  // Sample news data
  const mainNews = {
    id: 1,
    title: 'Financial Statements And Related Announcement - Half Yearly Results',
    description:
      "Description (Please provide a detailed description of the event in the box below - Refer to the Online help for the format).",
    date: 'August 13, 2025',
    category: 'Contract Award',
    color: '#003D7D',
  }

  // Additional news items
  const newsItems = [
    {
      id: 2,
      title: 'Announcement Pursuant To Rule 706A Of The SGX-ST Listing Manual',
      description:
        `Singapore Engineering & Construction Pte Ltd. (“SEC”), a wholly owned subsidiary of the Group,
        incorporated a 51% owned subsidiary in Singapore, SECHK Pte Ltd (“SECHK”) on 17 June 2025.
        SECHK was incorporated with an issued and paid-up capital of S$100,000 comprising 100,000 shares
        of S$1 each and SEC holds 51,000 shares in SECHK. The principal activity of SECHK is general
        contractors including building construction and upgrading works.`,
      date: 'August 3, 2023',
      category: 'August 13, 2025',
      color: '#0055b0',
    },
    {
      id: 3,
      title: 'BBR Holdings Secures S$220 Million In New Contracts',
      description:
        `Singapore, 16 June 2025 – BBR Holdings (S) Ltd (“BBR” or the “Group”), a leading
construction and specialised engineering group listed on the mainboard of Singapore
Exchange (SGX:KJ5), has recently secured a series of new contracts worth approximately
S$220 million`,
      date: 'June 16, 2025',
      category: 'Project Completion',
      color: '#0066cc',
    },
    {
      id: 4,
      title: 'New Partnership with Singapore Green Building Council',
      description:
        'BBR Holdings announces strategic partnership with Singapore Green Building Council to advance sustainable construction practices.',
      date: 'October 12, 2023',
      category: 'Partnership',
      color: '#0077e6',
    },
    {
      id: 5,
      title: 'BBR Holdings Wins Excellence in Construction Award',
      description:
        'The company has been recognized for its outstanding contribution to the construction industry with the prestigious Excellence in Construction Award.',
      date: 'November 5, 2023',
      category: 'Award',
      color: '#0088ff',
    },
  ]

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
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#f0f5fa] text-gray-800"
    >
      {/* Simplified background with minimal effects */}
      <div className="absolute inset-0 z-0">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#f8fafc] via-[#f4f8fc] to-[#f0f5fa] opacity-70"></div>
        
        {/* Subtle geometric accent - static only */}
        <div className="absolute top-0 left-0 w-[15vw] h-[15vw] opacity-5"
          style={{
            background: 'linear-gradient(135deg, rgba(0,61,125,0.1) 0%, transparent 70%)',
          }}
        ></div>
        <div className="absolute bottom-0 right-0 w-[15vw] h-[15vw] opacity-5"
          style={{
            background: 'linear-gradient(315deg, rgba(0,85,176,0.1) 0%, transparent 70%)',
          }}
        ></div>
        
        {/* Simple grid pattern - static */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,61,125,0.05) 1px, transparent 1px), 
                linear-gradient(to bottom, rgba(0,61,125,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          ></div>
        </div>
        </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Section header with simplified animations */}
        <div className="mb-16 relative">
          <div className="absolute -top-10 -left-6 w-20 h-20 border-l-2 border-t-2 border-[#003D7D]/20 opacity-60"></div>
          <div className="flex flex-col items-start">
            <div
              className={`inline-flex items-center space-x-2 mb-3 bg-gradient-to-r from-[#003D7D]/10 to-transparent px-4 py-1.5 transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="w-2 h-2 bg-[#003D7D] animate-pulse-slow"></div>
              <span className="text-xs font-medium uppercase tracking-wider text-[#003D7D]">
                Stay Updated
              </span>
            </div>
            <h2
              className={`text-5xl md:text-7xl font-bold text-gray-900 tracking-tight transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="relative inline-block">
                <span className="relative z-10">News &</span>
                <div className="absolute -bottom-2 left-0 h-3 w-full bg-[#003D7D]/10"></div>
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#003D7D] to-[#0055b0]">
                Announcements
              </span>
            </h2>
            <p
              className={`mt-4 text-lg text-gray-600 max-w-xl transition-all duration-1000 delay-200 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Stay informed with the latest updates, achievements, and
              announcements from BBR Holdings.
            </p>
            <div
              className={`mt-6 h-px w-32 bg-gradient-to-r from-[#003D7D] to-transparent transition-all duration-1000 delay-300 ${
                isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transformOrigin: 'left' }}
            ></div>
          </div>
        </div>

        {/* Featured news with simplified effects */}
        <div className="mt-10">
          {/* Main featured news */}
          <div
            className={`relative mb-16 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            {/* Featured news item */}
            <div className="relative bg-white border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="p-8 md:p-12">
                {/* Category badge */}
                <div
                  className="inline-block px-3 py-1 text-xs font-medium text-white mb-6"
                  style={{ backgroundColor: mainNews.color }}
                >
                  {mainNews.category}
                </div>
                
                {/* Title */}
                <div className="mb-8">
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {mainNews.title}
                  </h3>
                </div>
                
                {/* Description */}
                <div className="mb-10">
                  <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                    {mainNews.description}
                  </p>
                </div>
                
                {/* Bottom row with date and CTA */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-6 md:mb-0">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ backgroundColor: `${mainNews.color}15` }}
                      >
                        <svg
                          className="w-4 h-4 text-[#003D7D]"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.29431 13.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-gray-500">{mainNews.date}</span>
                    </div>
                  </div>
                  
                  {/* Read more button */}
                  <button className="group relative overflow-hidden bg-transparent border border-[#003D7D]/20 text-[#003D7D] px-8 py-3 text-sm font-medium transition-all duration-300 hover:bg-[#003D7D] hover:text-white">
                    <span className="relative z-10 flex items-center">
                      <span>Read Full Story</span>
                      <svg
                        className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Simple decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div className="w-full h-full border-r-2 border-t-2 border-[#003D7D]/20"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
                <div className="w-full h-full border-l-2 border-b-2 border-[#003D7D]/20"></div>
              </div>
            </div>
          </div>

          {/* Additional news section */}
          <div className="relative">
            <h3
              className={`text-xl font-medium text-gray-800 mb-8 transition-all duration-1000 delay-400 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              More News & Updates
            </h3>
            
            {/* News cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {newsItems.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) {
                      cardsRef.current[index] = el;
                    }
                  }}
                  className={`relative transition-all duration-1000 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative h-full bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Category indicator */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    
                    <div className="p-6">
                      {/* Category badge */}
                      <div
                        className="inline-block px-2 py-0.5 text-xs font-medium mb-4"
                        style={{
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        {item.category}
                      </div>
                      
                      {/* Title */}
                      <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-[#003D7D] transition-colors duration-300">
                        {item.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* Date and read more */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{item.date}</span>
                        <a
                          href="#"
                          className="text-xs font-medium text-[#003D7D] hover:text-[#0055b0] transition-colors duration-300 flex items-center"
                        >
                          Read more
                          <svg
                            className="w-3 h-3 ml-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    {/* Simple hover effect */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[${item.color}] to-transparent transition-opacity duration-300 ${
                        hoveredCard === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View all news button */}
          <div
            className={`mt-16 flex justify-center transition-all duration-1000 delay-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button className="group relative overflow-hidden bg-transparent border border-[#003D7D] px-10 py-4 transition-all duration-300 hover:bg-[#003D7D] hover:text-white">
              <span className="relative z-10 flex items-center text-[#003D7D] group-hover:text-white transition-colors duration-300">
                <span className="mr-2 text-sm font-medium uppercase tracking-wider">
                  View All News
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Simplified CSS animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
