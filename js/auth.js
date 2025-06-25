// Authentication Module
class AuthManager {
  constructor() {
    this.currentUser = null
    this.isLoggedIn = false
    this.init()
  }

  init() {
    // Check for existing session
    this.checkSession()
    this.setupEventListeners()
  }

  checkSession() {
    const userData = localStorage.getItem("inviteu_user")
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData)
        this.isLoggedIn = true
        this.updateUI()
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("inviteu_user")
      }
    }
  }

  setupEventListeners() {
    // Login button
    document.getElementById("loginBtn")?.addEventListener("click", () => {
      this.showAuthModal("login")
    })

    // Register button
    document.getElementById("registerBtn")?.addEventListener("click", () => {
      this.showAuthModal("register")
    })

    // Mobile auth buttons
    document.getElementById("mobileLoginBtn")?.addEventListener("click", () => {
      this.showAuthModal("login")
    })

    document.getElementById("mobileRegisterBtn")?.addEventListener("click", () => {
      this.showAuthModal("register")
    })

    // Logout button
    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      this.logout()
    })

    // User panel button
    document.getElementById("userPanelBtn")?.addEventListener("click", () => {
      this.showUserPanel()
    })

    // My orders button
    document.getElementById("myOrdersBtn")?.addEventListener("click", () => {
      this.showMyOrders()
    })
  }

  showAuthModal(mode = "login") {
    const modalHTML = `
      <div class="modal-overlay active" id="authModalOverlay">
        <div class="modal auth-modal">
          <div class="modal-header">
            <h2 class="modal-title">Bienvenido a InviteU.Digital</h2>
            <button class="modal-close" id="closeAuthModal">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" x2="6" y1="6" y2="18"/>
                <line x1="6" x2="18" y1="6" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="auth-tabs">
              <button class="auth-tab ${mode === "login" ? "active" : ""}" data-tab="login">Iniciar Sesión</button>
              <button class="auth-tab ${mode === "register" ? "active" : ""}" data-tab="register">Registrarse</button>
            </div>
            
            <form class="auth-form ${mode === "login" ? "active" : ""}" id="loginForm">
              <div class="form-group">
                <label for="loginEmail">Email</label>
                <input type="email" id="loginEmail" name="email" required>
                <div class="form-error" id="loginEmailError"></div>
              </div>
              <div class="form-group">
                <label for="loginPassword">Contraseña</label>
                <input type="password" id="loginPassword" name="password" required>
                <div class="form-error" id="loginPasswordError"></div>
              </div>
              <button type="submit" class="btn btn-primary btn-full">
                <span class="btn-text">Iniciar Sesión</span>
                <span class="loading-spinner" style="display: none;"></span>
              </button>
              <p class="text-center mt-4">
                <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
              </p>
            </form>

            <form class="auth-form ${mode === "register" ? "active" : ""}" id="registerForm">
              <div class="form-group">
                <label for="registerName">Nombre Completo</label>
                <input type="text" id="registerName" name="name" required>
                <div class="form-error" id="registerNameError"></div>
              </div>
              <div class="form-group">
                <label for="registerEmail">Email</label>
                <input type="email" id="registerEmail" name="email" required>
                <div class="form-error" id="registerEmailError"></div>
              </div>
              <div class="form-group">
                <label for="registerPassword">Contraseña</label>
                <input type="password" id="registerPassword" name="password" required>
                <div class="form-error" id="registerPasswordError"></div>
              </div>
              <div class="form-group">
                <label for="registerConfirmPassword">Confirmar Contraseña</label>
                <input type="password" id="registerConfirmPassword" name="confirmPassword" required>
                <div class="form-error" id="registerConfirmPasswordError"></div>
              </div>
              <button type="submit" class="btn btn-primary btn-full">
                <span class="btn-text">Registrarse</span>
                <span class="loading-spinner" style="display: none;"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    `

    document.getElementById("modalContainer").innerHTML = modalHTML

    // Setup modal event listeners
    this.setupAuthModalListeners()
  }

  setupAuthModalListeners() {
    // Close modal
    document.getElementById("closeAuthModal")?.addEventListener("click", () => {
      this.closeModal()
    })

    document.getElementById("authModalOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "authModalOverlay") {
        this.closeModal()
      }
    })

    // Tab switching
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabType = tab.dataset.tab
        this.switchAuthTab(tabType)
      })
    })

    // Form submissions
    document.getElementById("loginForm")?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleLogin(e.target)
    })

    document.getElementById("registerForm")?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleRegister(e.target)
    })
  }

  switchAuthTab(tabType) {
    // Update tab buttons
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tab === tabType)
    })

    // Update forms
    document.querySelectorAll(".auth-form").forEach((form) => {
      form.classList.toggle("active", form.id === `${tabType}Form`)
    })
  }

  async handleLogin(form) {
    const formData = new FormData(form)
    const email = formData.get("email")
    const password = formData.get("password")

    // Show loading
    this.setFormLoading(form, true)

    try {
      // Simulate API call
      await this.simulateAPICall()

      // Mock successful login
      const userData = {
        id: Date.now(),
        name: email.split("@")[0],
        email: email,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      this.login(userData)
      this.closeModal()

      window.notificationManager?.show("¡Bienvenido de vuelta!", "success")
    } catch (error) {
      this.showFormError("loginEmailError", "Error al iniciar sesión. Verifica tus credenciales.")
    } finally {
      this.setFormLoading(form, false)
    }
  }

  async handleRegister(form) {
    const formData = new FormData(form)
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    // Validate passwords match
    if (password !== confirmPassword) {
      this.showFormError("registerConfirmPasswordError", "Las contraseñas no coinciden")
      return
    }

    // Show loading
    this.setFormLoading(form, true)

    try {
      // Simulate API call
      await this.simulateAPICall()

      // Mock successful registration
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      this.login(userData)
      this.closeModal()

      window.notificationManager?.show("¡Cuenta creada exitosamente!", "success")
    } catch (error) {
      this.showFormError("registerEmailError", "Error al crear la cuenta. Intenta de nuevo.")
    } finally {
      this.setFormLoading(form, false)
    }
  }

  login(userData) {
    this.currentUser = userData
    this.isLoggedIn = true
    localStorage.setItem("inviteu_user", JSON.stringify(userData))
    this.updateUI()
  }

  logout() {
    this.currentUser = null
    this.isLoggedIn = false
    localStorage.removeItem("inviteu_user")
    this.updateUI()
    window.notificationManager?.show("Sesión cerrada correctamente", "success")
  }

  updateUI() {
    const authButtons = document.getElementById("authButtons")
    const userMenu = document.getElementById("userMenu")
    const userName = document.getElementById("userName")

    if (this.isLoggedIn && this.currentUser) {
      authButtons.style.display = "none"
      userMenu.style.display = "block"
      userName.textContent = this.currentUser.name
    } else {
      authButtons.style.display = "flex"
      userMenu.style.display = "none"
    }
  }

  showUserPanel() {
    window.notificationManager?.show("Panel de usuario en desarrollo", "info")
  }

  showMyOrders() {
    window.notificationManager?.show("Mis pedidos en desarrollo", "info")
  }

  setFormLoading(form, loading) {
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

  showFormError(elementId, message) {
    const errorElement = document.getElementById(elementId)
    if (errorElement) {
      errorElement.textContent = message
      errorElement.classList.add("show")

      setTimeout(() => {
        errorElement.classList.remove("show")
      }, 5000)
    }
  }

  closeModal() {
    const modalContainer = document.getElementById("modalContainer")
    modalContainer.innerHTML = ""
  }

  simulateAPICall() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })
  }
}

// Export for use in main.js
window.AuthManager = AuthManager
