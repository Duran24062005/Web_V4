import { Toaster } from 'sonner'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App'

/** Everything rendered inside the router; shared by the client entry and the prerenderer. */
export const AppShell = () => (
  <>
    <App />
    <Toaster theme="dark" position="bottom-right" />
    <SpeedInsights />
  </>
)
