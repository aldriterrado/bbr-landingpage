import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { createScrollHandler } from '../utils/performance'
import logo from '../assets/BBR.png'

interface NavbarProps {
  activeSection: number
  setActiveSection: (section: number) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // Add scroll effect to navbar with throttling
  const handleScroll = useCallback(
    createScrollHandler(() => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }, 16), // ~60fps throttling
    []
  )
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
  
  // Handle dropdown menu
  const toggleDropdown = useCallback((menu: string) => {
    setActiveDropdown(prev => prev === menu ? null : menu)
  }, [])
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])
  
  // Memoized submenu structures to prevent recreation
  const aboutUsSubmenu = useMemo(() => [
    {
      category: 'Company Overview',
      items: [
        {
          name: 'Who we are',
          link: '#',
        },
        {
          name: 'Group Structure',
          link: '#',
        },
        {
          name: 'Board Directors',
          link: '#',
        },
        {
          name: 'Management',
          link: '#',
        },
      ],
    },
    {
      category: 'Our Achievement',
      items: [
        {
          name: 'Milestone',
          link: '#',
        },
        {
          name: 'Awards & Recognition',
          link: '#',
        },
      ],
    },
    {
      category: 'Social Responsibility',
      items: [
        {
          name: 'CSR (BBR CARE)',
          link: '#',
        },
      ],
    },
  ], [])
  
  // Our Business submenu structure
  const ourBusinessSubmenu = useMemo(() => [
    {
      category: 'General Construction',
      items: [
        {
          name: 'Singapore Engineering & Construction Pte Ltd',
          link: '#',
        },
        {
          name: 'Singa Development Pte Ltd',
          link: '#',
        },
      ],
    },
    {
      category: 'Specialized Engineering',
      items: [
        {
          name: 'BBR Construction System Pte Ltd',
          link: '#',
        },
        {
          name: 'BBR Piling Pte Ltd',
          link: '#',
        },
        {
          name: 'Moderna Homes Pte Ltd',
          link: '#',
        },
      ],
    },
    {
      category: 'Property Development',
      items: [
        {
          name: 'BBR Development Pte Ltd',
          link: '#',
        },
      ],
    },
    {
      category: 'Green Technology',
      items: [
        {
          name: 'BBR Greentech Pte Ltd',
          link: '#',
        },
      ],
    },
  ], [])
  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 shadow-md backdrop-blur-lg' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex h-20  items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative">
              <img src={logo} alt="BBR" className="h-10 w-10" />
          </div>
        </div>
        {/* Navigation Links */}
        <div className="hidden space-x-8 md:flex items-center">
          {/* About Us with dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleDropdown('aboutUs')}
              className="text-sm font-light transition-colors text-white hover:text-blue-200"
            >
              <span className="relative group">
                About Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 inline-block h-4 w-4 transition-transform duration-300 ${activeDropdown === 'aboutUs' ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
            {/* About Us Dropdown */}
            {activeDropdown === 'aboutUs' && (
              <div className="absolute left-1/2 top-[43px] z-50 mt-2 w-[600px] -translate-x-1/2 transform bg-black/70 backdrop-blur-md p-6 shadow-lg transition-all duration-300">
                <div className="grid grid-cols-3 gap-8">
                  {aboutUsSubmenu.map((category, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3 className="border-b border-white/20 pb-2 text-sm font-semibold text-blue-400">
                        {category.category}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <a
                              href={item.link}
                              className="group flex items-center text-sm transition-colors text-gray-300 hover:text-white"
                            >
                              <span className="relative overflow-hidden">
                                {item.name}
                                <span className="absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full bg-white"></span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Our Business with dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleDropdown('ourBusiness')}
              className="text-sm font-light transition-colors text-white hover:text-blue-200"
            >
              <span className="relative group">
                Our Business
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`ml-1 inline-block h-4 w-4 transition-transform duration-300 ${activeDropdown === 'ourBusiness' ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
            {/* Our Business Dropdown */}
            {activeDropdown === 'ourBusiness' && (
              <div className="absolute left-1/2 top-[43px] z-50 mt-2 w-[600px] -translate-x-1/2 transform  bg-black/70 backdrop-blur-md p-6 shadow-lg transition-all duration-300">
                <div className="grid grid-cols-2 gap-8">
                  {ourBusinessSubmenu.map((category, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3 className="border-b border-white/20 pb-2 text-sm font-semibold text-blue-400">
                        {category.category}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <a
                              href={item.link}
                              className="group flex items-center text-sm transition-colors text-gray-300 hover:text-white"
                            >
                              <span className="relative overflow-hidden">
                                {item.name}
                                <span className="absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full bg-white"></span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Other navigation items */}
          {['Investor Relations', 'News Room', 'Portfolio'].map(
            (item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(0)} // Direct to section 1
                className="text-sm font-light transition-colors text-white hover:text-blue-200"
              >
                <span className="relative group">
                  {item}
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            ),
          )}
          {/* Contact Us button - styled like "Our Vision" button */}
          <button className="group relative overflow-hidden rounded-none border border-white text-white bg-transparent px-4 py-1.5 text-xs font-light uppercase tracking-widest transition-all duration-500 hover:border-transparent cursor-pointer">
            <span className="relative z-10 transition-all duration-500 group-hover:text-white">
              Contact Us
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#003D7D] to-[#0055b0] transition-transform duration-500 group-hover:translate-x-0"></div>
            <div className="absolute -left-3 top-0 h-full w-12 bg-white/10 skew-x-[45deg] transition-all duration-1000 group-hover:translate-x-[400%]"></div>
          </button>
          
          {/* Search Button */}
          <button className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-white/30 text-white bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-110 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 transition-all duration-300 group-hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#60A5FA]/20 to-[#3B82F6]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button className="rounded-full p-2 bg-white/10 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
