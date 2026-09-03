// Configuración comercial central de UESG.
// El número de WhatsApp debe estar en formato E.164 SIN "+", espacios ni guiones.
// Ejemplo Ecuador: 0969580879 -> 593969580879
const RAW_WHATSAPP_NUMBER =
  import.meta.env.VITE_UESG_WHATSAPP_NUMBER || '593969580879'

// Solo dígitos: elimina cualquier caracter no numérico por seguridad.
export const WHATSAPP_NUMBER = String(RAW_WHATSAPP_NUMBER).replace(/\D/g, '')

export const WHATSAPP_IS_CONFIGURED = WHATSAPP_NUMBER.length >= 8

// Aviso incluido en cada pedido: los datos comerciales aún no son oficiales.
export const ORDER_DISCLAIMER =
  'Disponibilidad, precio, forma de pago y entrega quedan por confirmar con el equipo UESG.'
