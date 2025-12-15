# Portfolio React - Instrucciones de Instalación

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🚀 Instalación

### 1. Crear el proyecto React

```bash
npx create-react-app mi-portfolio
cd mi-portfolio
```

### 2. Instalar Bootstrap (para grid y utilidades)

```bash
npm install bootstrap
```

### 3. Estructura de archivos

Tu proyecto debe tener la siguiente estructura:

```
mi-portfolio/
├── public/
│   └── assets/
│       └── img/
│           ├── hero-bg.jpg
│           ├── my-profile-img.jpg
│           └── portfolio/
│               ├── app-1.jpg
│               ├── product-1.jpg
│               ├── branding-1.jpg
│               ├── books-1.jpg
│               └── ... (más imágenes)
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```

### 4. Reemplazar archivos

1. Reemplaza el contenido de `src/App.js` con el código del primer artifact
2. Reemplaza el contenido de `src/App.css` con el código del segundo artifact

### 5. Actualizar src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 6. Agregar las imágenes

Copia todas las imágenes del template original a la carpeta `public/assets/img/`:

- hero-bg.jpg (imagen de fondo del hero)
- my-profile-img.jpg (tu foto de perfil)
- Carpeta portfolio con todas las imágenes de proyectos

## 🎨 Personalización

### Cambiar tu información personal

En `App.js`, busca y modifica:

1. **Nombre**: Busca "Alex Smith" y reemplázalo con tu nombre
2. **Título**: Busca "Designer, Developer, Freelancer" y personalízalo
3. **Información de contacto**: En el componente `About` y `Contact`
4. **Redes sociales**: En el componente `Header`, actualiza los enlaces

### Agregar tus proyectos

En el componente `Portfolio`, modifica el array `portfolioItems`:

```javascript
const portfolioItems = [
  {
    img: "/assets/img/portfolio/tu-proyecto.jpg",
    title: "Tu Proyecto",
    category: "app",
  },
  // Agrega más proyectos aquí
];
```

### Modificar skills

En el componente `Skills`, actualiza el array `skills`:

```javascript
const skills = [
  { name: "React", value: 95 },
  { name: "JavaScript", value: 90 },
  // Agrega más habilidades aquí
];
```

### Cambiar servicios

En el componente `Services`, modifica el array `services`:

```javascript
const services = [
  {
    icon: "bi-code-slash",
    title: "Desarrollo Web",
    description: "Tu descripción aquí",
  },
  // Agrega más servicios aquí
];
```

## 🎯 Características Implementadas

✅ Header responsive con menú hamburguesa
✅ Navegación sticky con scroll spy
✅ Sección Hero con imagen de fondo
✅ Sección About con información personal
✅ Skills con barras de progreso animadas
✅ Resume/CV con experiencia y educación
✅ Portfolio con filtros por categoría
✅ Servicios con iconos
✅ Formulario de contacto funcional (requiere backend)
✅ Footer con copyright
✅ Botón scroll to top
✅ Totalmente responsive

## 🔧 Mejoras Futuras Sugeridas

1. **Backend para formulario de contacto**:

   - Implementar con Node.js/Express
   - O usar servicios como EmailJS, Formspree

2. **Animaciones**:

   - Instalar `react-aos` para animaciones on scroll
   - Agregar Framer Motion para transiciones

3. **Routing**:

   - Implementar React Router para páginas separadas
   - Crear páginas de detalle para proyectos

4. **Estado global**:

   - Usar Context API o Redux para manejo de estado

5. **Optimización de imágenes**:

   - Implementar lazy loading
   - Usar WebP format

6. **SEO**:
   - Agregar React Helmet para meta tags
   - Implementar sitemap

## 📱 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm start

# Crear build de producción
npm run build

# Ejecutar tests
npm test
```

## 🐛 Solución de Problemas Comunes

### Las imágenes no se cargan

- Verifica que las imágenes estén en `public/assets/img/`
- Los paths deben comenzar con `/assets/img/`

### Los estilos no se aplican

- Asegúrate de importar `App.css` en `App.js`
- Verifica que Bootstrap esté instalado e importado en `index.js`

### Los iconos no aparecen

- Los iconos de Bootstrap Icons se cargan desde CDN en el CSS
- Verifica tu conexión a internet

## 📄 Licencia

Template original: iPortfolio por BootstrapMade
Conversión a React: Personalizada

## 🤝 Contribuciones

Siéntete libre de hacer fork y mejorar este proyecto!

---

¿Necesitas ayuda? Revisa la documentación de React en [reactjs.org](https://reactjs.org/)
