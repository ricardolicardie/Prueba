// Data Management Module
class DataManager {
  constructor() {
    this.events = []
    this.packages = []
    this.testimonials = []
    this.init()
  }

  async init() {
    await this.loadData()
  }

  async loadData() {
    // In a real app, this would fetch from an API
    // For now, we'll use mock data
    this.events = this.getMockEvents()
    this.packages = this.getMockPackages()
    this.testimonials = this.getMockTestimonials()
  }

  getMockEvents() {
    return [
      {
        id: 1,
        name: "Elegancia Clásica",
        category: "bodas",
        price: 299,
        image: "assets/images/events/boda-1.jpg",
        description: "Diseño elegante y romántico para bodas clásicas",
        features: ["Diseño personalizado", "RSVP integrado", "Galería de fotos"],
      },
      {
        id: 2,
        name: "Moderna Minimalista",
        category: "bodas",
        price: 349,
        image: "assets/images/events/boda-2.jpg",
        description: "Estilo minimalista y contemporáneo",
        features: ["Diseño responsive", "Animaciones suaves", "Mapa interactivo"],
      },
      {
        id: 3,
        name: "Fiesta Colorida",
        category: "cumpleanos",
        price: 199,
        image: "assets/images/events/cumpleanos-1.jpg",
        description: "Diseño vibrante y divertido para cumpleaños",
        features: ["Colores personalizables", "Música de fondo", "Contador regresivo"],
      },
      {
        id: 4,
        name: "Celebración Infantil",
        category: "cumpleanos",
        price: 179,
        image: "assets/images/events/cumpleanos-2.jpg",
        description: "Perfecto para fiestas infantiles",
        features: ["Personajes animados", "Juegos interactivos", "Lista de regalos"],
      },
      {
        id: 5,
        name: "Bendición Sagrada",
        category: "bautizos",
        price: 229,
        image: "assets/images/events/bautizo-1.jpg",
        description: "Diseño tierno y espiritual para bautizos",
        features: ["Símbolos religiosos", "Galería familiar", "Mensaje especial"],
      },
      {
        id: 6,
        name: "Dulce Espera",
        category: "baby-shower",
        price: 249,
        image: "assets/images/events/baby-shower-1.jpg",
        description: "Celebra la llegada del bebé con estilo",
        features: ["Género revelado", "Lista de regalos", "Juegos virtuales"],
      },
    ]
  }

  getMockPackages() {
    return [
      {
        id: 1,
        name: "Básico",
        price: 159,
        originalPrice: 199,
        description: "Perfecto para eventos pequeños e íntimos",
        features: [
          "Diseño web personalizado",
          "Subdominio incluido (tuevento.inviteu.digital)",
          "Hasta 50 invitados",
          "RSVP básico",
          "Galería de 10 fotos",
          "Soporte por email",
          "Acceso por 3 meses",
        ],
        popular: false,
        color: "from-blue-500 to-purple-500",
      },
      {
        id: 2,
        name: "Intermedio",
        price: 299,
        originalPrice: 399,
        description: "Ideal para celebraciones medianas con más funciones",
        features: [
          "Todo lo del plan Básico",
          "Hasta 150 invitados",
          "RSVP avanzado con opciones de menú",
          "Galería ilimitada de fotos",
          "Mapa interactivo del evento",
          "Música de fondo personalizada",
          "Contador regresivo",
          "Soporte prioritario",
          "Acceso por 6 meses",
        ],
        popular: true,
        color: "from-pink-500 to-purple-500",
      },
      {
        id: 3,
        name: "Premium",
        price: 499,
        originalPrice: 699,
        description: "La experiencia completa para eventos especiales",
        features: [
          "Todo lo del plan Intermedio",
          "Invitados ilimitados",
          "Diseño 100% personalizado",
          "Animaciones y efectos especiales",
          "Video de fondo",
          "Chat en vivo para invitados",
          "Integración con redes sociales",
          "Estadísticas detalladas",
          "Dominio personalizado opcional",
          "Soporte 24/7",
          "Acceso por 1 año",
        ],
        popular: false,
        color: "from-purple-500 to-pink-500",
      },
    ]
  }

  getMockTestimonials() {
    return [
      {
        id: 1,
        name: "María González",
        event: "Boda",
        rating: 5,
        comment:
          "¡Increíble servicio! Nuestra invitación digital fue perfecta y todos nuestros invitados quedaron encantados. El proceso fue súper fácil y el resultado superó nuestras expectativas.",
        avatar: "assets/images/testimonials/maria.jpg",
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "Carlos Ruiz",
        event: "Cumpleaños",
        rating: 5,
        comment:
          "Contraté el servicio para el cumpleaños de mi hija y fue un éxito total. La invitación era colorida, divertida y muy fácil de compartir. ¡Definitivamente lo recomiendo!",
        avatar: "assets/images/testimonials/carlos.jpg",
        date: "2024-02-03",
      },
      {
        id: 3,
        name: "Ana Martínez",
        event: "Baby Shower",
        rating: 5,
        comment:
          "El equipo de InviteU.Digital hizo que nuestro baby shower fuera memorable. La invitación era hermosa y todas las funciones funcionaron perfectamente. ¡Gracias!",
        avatar: "assets/images/testimonials/ana.jpg",
        date: "2024-02-20",
      },
    ]
  }

  getEventsByCategory(category) {
    if (category === "todos") {
      return this.events
    }
    return this.events.filter((event) => event.category === category)
  }

  getEventById(id) {
    return this.events.find((event) => event.id === id)
  }

  getPackageById(id) {
    return this.packages.find((pkg) => pkg.id === id)
  }

  getAllEvents() {
    return this.events
  }

  getAllPackages() {
    return this.packages
  }

  getAllTestimonials() {
    return this.testimonials
  }
}

// Export for use in main.js
window.DataManager = DataManager
