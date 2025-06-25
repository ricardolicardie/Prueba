// Component Classes and Functions

/**
 * Notification Manager
 */
class NotificationManager {
  constructor() {
    this.notifications = []
    this.container = this.createContainer()
  }

  createContainer() {
    const container = document.createElement("div")
    container.className = "notification-container"
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1060;
      pointer-events: none;
    `
    document.body.appendChild(container)
    return container
  }

  show(message, type = "success", duration = 4000) {
    const notification = document.createElement("div")
    const id = this.generateId()

    notification.className = `notification ${type}`
    notification.textContent = message
    notification.style.cssText = `
      margin-bottom: 10px;
      pointer-events: auto;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `

    this.container.appendChild(notification)
    this.notifications.push({ id, element: notification })

    // Show notification
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)"
    })

    // Auto hide
    setTimeout(() => {
      this.hide(id)
    }, duration)

    return id
  }

  hide(id) {
    const notificationIndex = this.notifications.findIndex((n) => n.id === id)
    if (notificationIndex > -1) {
      const notification = this.notifications[notificationIndex]
      notification.element.style.transform = "translateX(100%)"

      setTimeout(() => {
        if (notification.element.parentNode) {
          notification.element.remove()
        }
        this.notifications.splice(notificationIndex, 1)
      }, 300)
    }
  }

  clear() {
    this.notifications.forEach((notification) => {
      notification.element.remove()
    })
    this.notifications = []
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9)
  }
}

/**
 * Intersection Observer for animations
 */
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp")
            this.observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )
  }

  observe(element) {
    this.observer.observe(element)
  }

  observeAll(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      this.observe(el)
    })
  }
}

/**
 * Lazy Loading for images
 */
class LazyLoader {
  constructor() {
    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
            this.imageObserver.unobserve(img)
          }
        }
      })
    })
  }

  observe(img) {
    this.imageObserver.observe(img)
  }

  observeAll() {
    document.querySelectorAll("img[data-src]").forEach((img) => {
      this.observe(img)
    })
  }
}
