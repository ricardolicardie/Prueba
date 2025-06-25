// Shopping Cart Module
class CartManager {
  constructor() {
    this.items = []
    this.total = 0
    this.init()
  }

  init() {
    this.loadCart()
    this.setupEventListeners()
    this.updateCartUI()
  }

  loadCart() {
    const savedCart = localStorage.getItem("inviteu_cart")
    if (savedCart) {
      try {
        this.items = JSON.parse(savedCart)
        this.calculateTotal()
      } catch (error) {
        console.error("Error loading cart:", error)
        this.items = []
      }
    }
  }

  saveCart() {
    localStorage.setItem("inviteu_cart", JSON.stringify(this.items))
  }

  setupEventListeners() {
    // Cart button
    document.getElementById("cartBtn")?.addEventListener("click", () => {
      this.showCartModal()
    })
  }

  addItem(item) {
    const existingItem = this.items.find((cartItem) => cartItem.id === item.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({
        ...item,
        quantity: 1,
      })
    }

    this.calculateTotal()
    this.saveCart()
    this.updateCartUI()

    window.notificationManager?.show(`${item.name} agregado al carrito`, "success")
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId)
    this.calculateTotal()
    this.saveCart()
    this.updateCartUI()
    this.updateCartModal()
  }

  updateQuantity(itemId, quantity) {
    const item = this.items.find((cartItem) => cartItem.id === itemId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(itemId)
      } else {
        item.quantity = quantity
        this.calculateTotal()
        this.saveCart()
        this.updateCartUI()
        this.updateCartModal()
      }
    }
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  updateCartUI() {
    const cartCount = document.getElementById("cartCount")
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0)

    if (cartCount) {
      cartCount.textContent = totalItems
      cartCount.classList.toggle("show", totalItems > 0)
    }
  }

  showCartModal() {
    const modalHTML = `
      <div class="modal-overlay active" id="cartModalOverlay">
        <div class="modal cart-modal">
          <div class="modal-header">
            <h2 class="modal-title">Carrito de Compras</h2>
            <button class="modal-close" id="closeCartModal">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" x2="6" y1="6" y2="18"/>
                <line x1="6" x2="18" y1="6" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="cart-items" id="cartItems">
              ${this.renderCartItems()}
            </div>
            ${this.items.length > 0 ? this.renderCartTotal() : ""}
          </div>
          ${this.items.length > 0 ? this.renderCartFooter() : ""}
        </div>
      </div>
    `

    document.getElementById("modalContainer").innerHTML = modalHTML
    this.setupCartModalListeners()
  }

  renderCartItems() {
    if (this.items.length === 0) {
      return `
        <div class="cart-empty">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega algunos productos para comenzar</p>
        </div>
      `
    }

    return this.items
      .map(
        (item) => `
      <div class="cart-item" data-item-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">€${item.price}</p>
          <div class="quantity-controls">
            <button class="quantity-btn" data-action="decrease">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" data-action="increase">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-item-id="${item.id}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="m19,6v14a2 2 0 0 1-2,2H7a2 2 0 0 1-2-2V6m3,0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2,2v2"/>
          </svg>
        </button>
      </div>
    `,
      )
      .join("")
  }

  renderCartTotal() {
    return `
      <div class="cart-total">
        <span class="cart-total-label">Total:</span>
        <span class="cart-total-amount">€${this.total.toFixed(2)}</span>
      </div>
    `
  }

  renderCartFooter() {
    return `
      <div class="modal-footer">
        <button class="btn btn-outline" id="continueShoppingBtn">Seguir Comprando</button>
        <button class="btn btn-primary" id="checkoutBtn">Proceder al Pago</button>
      </div>
    `
  }

  setupCartModalListeners() {
    // Close modal
    document.getElementById("closeCartModal")?.addEventListener("click", () => {
      this.closeModal()
    })

    document.getElementById("cartModalOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "cartModalOverlay") {
        this.closeModal()
      }
    })

    // Continue shopping
    document.getElementById("continueShoppingBtn")?.addEventListener("click", () => {
      this.closeModal()
    })

    // Checkout
    document.getElementById("checkoutBtn")?.addEventListener("click", () => {
      this.proceedToCheckout()
    })

    // Quantity controls
    document.querySelectorAll(".quantity-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.target.dataset.action
        const cartItem = e.target.closest(".cart-item")
        const itemId = Number.parseInt(cartItem.dataset.itemId)
        const currentQuantity = Number.parseInt(cartItem.querySelector(".quantity").textContent)

        if (action === "increase") {
          this.updateQuantity(itemId, currentQuantity + 1)
        } else if (action === "decrease") {
          this.updateQuantity(itemId, currentQuantity - 1)
        }
      })
    })

    // Remove item
    document.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const itemId = Number.parseInt(e.target.closest("button").dataset.itemId)
        this.removeItem(itemId)
      })
    })
  }

  updateCartModal() {
    const cartItems = document.getElementById("cartItems")
    if (cartItems) {
      cartItems.innerHTML = this.renderCartItems()

      // Update total
      const existingTotal = document.querySelector(".cart-total")
      if (existingTotal && this.items.length > 0) {
        existingTotal.outerHTML = this.renderCartTotal()
      } else if (existingTotal && this.items.length === 0) {
        existingTotal.remove()
        const footer = document.querySelector(".modal-footer")
        if (footer) footer.remove()
      }

      // Re-setup listeners for new elements
      this.setupCartModalListeners()
    }
  }

  proceedToCheckout() {
    if (!window.authManager?.isLoggedIn) {
      this.closeModal()
      window.authManager?.showAuthModal("login")
      window.notificationManager?.show("Inicia sesión para continuar con la compra", "info")
      return
    }

    // Simulate checkout process
    window.notificationManager?.show("Redirigiendo al checkout...", "info")
    this.closeModal()

    // Here you would integrate with Stripe or your payment processor
    setTimeout(() => {
      window.notificationManager?.show("Checkout en desarrollo", "info")
    }, 1000)
  }

  closeModal() {
    const modalContainer = document.getElementById("modalContainer")
    modalContainer.innerHTML = ""
  }

  clearCart() {
    this.items = []
    this.total = 0
    this.saveCart()
    this.updateCartUI()
  }
}

// Export for use in main.js
window.CartManager = CartManager
