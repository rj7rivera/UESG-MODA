import { useState } from 'react'
import { WHATSAPP_IS_CONFIGURED } from '../../config/commerce.js'
import { buildWhatsAppContactUrl } from '../../utils/whatsappContact.js'
import './ContactForm.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(values) {
  const errors = {}

  if (!values.name) errors.name = 'Escribe tu nombre.'
  if (!values.email) {
    errors.email = 'Escribe tu correo.'
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Escribe un correo válido.'
  }
  if (!values.subject) errors.subject = 'Escribe el asunto.'
  if (!values.message) errors.message = 'Escribe tu mensaje.'

  return errors
}

function ContactForm() {
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  function handleChange(event) {
    const fieldName = event.target.name
    if (!errors[fieldName]) return

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: '',
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setFormError('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const values = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      subject: String(formData.get('subject') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    }
    const nextErrors = validateForm(values)
    const firstInvalidField = Object.keys(nextErrors)[0]

    if (firstInvalidField) {
      setErrors(nextErrors)
      window.requestAnimationFrame(() => form.elements[firstInvalidField]?.focus())
      return
    }

    setErrors({})
    const whatsappUrl = buildWhatsAppContactUrl(values)

    if (!whatsappUrl) {
      setFormError('El canal de WhatsApp no está disponible en este momento.')
      return
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="contact-form" aria-labelledby="contact-form-title">
      <div className="contact-form__heading">
        <p>Formulario / WhatsApp</p>
        <h2 id="contact-form-title">Escríbenos</h2>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-describedby="contact-form-note">
        <div className="contact-form__field">
          <label htmlFor="contact-name">Nombre</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength="80"
            required
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            onChange={handleChange}
          />
          {errors.name ? <p id="contact-name-error">{errors.name}</p> : null}
        </div>

        <div className="contact-form__field">
          <label htmlFor="contact-email">Correo</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength="254"
            required
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            onChange={handleChange}
          />
          {errors.email ? <p id="contact-email-error">{errors.email}</p> : null}
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contact-subject">Asunto</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            maxLength="120"
            required
            aria-invalid={errors.subject ? 'true' : undefined}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            onChange={handleChange}
          />
          {errors.subject ? <p id="contact-subject-error">{errors.subject}</p> : null}
        </div>

        <div className="contact-form__field contact-form__field--wide">
          <label htmlFor="contact-message">Mensaje</label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            maxLength="1000"
            required
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            onChange={handleChange}
          />
          {errors.message ? <p id="contact-message-error">{errors.message}</p> : null}
        </div>

        <div className="contact-form__actions contact-form__field--wide">
          <p id="contact-form-note">
            {WHATSAPP_IS_CONFIGURED
              ? 'Al continuar, WhatsApp abrirá tu mensaje para que puedas revisarlo y enviarlo.'
              : 'WhatsApp no está disponible en este momento. Puedes usar los datos de contacto de esta página.'}
          </p>
          <button
            type="submit"
            disabled={!WHATSAPP_IS_CONFIGURED}
            aria-describedby="contact-form-note"
          >
            <span>Continuar en WhatsApp</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <p className="contact-form__status" role="alert" aria-live="assertive">
          {formError}
        </p>
      </form>
    </section>
  )
}

export default ContactForm
