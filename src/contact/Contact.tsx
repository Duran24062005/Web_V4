import { Mail, MessageSquare, Send, User } from "lucide-react"
import { navBarItems } from "../mock/data/navBarItems"
import { Footer } from "../shared/components/Footer"
import { NavBar } from "../shared/components/NavBar"
import handleWhatsAppContact from "./hook/useWhats"

export const Contact = () => {
    
  return (
    <>
    <NavBar items={navBarItems} />
   <section id="contact" className="py-6 mb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Hablemos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente? Envíame un mensaje y conversemos sobre cómo puedo ayudarte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="border border-purple-800 bg-card/50 backdrop-blur rounded-lg">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Email</h4>
                          <p className="text-violet-400">alexisdurangomez588@gmail.com</p>
                          <p className="text-sm text-muted-foreground">Respondo en 24-48 horas</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-purple-800 bg-card/50 backdrop-blur rounded-lg">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-green-500/10">
                          <MessageSquare className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">WhatsApp</h4>
                          <p className="text-sm text-muted-foreground mb-3">Respuesta rápida y directa</p>
                          <button
                            onClick={handleWhatsAppContact}
                            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition-colors"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Abrir WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="border border-purple-800 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur rounded-lg">
                  <div className="p-8">
                    <h4 className="text-lg font-semibold mb-2">¿Prefieres otro medio?</h4>
                    <p className="text-sm text-muted-foreground">
                      También puedes encontrarme en redes sociales o agendar una videollamada para discutir tu proyecto
                      en detalle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-purple-800 shadow-xl rounded-lg bg-card">
              <div className="p-8">
                <form id="contact-form" className="space-y-6">
                  <div className="mb-6 flex justify-center">
                    <p
                      className="text-sm text-green-600 dark:text-green-400 px-4 py-2 bg-green-50 dark:bg-green-950/30 rounded-lg"
                      id="success"
                    >Formulario de Email</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="from_name" className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      placeholder="Tu nombre"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tu@email.com"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Cuéntame sobre tu proyecto..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-800 inline-flex items-center justify-center rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 w-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    Al enviar este formulario, aceptas que me ponga en contacto contigo.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
        <Footer />
    </>
  )
}
