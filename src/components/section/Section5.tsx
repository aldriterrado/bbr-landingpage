import React, { useEffect, useState, useRef, useCallback } from "react";
import bbrgt from "../../assets/projects/bbrgt/BBRHQ.jpg";

export const Section5: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isInView, setIsInView] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerSectionRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reduced to 5 projects as requested
  const projects = [
    {
      id: 1,
      title: "Rooftop Solar PV System at BBR Building",
      category: "Industrial / Mixed Development",
      year: "2023",
      description: "Project for Rooftop Solar @ BBR HQ.",
      image: bbrgt,
      color: "#0088ff",
    },
    {
      id: 2,
      title: "Woodlands Health Campus",
      category: "Healthcare",
      year: "2022",
      description:
        "A next-generation healthcare facility integrating acute care, community hospital and nursing home, built with sustainable materials and energy-efficient design principles.",
      image:
        "https://images.unsplash.com/photo-1613377512441-6b8714b2ddb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "#00a3cc",
    },
    {
      id: 3,
      title: "Tampines North MRT Station",
      category: "Infrastructure",
      year: "2020",
      description:
        "A key transportation hub on Singapore's Downtown Line featuring specialized engineering solutions for underground construction and innovative passenger flow management.",
      image:
        "https://images.unsplash.com/photo-1569867580697-987613a5e51a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      color: "#00bfa5",
    },
    {
      id: 4,
      title: "The Clement Canopy",
      category: "Residential",
      year: "2019",
      description:
        "Award-winning residential development featuring twin 40-storey towers with sky gardens, constructed using prefabricated prefinished volumetric construction (PPVC) technology.",
      image:
        "https://images.unsplash.com/photo-1561518776-e76a5e48f731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      color: "#3d5afe",
    },
    {
      id: 5,
      title: "Tuas Desalination Plant",
      category: "Green Technology",
      year: "2020",
      description:
        "Singapore's third desalination plant with a capacity of 30 million gallons per day, incorporating green technology and energy recovery systems to minimize environmental impact.",
      image:
        "https://images.unsplash.com/photo-1607166452427-7e968af8c38b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "#651fff",
    },
  ];

  // Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Only set to false if we're significantly out of view
          if (entry.intersectionRatio < 0.05) {
            setIsInView(false);
          }
        }
      },
      {
        threshold: [0, 0.05, 0.1, 0.2],
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Initialize project refs array
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projects.length);

    // Set initial visibility to true to ensure header appears
    setIsInView(true);
  }, [projects.length]);



  // Contained scroll effect - only within this section
  const [scrollY, setScrollY] = useState(0);

  // Handle page scroll for general scroll tracking
  const handlePageScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrollY(scrollY);
  }, []);

    // Add window scroll event listener and intersection observers
  useEffect(() => {
    // Debounced scroll handler for header progress
    let scrollTimeout: number;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        handlePageScroll();
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Single intersection observer for all projects with better alignment
    let currentActiveIndex = -1;

    const observer = new IntersectionObserver(
      (entries) => {
        // Simple viewport center calculation without header dependency
        const windowHeight = window.innerHeight;
        const effectiveViewportCenter = windowHeight / 2;

        let bestEntry: IntersectionObserverEntry | null = null;
        let bestScore = -1;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            // Calculate distance from viewport center for alignment
            const rect = entry.target.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(elementCenter - effectiveViewportCenter);

            // Calculate score based on intersection ratio and distance from center
            const distanceScore = Math.max(0, 1 - (distanceFromCenter / (windowHeight / 2)));
            const score = (entry.intersectionRatio * 0.7) + (distanceScore * 0.3);

            // Find the entry with the best score
            if (score > bestScore) {
              bestScore = score;
              bestEntry = entry;
            }
          }
        });

        // Set active project based on the best score
        if (bestEntry) {
          const index = projectRefs.current.findIndex(ref => ref === bestEntry!.target);

          // Only activate projects if user has scrolled past the header
          // Check if the projects container is actually in view
          const containerRect = projectsContainerRef.current?.getBoundingClientRect();
          const isPastHeader = containerRect && containerRect.top <= window.innerHeight * 0.3;

          if (index !== -1 && (currentActiveIndex === -1 || bestScore > 0.2) && isPastHeader) {
            currentActiveIndex = index;
            setActiveProject(index);
          } else if (!isPastHeader && currentActiveIndex !== -1 && containerRect && containerRect.top > window.innerHeight * 0.4) {
            // Reset to no active project when back in header area
            currentActiveIndex = -1;
            setActiveProject(-1);
          }
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9], // Optimized thresholds for better performance
        rootMargin: '-15% 0px -15% 0px' // Better alignment margin for first project
      }
    );

    // Observe all project elements
    projectRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      observer.disconnect();
    };
  }, [handlePageScroll, projects.length]);

  // Debug: Log state changes
  useEffect(() => {
    console.log('Section5 state:', {
      activeProject,
      scrollY
    });
  }, [activeProject, scrollY]);

  // Smooth scroll to project function using window scroll
  const scrollToProject = useCallback((index: number) => {
    const projectElement = projectRefs.current[index];
    if (!projectElement) return;

    const elementTop = projectElement.offsetTop;
    const windowHeight = window.innerHeight;
    const elementHeight = projectElement.offsetHeight;

    // For the first project, account for header space and margin
    let targetScroll;
    if (index === 0) {
      // Position first project with some space from the top to account for header and margin
      targetScroll = elementTop - windowHeight * 0.25;
    } else {
      // Center other projects in the viewport
      targetScroll = elementTop - (windowHeight - elementHeight) / 2;
    }

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);


  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[#001429] text-white overflow-hidden"
    >
      {/* Simplified background with minimal effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001429] via-[#001f3f] to-[#00264F]"></div>

        {/* Subtle geometric accent - static only */}
        <div
          className="absolute top-0 left-0 w-[15vw] h-[15vw] opacity-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,61,125,0.1) 0%, transparent 70%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-[15vw] h-[15vw] opacity-5"
          style={{
            background:
              "linear-gradient(315deg, rgba(0,85,176,0.1) 0%, transparent 70%)",
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
              backgroundSize: "80px 80px",
            }}
          ></div>
        </div>
      </div>

      {/* Intro section with centered header */}
      <div
        ref={headerSectionRef}
        className="min-h-screen w-full flex items-center justify-center z-10 relative"
        style={{
          zIndex: 10,
          opacity: 1,
          transform: 'translateY(0)',
        }}
      >
        {/* Building background for main header */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100"
            alt="Modern architecture cityscape"
            className="h-full w-full object-cover object-center"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#001429]/80 via-[#001429]/60 to-[#001429]/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <div className="transform transition-all duration-1000 delay-300">
            <div
              className={`inline-flex items-center space-x-2 mb-5 bg-white/5 backdrop-blur-sm px-4 py-1.5 border border-white/10 mx-auto ${
                isInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="w-2 h-2 bg-white animate-pulse-slow"></div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                Our Portfolio
              </span>
            </div>
            <h2
              className={`text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 transition-all duration-1000 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Featured</span>
                <div className="absolute -bottom-2 left-0 h-3 w-full bg-white/10"></div>
              </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Projects
              </span>
            </h2>
            <p
              className={`mt-4 text-white/60 max-w-2xl mx-auto text-xl transition-all duration-1000 delay-200 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Discover our landmark achievements and innovative solutions that
              are reshaping Singapore's skyline and infrastructure landscape.
            </p>

            {/* Scroll indicator with enhanced effects */}
            <div className="absolute -bottom-30 left-0 right-0 flex justify-center">
              <div className="flex flex-col items-center text-white/70 group cursor-pointer hover:text-white transition-all duration-500">
                <span className="text-sm mb-3 font-medium tracking-wider opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                  Scroll to explore
                </span>

                {/* Enhanced scroll arrow with effects */}
                <div className="relative">
                  {/* Main arrow container */}
                  <div className="w-8 h-12 border-2 border-white/40 group-hover:border-white/80 transition-all duration-500 group-hover:scale-110 relative overflow-hidden">
                    {/* Animated scroll dot */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white group-hover:bg-white/90 transition-all duration-300 animate-scroll-bounce">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-white/50 blur-sm animate-pulse-slow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator - Only visible after header is scrolled past */}
      <div
        className="fixed top-1/2 right-4 z-30 transform -translate-y-1/2 hidden sm:block"
        style={{
          opacity: (isInView && activeProject >= 0) ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="relative h-[200px] w-[2px] bg-white/10">
            <div
              className="absolute top-0 left-0 w-full bg-white transition-all duration-300"
              style={{
                height: `${(activeProject / (projects.length - 1)) * 100}%`,
                background: `linear-gradient(to bottom, ${projects[0].color}, ${
                  projects[projects.length - 1].color
                })`,
              }}
            ></div>
          </div>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className="relative w-2 h-2 transition-all duration-300 hover:scale-150 cursor-pointer"
              style={{
                transform: `scale(${activeProject === index ? 1.5 : 1})`,
                backgroundColor:
                  activeProject === index
                    ? projects[index].color
                    : "rgba(255, 255, 255, 0.3)",
              }}
            >
              <div
                className={`absolute -inset-1 transition-all duration-300 ${
                  activeProject === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  border: `1px solid ${projects[index].color}`,
                }}
              ></div>
            </button>
          ))}
        </div>
      </div>

      {/* Project showcase with normal page scroll */}
      <div
        ref={projectsContainerRef}
        className="relative w-full"
        style={{
          zIndex: 20,
          opacity: 1,
          pointerEvents: "all",
          transition: "opacity 0.3s ease-out",
        }}
      >

        
        {projects.map((project, index) => {
          const isActive = activeProject === index;

          return (
            <div
              key={project.id}
              ref={(el) => {
                if (el) {
                  projectRefs.current[index] = el;
                }
              }}
              className="w-full min-h-screen flex items-center justify-center relative project-item"
              style={{
                opacity: isActive ? 1 : 0.8,
                transform: `scale(${isActive ? 1 : 0.95})`,
                transition: `opacity 0.3s ease-out, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
                filter: isActive ? 'none' : 'blur(1px)',
              }}
            >
              {/* Project image overlay background */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={`${project.title} background`}
                  className="h-full w-full object-cover object-center"
                  style={{
                    opacity: 1,
                    filter: 'brightness(0.3) contrast(1.2)',
                  }}
                />
                {/* Dark overlay for better content readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#001429]/70 via-[#001429]/50 to-[#001429]/70"></div>
              </div>

              <div className="container mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center relative z-10">
                <div className="w-full flex flex-col lg:flex-row items-center overflow-hidden">
                  {/* Project image with enhanced effects */}
                  <div
                    className="relative w-full md:w-3/5 h-[300px] md:h-[500px] overflow-hidden"
                    style={{
                      transform: `scale(${isActive ? 1 : 0.95})`,
                      transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="absolute inset-0 transition-all duration-500 ease-out">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover object-center"
                        style={{
                          filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
                          transform: isActive ? 'scale(1.05)' : 'scale(1)',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
                        style={{
                          opacity: isActive ? 0.3 : 0.7,
                          transition: 'opacity 0.3s ease-out',
                        }}
                      ></div>
                    </div>

                    {/* Project number overlay */}
                    <div
                      className="absolute top-8 left-8 md:top-12 md:left-12"
                      style={{
                        transform: `translateY(${isActive ? 0 : 30}px)`,
                        opacity: isActive ? 0.2 : 0,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <div
                        className="text-[80px] sm:text-[120px] lg:text-[180px] font-bold leading-none"
                        style={{ color: project.color }}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* Project details with enhanced animations */}
                  <div
                    className="relative w-full lg:w-2/5 h-auto lg:h-[500px] bg-black/80 backdrop-blur-sm p-6 sm:p-8 lg:p-12 flex flex-col justify-center mt-6 lg:mt-0"
                    style={{
                      transform: `translateX(${isActive ? 0 : 100}px)`,
                      opacity: isActive ? 1 : 0,
                      transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.05s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.05s",
                    }}
                  >
                    <div className="max-w-md">
                      <div className="mb-6">
                        <div
                          className="flex items-center space-x-4 mb-3"
                          style={{
                            transform: `translateY(${isActive ? 0 : 20}px)`,
                            opacity: isActive ? 1 : 0,
                            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                          }}
                        >
                          <div
                            className="w-8 h-[2px]"
                            style={{
                              backgroundColor: project.color,
                              width: isActive ? "2rem" : "0rem",
                              transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
                            }}
                          ></div>
                          <span className="text-sm font-medium uppercase tracking-wider text-white/70">
                            {project.category}
                          </span>
                        </div>

                        <h3
                          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2"
                          style={{
                            transform: `translateY(${isActive ? 0 : 30}px)`,
                            opacity: isActive ? 1 : 0,
                            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                          }}
                        >
                          {project.title}
                        </h3>

                        <div
                          className="text-sm text-white/50 mb-6"
                          style={{
                            transform: `translateY(${isActive ? 0 : 40}px)`,
                            opacity: isActive ? 1 : 0,
                            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.25s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.25s",
                          }}
                        >
                          Completed in {project.year}
                        </div>

                        <p
                          className="text-white/70 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8"
                          style={{
                            transform: `translateY(${isActive ? 0 : 50}px)`,
                            opacity: isActive ? 1 : 0,
                            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
                          }}
                        >
                          {project.description}
                        </p>

                        <button
                          className="group relative overflow-hidden px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all duration-300"
                          style={{
                            backgroundColor: `${project.color}20`,
                            borderColor: project.color,
                            borderWidth: "1px",
                            transform: `translateY(${isActive ? 0 : 60}px)`,
                            opacity: isActive ? 1 : 0,
                            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.35s, opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.35s",
                          }}
                        >
                          <span className="relative z-10 flex items-center">
                            <span>View Project</span>
                            <svg
                              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </span>
                          <div
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                            style={{ backgroundColor: project.color }}
                          ></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced CSS animations for scroll effects */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.5; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2); 
          }
        }
        
        @keyframes scroll-bounce {
          0%, 100% { 
            transform: translateX(-50%) translateY(0); 
            opacity: 0.8;
          }
          50% { 
            transform: translateX(-50%) translateY(20px); 
            opacity: 1;
          }
        }
        
        .animate-pulse-slow { 
          animation: pulse-slow 3s ease-in-out infinite; 
        }
        
        .animate-scroll-bounce { 
          animation: scroll-bounce 2s ease-in-out infinite; 
        }
        
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        .project-item {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};
