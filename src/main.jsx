import ReactDOM from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'

const IS_NATIVE = !!Capacitor?.isNativePlatform?.()

// Service worker policy, mirroring GuestBook and The Book:
//   WEB    - register, for offline rights content and install-to-home-screen.
//   NATIVE - do NOT register. Inside the Capacitor webview a SW caches assets in
//            persistent storage and keeps serving STALE code across Xcode
//            reinstalls, which is the "I shipped the fix and it never showed up"
//            bug. The assets are already on disk in the app bundle, so a SW buys
//            nothing there. Also purge anything an earlier build left behind.
if (IS_NATIVE) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => r.unregister())).catch(() => {})
  }
  if (window.caches?.keys) {
    caches.keys().then((ks) => ks.forEach((k) => caches.delete(k))).catch(() => {})
  }
  // Native shell only: draw under the status bar (edge-to-edge) and use DARK status
  // icons, since RightsBook's background is the light greige/cream. The app already
  // pads for the notch via env(safe-area-inset-*) in index.html + the header.
  // ⚠️ StatusBar is STATICALLY imported (top of file) — never lazy import() a native
  // plugin; the dynamic chunk never resolves in the WKWebView and hangs. On web these
  // calls are guarded away. Style.Light = dark content (for a light background).
  // See [[capacitor-edge-to-edge-cream]].
  StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {})
  StatusBar.setStyle({ style: Style.Light }).catch(() => {})
} else {
  // autoUpdate installs a new worker, but an app that is ALREADY OPEN (especially an
  // iOS home-screen PWA, which only checks on cold launch) keeps serving the cached
  // old code until it is relaunched. So: check for an update whenever the app comes
  // back to the foreground, plus a slow backstop, and reload once when a genuinely
  // NEW worker takes control. Chat history is written to localStorage on change and
  // vault records live in the cloud, so the reload never costs anyone data.
  registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, r) {
      if (!r) return
      const check = () => { r.update().catch(() => {}) }
      setInterval(check, 60 * 1000)
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check() })
      window.addEventListener('focus', check)
    },
  })
  if ('serviceWorker' in navigator) {
    // Reload only on a REAL update - a controller already existed. Reloading on the
    // first install's initial claim would bounce every brand-new visitor, and the
    // `reloaded` latch stops any chance of a loop.
    const hadController = !!navigator.serviceWorker.controller
    let reloaded = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloaded) return
      reloaded = true
      window.location.reload()
    })
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
