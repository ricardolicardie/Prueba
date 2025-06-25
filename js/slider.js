// Slider/Carousel Module
class SliderManager {
  constructor() {
    this.currentSlide = 0
    this.slides = []
    this.autoplayInterval = null
    this.autoplayDelay = 5000
    this.init()
  }

  init() {
    this.setupHeroSlider()
    this.setupTestimonialsSlider()
  }

  setupHeroSlider() {
    const sliderContainer = document.querySelector(".slider-container")
    if (!sliderContainer) return

    this.slides = Array.from(document.querySelectorAll(".slide"))
    this.dots = Array.from(document.querySelectorAll(".dot"))

    // Setup dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })

    // Start autoplay
    this.startAutoplay()

    // Pause on hover
    sliderContainer.addEventListener("mouseenter", () => {
      this.stopAutoplay()
    })

    sliderContainer.addEventListener("mouseleave", () => {
      this.startAutoplay()
    })

    // Touch/swipe support
    this.setupTouchEvents(sliderContainer)
  }

  setupTouchEvents(container) {
    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0

    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    })

    container.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      endY = e.changedTouches[0].clientY
      this.handleSwipe(startX, startY, endX, endY)
    })
  }

  handleSwipe(startX, startY, endX, endY) {
    const deltaX = endX - startX
    const deltaY = endY - startY
    const minSwipeDistance = 50

    // Check if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        this.previousSlide()
      } else {
        this.nextSlide()
      }
    }
  }

  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return

    // Update slides
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index)
    })

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })

    this.currentSlide = index
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  previousSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(prevIndex)
  }

  startAutoplay() {
    this.stopAutoplay()
    this.autoplayInterval = setInterval(() => {
      this.nextSlide()
    }, this.autoplayDelay)
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = null
    }
  }

  setupTestimonialsSlider() {
    // Testimonials slider implementation would go here
    // Similar to hero slider but with different controls
  }
}

// Export for use in main.js
window.SliderManager = SliderManager
