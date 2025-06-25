// Main Application JavaScript

// Import necessary modules
import { debounce } from "./utils.js"
import { handleKeyboardNavigation } from "./keyboardNavigation.js"

// Global managers
let authManager
let cartManager
let sliderManager
let dataManager
let notificationManager

// DOM Elements
const elements = {
  mobileMenuBtn: document.getElementById("mobileMenuBtn"),
  mobileMenu: document.getElementById("mobileMenu"),
  closeMenuBtn: document.getElementById("closeMenuBtn"),
  navbar: document.getElementById("navbar"),
  currentYearSpan: document.getElementById("currentYear"),
  eventsGrid: document.getElementById("eventsGrid"),
  packagesGrid: document.getElementById("packagesGrid"),
  testimonialsSlider: document.getElementById("testimonialsSlider"),
  contactForm: document.getElementById("contactForm"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
}

// Initialize application
document.addEventListener("DOMContentLoaded", async () => {
  await initializeApp()
})

/**
 * Initialize the application
 */
async function initializeApp() {
  try {
    // Show loading state
    document.body.classList.add("loading")

    // Initialize managers
    notificationManager = new (
      window.NotificationManager ||
      class {
        show(message, type = "info") {
          console.log(`${type.toUpperCase()}: ${message}`)
        }
      }
    )()

    authManager = new (
      window.AuthManager ||
      class {
        constructor() {
          this.isLoggedIn = false
        }
        showAuthModal() {
          console.log("Auth modal")
        }
      }
    )()

    cartManager = new (
      window.CartManager ||
      class {
        addItem(item) {
          console.log("Add to cart:", item)
        }
      }
    )()

    sliderManager = new (
      window.SliderManager ||
      class {
        constructor() {
          console.log("Slider initialized")
        }
      }
    )()

    dataManager = new (
      window.DataManager ||
      class {
        constructor() {
          this.events = []
          this.packages = []
          this.testimonials = []
        }
        async init() {}
        getAllEvents() {
          return []
        }
        getAllPackages() {
          return []
        }
        getAllTestimonials() {
          return []
        }
        getEventsByCategory() {
          return []
        }
        getEventById(eventId) {
          return this.events.find((event) => event.id === eventId)
        }
        getPackageById(packageId) {
          return this.packages.find((pkg) => pkg.id === packageId)
        }
      }
    )()

    // Make managers globally available
    window.authManager = authManager
    window.cartManager = cartManager
    window.sliderManager = sliderManager
    window.dataManager = dataManager
    window.notificationManager = notificationManager

    // Wait for data to load
    await dataManager.init()

    // Set up event listeners
    setupEventListeners()

    // Initialize components
    initializeComponents()

    // Load dynamic content
    await loadDynamicContent()

    // Set current year
    if (elements.currentYearSpan) {
      elements.currentYearSpan.textContent = new Date().getFullYear()
    }

    // Remove loading state
    document.body.classList.remove("loading")
    document.body.classList.add("loaded")

    console.log("InviteU.digital website loaded successfully! 🎉")
  } catch (error) {
    console.error("Error initializing app:", error)
    notificationManager?.show("Error al cargar la aplicación", "error")
  }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Mobile menu
  if (elements.mobileMenuBtn) {
    elements.mobileMenuBtn.addEventListener("click", toggleMobileMenu)
  }

  if (elements.closeMenuBtn) {
    elements.closeMenuBtn.addEventListener("click", closeMobileMenu)
  }

  // Close mobile menu when clicking on links
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Close mobile menu when clicking outside
  if (elements.mobileMenu) {
    elements.mobileMenu.addEventListener("click", (e) => {
      if (e.target === elements.mobileMenu) {
        closeMobileMenu()
      }
    })
  }

  // Navbar scroll effect
  window.addEventListener("scroll", debounce(handleScroll, 10))

  // Filter buttons
  setupFilterButtons()

  // Contact form
  if (elements.contactForm) {
    elements.contactForm.addEventListener("submit", handleContactSubmit)
  }

  // Load more button
  if (elements.loadMoreBtn) {
    elements.loadMoreBtn.addEventListener("click", loadMoreEvents)
  }

  // Keyboard navigation
  document.addEventListener("keydown", handleKeyboardNavigation)

  // Resize handler
  window.addEventListener("resize", debounce(handleResize, 250))

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

/**
 * Initialize components
 */
function initializeComponents() {
  // Initialize intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeInUp")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe animated elements
  document.querySelectorAll(".event-card, .package-card, .testimonial-card").forEach((el) => {
    observer.observe(el)
  })
}

/**
 * Load dynamic content
 */
async function loadDynamicContent() {
  try {
    await Promise.all([loadEvents(), loadPackages(), loadTestimonials()])
  } catch (error) {
    console.error("Error loading dynamic content:", error)
  }
}

/**
 * Load events
 */
async function loadEvents(category = "todos") {
  if (!elements.eventsGrid) return

  const events = dataManager.getEventsByCategory(category)

  elements.eventsGrid.innerHTML = events
    .map(
      (event) => `
    <div class="event-card" data-category="${event.category}" data-event-id="${event.id}">
      <div class="event-card-image">
        <img src="${event.image}" alt="${event.name}" loading="lazy">
        <div class="event-card-overlay"></div>
      </div>
      <div class="event-card-content">
        <h3 class="event-card-title">${event.name}</h3>
        <p class="event-card-description">${event.description}</p>
        <div class="event-card-price">Desde €${event.price}</div>
        <div class="event-card-actions">
          <button class="btn btn-outline btn-sm" onclick="viewEventDetails(${event.id})">Ver Detalles</button>
          <button class="btn btn-primary btn-sm" onclick="addEventToCart(${event.id})">Agregar al Carrito</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("")

  // Re-observe new elements for animations
  document.querySelectorAll(".event-card").forEach((el) => {
    if (!el.classList.contains("animate-fadeInUp")) {
      // Re-setup observer if needed
    }
  })
}

/**
 * Load packages
 */
async function loadPackages() {
  if (!elements.packagesGrid) return

  const packages = dataManager.getAllPackages()

  elements.packagesGrid.innerHTML = packages
    .map(
      (pkg) => `
    <div class="package-card ${pkg.popular ? "package-featured" : ""}" data-package-id="${pkg.id}">
      ${pkg.popular ? '<div class="package-badge">Más Popular</div>' : ""}
      <div class="package-header">
        <h3 class="package-name">${pkg.name}</h3>
        <div class="package-price">
          <span class="price">€${pkg.price}</span>
          ${pkg.originalPrice ? `<span class="original-price">€${pkg.originalPrice}</span>` : ""}
        </div>
        <p class="package-description">${pkg.description}</p>
      </div>
      <ul class="package-features">
        ${pkg.features.map((feature) => `<li>✓ ${feature}</li>`).join("")}
      </ul>
      <div class="package-actions">
        <button class="btn btn-outline btn-full" onclick="viewPackageDetails(${pkg.id})">Ver Detalles</button>
        <button class="btn btn-primary btn-full" onclick="selectPackage(${pkg.id})">Seleccionar Plan</button>
      </div>
    </div>
  `,
    )
    .join("")

  // Re-observe new elements for animations
  document.querySelectorAll(".package-card").forEach((el) => {
    if (!el.classList.contains("animate-fadeInUp")) {
      // Re-setup observer if needed
    }
  })
}

/**
 * Load testimonials
 */
async function loadTestimonials() {
  if (!elements.testimonialsSlider) return

  const testimonials = dataManager.getAllTestimonials()

  elements.testimonialsSlider.innerHTML = testimonials
    .map(
      (testimonial) => `
    <div class="testimonial-card">
      <div class="testimonial-content">
        "${testimonial.comment}"
      </div>
      <div class="testimonial-author">
        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
        <div class="testimonial-info">
          <h4>${testimonial.name}</h4>
          <p>${testimonial.event}</p>
          <div class="testimonial-rating">
            ${"★".repeat(testimonial.rating)}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("")

  // Re-observe new elements for animations
  document.querySelectorAll(".testimonial-card").forEach((el) => {
    if (!el.classList.contains("animate-fadeInUp")) {
      // Re-setup observer if needed
    }
  })
}

/**
 * Setup filter buttons
 */
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")
      await loadEvents(filter)
    })
  })
}

