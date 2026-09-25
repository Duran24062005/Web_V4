import { cva } from 'class-variance-authority'

/** Class recipe for DG-OS buttons; also usable on router links (`className={neonButton({ variant: 'ghost' })}`). */
export const neonButton = cva('yk-btn', {
  variants: {
    variant: {
      primary: 'yk-btn--primary',
      ghost: 'yk-btn--ghost',
      warn: 'yk-btn--warn',
    },
    size: {
      md: '',
      lg: 'yk-btn--lg',
      sm: 'yk-btn--sm',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})
