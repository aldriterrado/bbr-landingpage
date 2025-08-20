// Performance optimization utilities

/**
 * Throttle function execution to improve performance
 * @param func Function to throttle
 * @param delay Delay in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: number | null = null
  let lastExecTime = 0
  
  return ((...args: any[]) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }) as T
}

/**
 * Debounce function execution to improve performance
 * @param func Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: number | null = null
  
  return ((...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }) as T
}

/**
 * Request animation frame wrapper for smooth animations
 * @param callback Function to execute on next frame
 * @returns Request ID for cancellation
 */
export function requestAnimationFrame(callback: () => void): number {
  return window.requestAnimationFrame(callback)
}

/**
 * Cancel animation frame
 * @param id Request ID to cancel
 */
export function cancelAnimationFrame(id: number): void {
  window.cancelAnimationFrame(id)
}

/**
 * Intersection Observer options for performance
 */
export const intersectionObserverOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}

/**
 * Create a performance-optimized scroll handler
 * @param callback Function to execute on scroll
 * @param delay Throttle delay in milliseconds
 * @returns Throttled scroll handler
 */
export function createScrollHandler(callback: () => void, delay: number = 16) {
  return throttle(callback, delay)
}

/**
 * Create a performance-optimized resize handler
 * @param callback Function to execute on resize
 * @param delay Debounce delay in milliseconds
 * @returns Debounced resize handler
 */
export function createResizeHandler(callback: () => void, delay: number = 100) {
  return debounce(callback, delay)
}
