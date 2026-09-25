import { engine } from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/**
 * One requestAnimationFrame for the whole site: GSAP's ticker drives ScrollTrigger, Lenis,
 * Anime.js and the R3F canvases (see useTickerAdvance). Motion (framer) keeps its own
 * batched loop for React layout animations.
 */
let configured = false

export const ensureMotionRuntime = () => {
  if (configured || typeof window === 'undefined') {
    return
  }

  configured = true
  gsap.registerPlugin(ScrollTrigger)
  // Lenis smooths the scroll; lag smoothing would make scrubbed timelines jump after a hitch.
  gsap.ticker.lagSmoothing(0)
  engine.useDefaultMainLoop = false
  gsap.ticker.add(() => engine.update())
}

export type TickCallback = (time: number, deltaTime: number) => void

export const addTick = (callback: TickCallback) => {
  ensureMotionRuntime()
  gsap.ticker.add(callback)
  return () => gsap.ticker.remove(callback)
}

/* ----- Smooth scroll ------------------------------------------------------ */

let lenis: Lenis | null = null

export const startSmoothScroll = () => {
  ensureMotionRuntime()

  if (lenis) {
    return () => {}
  }

  const instance = new Lenis({ lerp: 0.11, wheelMultiplier: 0.9, anchors: false })
  const tick = (time: number) => instance.raf(time * 1000)
  instance.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  lenis = instance

  return () => {
    gsap.ticker.remove(tick)
    instance.destroy()
    lenis = null
  }
}

const navOffset = () => -(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 72)

/** Scrolls to an element with Lenis when it runs, natively otherwise (reduced motion). */
export const scrollToTarget = (target: HTMLElement | number, immediate = false) => {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : navOffset(), immediate, duration: 1.4 })
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target })
  } else {
    target.scrollIntoView()
  }
}

/** Freezes the page behind modal layers (palette, fullscreen menu, intro). */
export const pauseScroll = () => {
  lenis?.stop()
  document.documentElement.dataset.scrollLock = 'on'
}

export const resumeScroll = () => {
  lenis?.start()
  delete document.documentElement.dataset.scrollLock
}