/**
 * Mobile menu functions
 */
function toggleMobileMenu() {
  elements.mobileMenu.classList.toggle("active")
  document.body.style.overflow = elements.mobileMenu.classList.contains("active") ? "hidden" : ""
}

function closeMobileMenu() {
  elements.mobileMenu.classList.remove("active")
  document.body.style.overflow = ""
}

/**
 * Handle scroll events
 */
function handleScroll() {
  if (elements.navbar) {
    if (window.scrollY > 10) {
      elements.navbar.classList.add("scrolled")
    } else {
      elements.navbar.classList.remove("scrolled")
    }
  }
}

/**
 * Handle window resize
 */
function handleResize() {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768 && elements.mobileMenu.classList.contains("active")) {
    closeMobileMenu()
  }
}

/**
 * Handle contact form submission
 */
async function handleContactSubmit(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)

  // Validate form
  if (!validateContactForm(data)) {
    return
  }

  // Show loading state
  setFormLoading(e.target, true)

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    notificationManager.show("¡Mensaje enviado correctamente! Te contactaremos pronto.", "success")
    e.target.reset()
  } catch (error) {
    notificationManager.show("Error al enviar el mensaje. Intenta de nuevo.", "error")
  } finally {
    setFormLoading(e.target, false)
  }
}

