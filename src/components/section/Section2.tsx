import React, { useEffect, useState, useRef } from "react";
import jervois from '../../assets/jervois.jpg'

export const Section2: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // State for animated counters
  const [counters, setCounters] = useState({
    years: 0,
    segments: 0,
    projects: 0,
  });

  // Intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
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

  // Separate intersection observer for stats section with more lenient settings
  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setStatsInView(true);
          statsObserver.unobserve(entry.target);
        }
      },
      {
        // More lenient threshold to ensure triggering
        threshold: 0.1,
        // More generous rootMargin to trigger earlier
        rootMargin: "0px",
      }
    );
    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }
    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
    };
  }, []);

  // Counter animation effect - only triggered when stats are in view
  useEffect(() => {
    if (statsInView) {
      const duration = 2000; // ms
      const framesPerSecond = 60;
      const totalFrames = (duration / 1000) * framesPerSecond;
      let frame = 0;
      const targetValues = {
        years: 20,
        segments: 4,
        projects: 100,
      };
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        if (frame <= totalFrames) {
          setCounters({
            years: Math.ceil(progress * targetValues.years),
            segments: Math.ceil(progress * targetValues.segments),
            projects: Math.ceil(progress * targetValues.projects),
          });
        } else {
          clearInterval(interval);
          setCounters(targetValues);
        }
      }, 1000 / framesPerSecond);
      return () => clearInterval(interval);
    }
  }, [statsInView]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] text-gray-800"
    >
      {/* Main content layout with asymmetric grid */}
      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                     {/* Left column - Text content directly on background */}
          <div className="lg:col-span-6 lg:col-start-1 flex items-center">
            <div
               className={`relative transition-all duration-1000 ease-out ${
                 isInView
                   ? "opacity-100 translate-y-0"
                   : "opacity-0 translate-y-20"
               }`}
             >

              {/* Section label with animated dot */}
              <div className="inline-flex items-center space-x-2 mb-6 bg-[#003D7D]/10 px-4 py-1.5 rounded-full border border-[#003D7D]/20">
                <div className="w-2 h-2 rounded-full bg-[#003D7D] animate-pulse-slow"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#003D7D]">
                  About Us
                </span>
              </div>

              {/* Main heading with animated gradient underline */}
              <h2 className="text-5xl md:text-6xl font-bold text-[#003D7D] tracking-tight mb-6">
                <span className="relative inline-block">
                  <span className="relative z-10">Building</span>
                  <div
                    className={`absolute -bottom-2 left-0 h-3 w-full bg-[#003D7D]/20 transition-all duration-1000 delay-700 ${
                      isInView ? "w-full" : "w-0"
                    }`}
                  ></div>
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#003D7D] to-[#0055b0]">
                  Tomorrow
                </span>
              </h2>

              {/* Subtitle with animated reveal */}
              <div className="overflow-hidden mb-8">
                <p
                  className={`text-lg font-normal text-[#003D7D]/80  transition-transform duration-1000 delay-300 ${
                    isInView ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  Innovating construction and engineering solutions across
                  Southeast Asia
                </p>
              </div>

              {/* Main text content with staggered animation */}
              <div className="space-y-4 mb-10 text-gray-700">
                <p
                  className={`leading-relaxed transition-all duration-1000 delay-400 ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  BBR Holdings (S) Ltd is one of Singapore's leading
                  construction and specialised engineering groups with more than
                  20 years of industry experience. We comprise four core
                  business segments spanning across General Construction,
                  Specialised Engineering, Property Development and Green
                  Technology.
                </p>
                <p
                  className={`leading-relaxed transition-all duration-1000 delay-600 ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  The BBR Group is well-positioned to meet the urbanisation
                  challenge in South East Asia with its ability and proven track
                  record to combine innovative engineering with specialist
                  know-how in the built-environment.
                </p>
              </div>

              {/* CTA Button with modern hover effect */}
              <div
                className={`transition-all duration-1000 delay-800 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <button className="relative overflow-hidden group bg-gradient-to-r from-[#003D7D] to-[#0055b0] text-white px-8 py-3 shadow-[0_5px_15px_rgba(0,61,125,0.25)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,61,125,0.35)] hover:-translate-y-1">
                  <span className="relative z-10 flex items-center">
                    <span>Learn More</span>
                    <svg
                      className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>

              </div>
            </div>

          {/* Right column - Optimized image without parallax */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div
              className={`relative h-[60vh] lg:h-[80vh] transition-all duration-1000 ease-out ${
                isInView
                  ? "opacity-100 translate-x-0 rotate-0"
                  : "opacity-0 translate-x-20 rotate-3"
              }`}
            >
              <div className="absolute inset-0 overflow-hidden shadow-[0_20px_80px_rgba(0,61,125,0.15)] border border-white/50 transform perspective-1000">
                {/* Static image effect */}
                <div className="absolute inset-0 scale-[1.03] transition-transform duration-700 group-hover:scale-[1.05]">
                  {/* Image overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#003D7D]/30 via-transparent to-[#0055b0]/20 mix-blend-multiply z-10"></div>
                  {/* Main image */}
                  <img
                    src={jervois}
                    alt="Modern architecture and construction"
                    className="w-full h-full object-cover object-center transition-transform duration-700"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+SW1hZ2UgTG9hZCBFcnJvcjwvdGV4dD48L3N2Zz4=";
                    }}
                  />
                </div>
                {/* Professional corner design elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-white/50"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-white/50"></div>
                                 {/* Static corner accent */}
                <div className="absolute bottom-0 left-0 w-24 h-24">
                  <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
                     <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-white/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section with optimized design */}
      <div
        ref={statsRef}
        className="relative z-20 w-full mt-12 lg:mt-0"
        style={{
          minHeight: "300px",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#003D7D] to-[#0055b0]"
          style={{
            clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)",
          }}
        ></div>
        {/* Simplified geometric background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Static light beams */}
          <div className="absolute top-0 left-[20%] w-1 h-[200%] bg-white/10 rotate-45"></div>
          <div className="absolute top-0 left-[60%] w-1 h-[200%] bg-white/10 rotate-45"></div>
          <div className="absolute top-0 right-[30%] w-1 h-[200%] bg-white/10 rotate-45"></div>

          {/* Static corporate geometric shapes */}
          <div className="absolute top-[10%] right-[5%] w-20 h-20 border border-white/10 rotate-45"></div>
          <div className="absolute bottom-[20%] left-[10%] w-32 h-32 border-l-2 border-t-2 border-white/10"></div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#003D7D]/10 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-6 py-24">
          {/* Fallback text for when stats are not in view yet */}
          {!statsInView && (
            <div className="text-center text-white opacity-0">
              Loading stats...
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Years Experience */}
            <div className="relative overflow-hidden group">
              {/* Background line animation */}
              <div className="absolute inset-0 bg-white/5 transition-all duration-500 group-hover:bg-white/10"></div>
              {/* Animated border effect */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700"></div>
              <div className="absolute top-0 right-0 w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 delay-100"></div>
              <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700 delay-200"></div>
              <div className="absolute bottom-0 left-0 w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 delay-300"></div>
              <div className="p-10 md:p-16 text-center border-r border-white/10">
                <div className="relative">
                  {/* Animated number */}
                  <div className="text-7xl font-bold text-white mb-2 flex justify-center items-baseline">
                    <span>{statsInView ? counters.years : 20}</span>
                    <span className="text-yellow-300 ml-1">+</span>
                  </div>
                  {/* Label */}
                  <div className="text-sm uppercase tracking-[0.2em] text-white/70 font-light">
                    Years Experience
                  </div>
                  {/* Geometric accent */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 border-t border-r border-white/20 opacity-50"></div>
                </div>
              </div>
            </div>
            {/* Business Segments */}
            <div className="relative overflow-hidden group">
              {/* Background line animation */}
              <div className="absolute inset-0 bg-white/5 transition-all duration-500 group-hover:bg-white/10"></div>
              {/* Animated border effect */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700"></div>
              <div className="absolute top-0 right-0 w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 delay-100"></div>
              <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700 delay-200"></div>
              <div className="absolute bottom-0 left-0 w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 delay-300"></div>
              <div className="p-10 md:p-16 text-center border-r border-white/10">
                <div className="relative">
                  {/* Animated number */}
                  <div className="text-7xl font-bold text-white mb-2 flex justify-center">
                    <span>{statsInView ? counters.segments : 4}</span>
                  </div>
                  {/* Label */}
                  <div className="text-sm uppercase tracking-[0.2em] text-white/70 font-light">
                    Business Segments
                  </div>
                  {/* Geometric accent */}
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b border-l border-white/20 opacity-50"></div>
                </div>
              </div>
            </div>
            {/* Projects Completed */}
            <div className="relative overflow-hidden group">
              {/* Background line animation */}
              <div className="absolute inset-0 bg-white/5 transition-all duration-500 group-hover:bg-white/10"></div>
              {/* Animated border effect */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700"></div>
              <div className="absolute top-0 right-0 w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 delay-100"></div>
              <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-700 delay-200"></div>
              <div className="absolute bottom-0 left-0 w-[2px] h-0 bg-white group-hover:h-full transition-all duration-700 delay-300"></div>
              <div className="p-10 md:p-16 text-center">
                <div className="relative">
                  {/* Animated number */}
                  <div className="text-7xl font-bold text-white mb-2 flex justify-center items-baseline">
                    <span>{statsInView ? counters.projects : 100}</span>
                    <span className="text-yellow-300 ml-1">+</span>
                  </div>
                  {/* Label */}
                  <div className="text-sm uppercase tracking-[0.2em] text-white/70 font-light">
                    Projects Completed
                  </div>
                  {/* Geometric accent */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-white/20 opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimized CSS animations - only essential ones */}
      <style>{`
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};
