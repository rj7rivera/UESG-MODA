import { useEffect, useEffectEvent, useState } from 'react'
import logo from '../../assets/IMAGENES/img/optimized/logo-blanco.webp'
import './PageLoader.css'

const PROGRESS_DURATION = 900
const PROGRESS_STEPS = 99
const COMPLETE_HOLD_DURATION = 180
const FADE_DURATION = 320

function ActivePageLoader({ onComplete }) {
  const [progress, setProgress] = useState(1)
  const [isExiting, setIsExiting] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const notifyComplete = useEffectEvent(() => {
    onComplete?.()
  })

  useEffect(() => {
    let holdTimeout
    let exitTimeout
    let currentProgress = 1
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const progressInterval = window.setInterval(() => {
      currentProgress = Math.min(currentProgress + 1, 100)
      setProgress(currentProgress)

      if (currentProgress === 100) {
        window.clearInterval(progressInterval)

        holdTimeout = window.setTimeout(() => {
          setIsExiting(true)

          exitTimeout = window.setTimeout(() => {
            setIsVisible(false)
            notifyComplete()
          }, reduceMotion ? 80 : FADE_DURATION)
        }, COMPLETE_HOLD_DURATION)
      }
    }, PROGRESS_DURATION / PROGRESS_STEPS)

    return () => {
      window.clearInterval(progressInterval)
      window.clearTimeout(holdTimeout)
      window.clearTimeout(exitTimeout)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return <LoaderOverlay progress={progress} isExiting={isExiting} />
}

function LoaderOverlay({ progress, isExiting = false }) {
  return (
    <div
      className={`page-loader${isExiting ? ' page-loader--exiting' : ''}`}
      role="progressbar"
      aria-label="Cargando contenido"
      aria-valuemin="1"
      aria-valuemax="100"
      aria-valuenow={progress}
      aria-valuetext={`${progress}%`}
      aria-busy="true"
    >
      <div className="page-loader__logo-container" aria-hidden="true">
        <img className="page-loader__logo" src={logo} alt="" />
      </div>

      <span className="page-loader__progress" aria-hidden="true">
        {progress}%
      </span>
      <span className="page-loader__label" aria-hidden="true">
        <span className="page-loader__label-text">CARGANDO</span>
        <span className="page-loader__dots">
          <span className="page-loader__dot page-loader__dot--1">.</span>
          <span className="page-loader__dot page-loader__dot--2">.</span>
          <span className="page-loader__dot page-loader__dot--3">.</span>
        </span>
      </span>
    </div>
  )
}

function PageLoader({ active = true, onComplete }) {
  return active ? <ActivePageLoader onComplete={onComplete} /> : null
}

export default PageLoader
