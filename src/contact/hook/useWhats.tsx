import type { Language } from '../../i18n/config'

export default function handleWhatsAppContact(language: Language = 'es') {
  const message = encodeURIComponent(
    language === 'es'
      ? '¡Hola! Me interesa conocer más sobre tus servicios web. ¿Podrías compartirme más información?'
      : 'Hi! I am interested in learning more about your web services. Could you share more information?',
  )
  const phoneNumber = '+573216123545'
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}
