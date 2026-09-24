import { useCallback, useEffect, useRef, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'error'

export const copyText = async (text: string) => {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API unavailable')
  }

  await navigator.clipboard.writeText(text)
}

export const useCopyToClipboard = (resetAfterMs = 2500) => {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timeout = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timeout.current), [])

  const copy = useCallback(
    async (text: string) => {
      window.clearTimeout(timeout.current)

      try {
        await copyText(text)
        setStatus('copied')
      } catch {
        setStatus('error')
      }

      timeout.current = window.setTimeout(() => setStatus('idle'), resetAfterMs)
    },
    [resetAfterMs],
  )

  return { status, copy }
}
