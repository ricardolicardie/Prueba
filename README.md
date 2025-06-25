# InviteU.digital - Invitaciones Digitales Elegantes

Una plataforma moderna para crear invitaciones digitales personalizadas con diseño responsivo y experiencia de usuario optimizada.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags completos y estructura semántica
- **Rendimiento**: Carga rápida con lazy loading y optimizaciones
- **Accesibilidad**: ARIA labels y navegación por teclado
- **Animaciones Suaves**: Efectos visuales modernos
- **Componentes Modulares**: Código organizado y reutilizable

## 📁 Estructura del Proyecto

\`\`\`
inviteu-digital/
├── index.html              # Página principal
├── css/
│   ├── normalize.css       # Reset CSS
│   ├── variables.css       # Variables CSS personalizadas
│   ├── base.css           # Estilos base y tipografía
│   ├── components.css     # Componentes UI
│   ├── layout.css         # Layout y secciones
│   └── responsive.css     # Media queries
├── js/
│   ├── utils.js          # Funciones utilitarias
│   ├── components.js     # Clases de componentes
│   └── main.js           # Lógica principal
├── assets/
│   ├── images/           # Imágenes del sitio
│   │   ├── hero/         # Imágenes del hero
│   │   ├── categories/   # Imágenes de categorías
│   │   └── newsletter/   # Imágenes del newsletter
│   └── icons/            # Iconos y favicon
│       ├── social/       # Iconos de redes sociales
│       ├── logo.svg      # Logo principal
│       └── favicon.ico   # Favicon
└── README.md             # Documentación
\`\`\`

## 🛠️ Instalación

1. **Descarga los archivos**
   \`\`\`bash
   # Descomprime el archivo ZIP descargado
   unzip inviteu-digital.zip
   cd inviteu-digital
   \`\`\`

2. **Configura un servidor local**
   \`\`\`bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   
   # Con PHP
   php -S localhost:8000
   \`\`\`

3. **Abre en el navegador**
   \`\`\`
   http://localhost:8000
   \`\`\`

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `css/variables.css`:

\`\`\`css
:root {
    --primary-color: #ec4899;    /* Rosa principal */
    --secondary-color: #a855f7;  /* Púrpura secundario */
    --accent-color: #f97316;     /* Color de acento */
}
\`\`\`

### Reemplazar Imágenes

1. **Logo**: Reemplaza `assets/icons/logo.png`
2. **Hero**: Reemplaza `assets/images/hero/hero-mockup.jpg`
3. **Categorías**: Reemplaza imágenes en `assets/images/categories/`

### Modificar Contenido

Edita el archivo `index.html` para cambiar:
- Textos y descripciones
- Precios de los planes
- Información de contacto
- Enlaces de redes sociales

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## ⚡ Optimizaciones

### Rendimiento
- **Lazy Loading**: Imágenes se cargan bajo demanda
- **Preload**: Recursos críticos se precargan
- **Modular CSS**: Archivos CSS organizados por función
- **Compresión**: Imágenes optimizadas

### SEO
- **Meta Tags**: Open Graph y Twitter Cards
- **Semántica**: HTML5 semántico
- **Structured Data**: Datos estructurados

### Accesibilidad
- **ARIA**: Labels y roles apropiados
- **Contraste**: Colores accesibles
- **Teclado**: Navegación completa
- **Screen Readers**: Compatibilidad total

## 🔧 Desarrollo

### Estructura CSS Modular

\`\`\`css
/* Orden de importación */
@import 'normalize.css';    /* Reset */
@import 'variables.css';    /* Variables */
@import 'base.css';         /* Base y tipografía */
@import 'components.css';   /* Componentes UI */
@import 'layout.css';       /* Layout y secciones */
@import 'responsive.css';   /* Media queries */
\`\`\`

### JavaScript Modular

\`\`\`javascript
// utils.js - Funciones utilitarias
// components.js - Clases de componentes
// main.js - Lógica principal de la aplicación
\`\`\`

### Componentes Disponibles

- **NotificationManager**: Sistema de notificaciones
- **AnimationObserver**: Observador de animaciones
- **LazyLoader**: Carga perezosa de imágenes

## 🚀 Despliegue

### Netlify
1. Arrastra la carpeta a [Netlify Drop](https://app.netlify.com/drop)
2. Configura dominio personalizado
3. Habilita HTTPS automático

### Vercel
\`\`\`bash
npx vercel --prod
\`\`\`

### GitHub Pages
1. Sube archivos a repositorio GitHub
2. Habilita GitHub Pages en configuración
3. Selecciona rama main como fuente

## 🐛 Solución de Problemas

### Imágenes no cargan
- Verifica rutas en `assets/images/`
- Asegúrate de usar servidor HTTP (no file://)

### Estilos no se aplican
- Verifica orden de importación CSS
- Comprueba rutas relativas

### JavaScript no funciona
- Abre DevTools para ver errores
- Verifica que todos los archivos JS estén cargados

## 📞 Soporte

Para soporte técnico:
- 📧 Email: soporte@inviteu.digital
- 💬 Chat: [Enlace al chat]
- 📚 Documentación: [Enlace a docs]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**InviteU.digital** - Creando invitaciones digitales elegantes desde 2024 ✨
