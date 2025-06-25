// Utility Functions

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of target element
 * @param {number} offset - Offset from top (default: 80)
 */
function scrollToSection(elementId, offset = 80) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

/**
 * Get current year
 * @returns {number} Current year
 */
function getCurrentYear() {
  return new Date().getFullYear()
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Local storage helper
 */
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return null
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  },
}

/**
 * Device detection
 */
const device = {
  isMobile: () => window.innerWidth <= 768,
  isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
  isDesktop: () => window.innerWidth > 1024,
  hasTouch: () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
  getViewportSize: () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }),
}

/**
 * Animation helpers
 */
const animation = {
  fadeIn: (element, duration = 300) => {
    element.style.opacity = "0"
    element.style.display = "block"

    const start = performance.now()

    function animate(currentTime) {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)

      element.style.opacity = progress

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  },

  fadeOut: (element, duration = 300) => {
    const start = performance.now()
    const startOpacity = Number.parseFloat(getComputedStyle(element).opacity)

    function animate(currentTime) {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)

      element.style.opacity = startOpacity * (1 - progress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        element.style.display = "none"
      }
    }

    requestAnimationFrame(animate)
  },
}
