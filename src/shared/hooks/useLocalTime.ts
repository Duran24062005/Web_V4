import { useCallback } from 'react'
import { useClientValue } from './useClientValue'

const subscribeEvery30s = (onChange: () => void) => {
  const interval = window.setInterval(onChange, 30_000)
  return () => window.clearInterval(interval)
}

/** Current wall-clock time (HH:MM) in `timeZone`. Prerendered as `--:--`, filled in on the client. */
export const useLocalTime = (timeZone: string, locale: string) => {
  const getTime = useCallback(
    () =>
      new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(
        new Date(),
      ),
    [timeZone, locale],
  )

  return useClientValue(getTime, '--:--', subscribeEvery30s)
}
