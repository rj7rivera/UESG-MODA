import {
  WHATSAPP_IS_CONFIGURED,
  WHATSAPP_NUMBER,
} from '../config/commerce.js'

export function buildWhatsAppContactMessage(details = {}) {
  const name = details.name?.trim()
  const email = details.email?.trim()
  const subject = details.subject?.trim()
  const message = details.message?.trim()
  const lines = ['Hola UESG, quiero comunicarme con ustedes.']

  if (name || email || subject || message) lines.push('')
  if (name) lines.push(`Nombre: ${name}`)
  if (email) lines.push(`Correo: ${email}`)
  if (subject) lines.push(`Asunto: ${subject}`)
  if (message) lines.push('', 'Mensaje:', message)

  return lines.join('\n')
}

export function buildWhatsAppContactUrl(details) {
  if (!WHATSAPP_IS_CONFIGURED) return null

  const message = buildWhatsAppContactMessage(details)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
