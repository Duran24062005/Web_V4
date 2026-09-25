import { gsap } from 'gsap'

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

/**
 * Katakana noise that resolves, left to right, into `text` ("data reintegration").
 * Writes into `element.textContent`, so use it on an aria-hidden copy or restore the text
 * before assistive tech reads it (it always ends on the real string).
 */
export const scrambleText = (element: HTMLElement, text: string, { duration = 0.9, delay = 0 } = {}) => {
  const state = { progress: 0 }
  return gsap.to(state, {
    progress: 1,
    duration,
    delay,
    ease: 'none',
    onUpdate: () => {
      const settled = Math.floor(state.progress * text.length)
      element.textContent = text
        .split('')
        .map((letter, index) =>
          index < settled || letter === ' ' ? letter : KATAKANA[Math.floor(Math.random() * KATAKANA.length)],
        )
        .join('')
    },
    onComplete: () => {
      element.textContent = text
    },
  })
}
