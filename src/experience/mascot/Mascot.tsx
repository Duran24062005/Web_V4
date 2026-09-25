import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../../shared/hooks/useReducedMotion'
import { cn } from '../../lib/utils'
import { ensureMotionRuntime } from '../motion/runtime'

/**
 * DG-01, the site's original mascot: a chibi android with a split visor, anime eyes, a DG
 * patch and a neon scarf. Decorative (aria-hidden). Eyes follow the cursor, it blinks, and the
 * right arm waves while `waving` is on. Everything stops under reduced motion.
 */
export const Mascot = ({ className, waving = true }: { className?: string; waving?: boolean }) => {
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const svg = ref.current
    if (!svg || reduced) {
      return
    }

    ensureMotionRuntime()
    const context = gsap.context(() => {
      const eyes = svg.querySelector<SVGGElement>('.dg-eyes')!
      const lookX = gsap.quickTo(eyes, 'x', { duration: 0.35, ease: 'power3.out' })
      const lookY = gsap.quickTo(eyes, 'y', { duration: 0.35, ease: 'power3.out' })

      const onMove = (event: PointerEvent) => {
        const box = svg.getBoundingClientRect()
        const dx = event.clientX - (box.left + box.width / 2)
        const dy = event.clientY - (box.top + box.height * 0.35)
        const distance = Math.hypot(dx, dy) || 1
        lookX((dx / distance) * Math.min(5, distance / 40))
        lookY((dy / distance) * Math.min(3.5, distance / 50))
      }
      window.addEventListener('pointermove', onMove, { passive: true })

      gsap
        .timeline({ repeat: -1, repeatDelay: 3.4 })
        .to('.dg-eye', { scaleY: 0.08, duration: 0.07, transformOrigin: '50% 50%', ease: 'power2.in' })
        .to('.dg-eye', { scaleY: 1, duration: 0.1, ease: 'power2.out' })

      gsap.to('.dg-antenna-tip', { opacity: 0.35, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.dg-scarf', { rotation: 6, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '0% 50%' })
      gsap.to('.dg-body', { y: -3, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })

      if (waving) {
        gsap.fromTo(
          '.dg-arm-wave',
          { rotation: -8 },
          { rotation: 18, duration: 0.32, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '0% 100%' },
        )
      }

      return () => window.removeEventListener('pointermove', onMove)
    }, svg)

    return () => context.revert()
  }, [reduced, waving])

  return (
    <svg
      ref={ref}
      className={cn('dg-mascot', className)}
      viewBox="0 0 220 260"
      aria-hidden="true"
      focusable="false"
      data-mascot
    >
      <defs>
        <linearGradient id="dg-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0c0a1a" />
          <stop offset="1" stopColor="#1c1838" />
        </linearGradient>
        <linearGradient id="dg-scarf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff2bd6" />
          <stop offset="1" stopColor="#7b2ff7" />
        </linearGradient>
        <filter id="dg-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="110" cy="248" rx="58" ry="7" fill="#00f0ff" opacity="0.18" />

      <g className="dg-body">
        {/* Scarf trailing to the right, anime style. */}
        <path
          className="dg-scarf"
          d="M140 142 C170 138 188 150 206 140 C198 156 184 162 168 160 C182 170 190 182 204 186 C180 190 160 176 146 160 Z"
          fill="url(#dg-scarf)"
          opacity="0.9"
        />

        {/* Legs */}
        <rect x="84" y="214" width="18" height="30" rx="8" fill="#131029" stroke="#7b2ff7" strokeWidth="2" />
        <rect x="118" y="214" width="18" height="30" rx="8" fill="#131029" stroke="#7b2ff7" strokeWidth="2" />

        {/* Hoodie torso */}
        <path d="M70 146 Q110 132 150 146 L160 218 Q110 228 60 218 Z" fill="#131029" stroke="#7b2ff7" strokeWidth="2.5" />
        <path d="M92 146 L110 170 L128 146" fill="none" stroke="#00f0ff" strokeWidth="2" opacity="0.7" />
        <rect x="96" y="184" width="28" height="18" rx="3" fill="#07060f" stroke="#ff2bd6" strokeWidth="1.5" />
        <text x="110" y="197" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#ff2bd6">
          DG
        </text>

        {/* Left arm at rest */}
        <rect x="52" y="152" width="16" height="50" rx="8" fill="#131029" stroke="#7b2ff7" strokeWidth="2" transform="rotate(12 60 156)" />

        {/* Right arm waving (pivot at the shoulder) */}
        <g className="dg-arm-wave" transform="translate(152 150)">
          <rect x="0" y="-50" width="16" height="52" rx="8" fill="#131029" stroke="#7b2ff7" strokeWidth="2" />
          <circle cx="8" cy="-54" r="10" fill="#1c1838" stroke="#00f0ff" strokeWidth="2" />
        </g>

        {/* Head */}
        <line x1="110" y1="34" x2="110" y2="12" stroke="#7b2ff7" strokeWidth="3" strokeLinecap="round" />
        <circle className="dg-antenna-tip" cx="110" cy="10" r="6" fill="#ff2bd6" filter="url(#dg-glow)" />
        <circle cx="46" cy="90" r="13" fill="#7b2ff7" stroke="#00f0ff" strokeWidth="2" />
        <circle cx="174" cy="90" r="13" fill="#7b2ff7" stroke="#00f0ff" strokeWidth="2" />
        <rect x="44" y="32" width="132" height="110" rx="46" fill="#1c1838" stroke="#00f0ff" strokeWidth="2.5" />

        {/* Split visor */}
        <rect x="58" y="60" width="104" height="52" rx="24" fill="url(#dg-visor)" stroke="rgba(0,240,255,0.55)" strokeWidth="2" />
        <g className="dg-eyes" filter="url(#dg-glow)">
          <g className="dg-eye">
            <ellipse cx="88" cy="86" rx="10" ry="14" fill="#00f0ff" />
            <circle cx="84" cy="80" r="3.6" fill="#ffffff" />
            <circle cx="91" cy="92" r="1.8" fill="#ffffff" opacity="0.8" />
          </g>
          <g className="dg-eye">
            <ellipse cx="132" cy="86" rx="10" ry="14" fill="#00f0ff" />
            <circle cx="128" cy="80" r="3.6" fill="#ffffff" />
            <circle cx="135" cy="92" r="1.8" fill="#ffffff" opacity="0.8" />
          </g>
        </g>
        <line x1="64" y1="108" x2="156" y2="64" stroke="#ff2bd6" strokeWidth="1.5" opacity="0.55" />
        <ellipse cx="74" cy="106" rx="7" ry="3.5" fill="#ff2bd6" opacity="0.55" />
        <ellipse cx="146" cy="106" rx="7" ry="3.5" fill="#ff2bd6" opacity="0.55" />
        <path d="M100 124 q5 5 10 0 q5 5 10 0" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}
