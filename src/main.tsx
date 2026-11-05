import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig, LazyMotion, domMax } from 'framer-motion'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