/**
 * Validate contact form
 */
function validateContactForm(data) {
  let isValid = true

  // Clear previous errors
  document.querySelectorAll(".form-error").forEach((error) => {
    error.classList.remove("show")
  })

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    showFormError("nameError", "El nombre debe tener al menos 2 caracteres")
    isValid = false
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    showFormError("emailError", "Ingresa un email válido")
    isValid = false
  }

  // Validate event type
  if (!data["event-type"]) {
    showFormError("eventTypeError", "Selecciona el tipo de evento")
    isValid = false
  }

  return isValid
}

/**
 * Show form error
 */
function showFormError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.add("show")
  }
}

/**
 * Set form loading state
 */
function setFormLoading(form, loading) {
  const submitBtn = form.querySelector('button[type="submit"]')
  const btnText = submitBtn.querySelector(".btn-text")
  const spinner = submitBtn.querySelector(".loading-spinner")

  if (loading) {
    btnText.style.display = "none"
    spinner.style.display = "inline-block"
    submitBtn.disabled = true
  } else {
    btnText.style.display = "inline"
    spinner.style.display = "none"
    submitBtn.disabled = false
  }
}

/**
 * Load more events
 */
function loadMoreEvents() {
  notificationManager.show("Cargando más diseños...", "info")
  // Implement pagination logic here
}

/**
 * Global functions for onclick handlers
 */
window.scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

window.viewEventDetails = (eventId) => {
  const event = dataManager.getEventById(eventId)
  if (event) {
    notificationManager.show(`Viendo detalles de ${event.name}`, "info")
    // Show event details modal
  }
}

window.addEventToCart = (eventId) => {
  const event = dataManager.getEventById(eventId)
  if (event) {
    cartManager.addItem(event)
  }
}

window.viewPackageDetails = (packageId) => {
  const pkg = dataManager.getPackageById(packageId)
  if (pkg) {
    notificationManager.show(`Viendo detalles del plan ${pkg.name}`, "info")
    // Show package details modal
  }
}

window.selectPackage = (packageId) => {
  const pkg = dataManager.getPackageById(packageId)
  if (pkg) {
    cartManager.addItem(pkg)
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
})
