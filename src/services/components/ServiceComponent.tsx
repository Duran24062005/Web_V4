import { Code, Database, Layout, Smartphone, Search, Zap, ShoppingCart } from 'lucide-react';

export const ServiceComponent = () => {
    const services = [
        {
          icon: <Layout className="w-12 h-12" />,
          title: "Diseño de Interfaces UI/UX",
          description: "Interfaces modernas, intuitivas y responsive que cautivan a tus usuarios y mejoran la experiencia.",
          features: [
            "Diseño responsive para todos los dispositivos",
            "Prototipado con Figma",
            "Optimización de experiencia de usuario",
            "Animaciones y micro-interacciones"
          ],
          color: "from-purple-500 to-pink-600"
        },
        {
          icon: <Code className="w-12 h-12" />,
          title: "Desarrollo Frontend",
          description: "Aplicaciones web modernas con las últimas tecnologías y mejores prácticas de desarrollo.",
          features: [
            "React, TypeScript, Tailwind CSS",
            "Single Page Applications (SPA)",
            "Progressive Web Apps (PWA)",
            "Optimización de rendimiento"
          ],
          color: "from-blue-500 to-cyan-600"
        },
        {
          icon: <Database className="w-12 h-12" />,
          title: "Desarrollo Backend",
          description: "APIs robustas y escalables para dar vida a tus aplicaciones con Node.js, Python y Laravel.",
          features: [
            "APIs RESTful con Node.js/Express",
            "FastAPI con Python",
            "Laravel para PHP",
            "Integración con bases de datos"
          ],
          color: "from-green-500 to-emerald-600"
        },
        {
          icon: <Database className="w-12 h-12" />,
          title: "Diseño y Optimización de BD",
          description: "Arquitecturas de datos eficientes que garantizan rendimiento y escalabilidad óptimos.",
          features: [
            "Modelado de datos SQL y NoSQL",
            "Optimización de consultas",
            "MongoDB, PostgreSQL, MySQL",
            "Migraciones y respaldos"
          ],
          color: "from-orange-500 to-red-600"
        },
        {
          icon: <Smartphone className="w-12 h-12" />,
          title: "Aplicaciones Móviles",
          description: "Apps móviles multiplataforma con React Native para iOS y Android.",
          features: [
            "Desarrollo con React Native",
            "Diseño nativo para iOS y Android",
            "Integración con APIs",
            "Publicación en stores"
          ],
          color: "from-violet-500 to-purple-600"
        },
        {
          icon: <Search className="w-12 h-12" />,
          title: "SEO y Optimización",
          description: "Mejora tu visibilidad en buscadores y el rendimiento de tu sitio web.",
          features: [
            "Optimización on-page y técnica",
            "Mejora de velocidad de carga",
            "Análisis de palabras clave",
            "Reportes y seguimiento"
          ],
          color: "from-yellow-500 to-orange-600"
        },
        {
          icon: <Zap className="w-12 h-12" />,
          title: "Mantenimiento y Soporte",
          description: "Mantén tus aplicaciones actualizadas, seguras y funcionando perfectamente.",
          features: [
            "Actualizaciones de seguridad",
            "Corrección de bugs",
            "Nuevas funcionalidades",
            "Soporte técnico continuo"
          ],
          color: "from-indigo-500 to-blue-600"
        },
        {
          icon: <ShoppingCart className="w-12 h-12" />,
          title: "E-commerce",
          description: "Tiendas online completas y personalizadas para impulsar tus ventas.",
          features: [
            "Integración con pasarelas de pago",
            "Gestión de inventario",
            "Panel de administración",
            "Sistema de pedidos y envíos"
          ],
          color: "from-pink-500 to-rose-600"
        }
      ];
  return (
    <div className="min-h-screen bg-black text-white py-20 z-20 relative">
      <section className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Mis Servicios</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones tecnológicas completas para llevar tu proyecto al siguiente nivel. 
            Desde el diseño hasta el despliegue, cuento con la experiencia para hacer realidad tus ideas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-800 hover:border-purple-500/50"
            >
              {/* Icon with gradient background */}
              <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${service.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mb-6">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <svg className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12 text-center border border-purple-500/30">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Cuéntame sobre tu idea y trabajemos juntos para convertirla en realidad. 
            Ofrezco consultas gratuitas para evaluar tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              Contactar ahora
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              Ver proyectos
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">2+</div>
            <div className="text-gray-400">Años de experiencia</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">30+</div>
            <div className="text-gray-400">Proyectos completados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">100%</div>
            <div className="text-gray-400">Clientes satisfechos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-gray-400">Soporte disponible</div>
          </div>
        </div>
      </section>
    </div>
  )
}
