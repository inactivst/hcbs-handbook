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
  // back to the foreground, plus a slow backstop, and install the new worker quietly.
  // The RELOAD that swaps the running code is a separate decision.
  //
  // ⚠️ THE APP MUST NEVER RELOAD ITSELF WHERE THE USER CAN SEE IT, AND MUST NEVER ASK.
  // This used to reload the instant a new worker took control, whenever that was. Even
  // with history in localStorage, a page that blanks and restarts mid-conversation
  // reads as a crash - and this app's user is often part-way through a question about
  // their own rights, which is the worst possible moment to look unreliable. GuestBook
  // hit the same code path on 2026-07-27 and it was reported as the app glitching out.
  // Prompting instead was tried and rejected: an "update ready, tap to refresh" pill is
  // the same interruption with homework attached.
  //
  // So there is NO self-reload at all. A new worker installs quietly and the running
  // page keeps serving the code it booted with until the next cold start.
  //
  // ⚠️ A "RELOAD WHILE HIDDEN" IS NOT INVISIBLE, AND MUST NOT COME BACK. That was this
  // block until 7/28 - arm a 2s timer on `visibilitychange`, re-check visibility at fire
  // time, reload only if still hidden. The reasoning was that "hidden" means nobody is
  // looking, but hidden only means nobody is looking RIGHT NOW. A tab-away shorter than
  // iOS's JS suspend window fires the timer on time, the reload starts, iOS freezes the
  // webview partway through the new document - and the user comes back to a blank splash
  // and a cold restart, which is the very thing above. The visibility re-check cannot
  // help: at fire time the page genuinely IS hidden. GuestBook shipped this guard and
  // Kyle still hit the splash the next day; it came out of all three apps.
  //
  // (The Book and GuestBook additionally land a pending update on a pull-to-refresh,
  // the user's own "get me the current state" gesture - the one reload a user waits for,
  // because they asked for it. This app has no such gesture to hang it on; if one is
  // ever added, wire it up the same way - see their appUpdate.js.)
  const deferReload = () => {}   // update installed; nothing visible happens until a cold start
  registerSW({
    immediate: true,
    // Supplying onNeedReload is what suppresses vite-plugin-pwa's own unconditional
    // window.location.reload() in its `activated` handler (see node_modules/
    // vite-plugin-pwa/dist/client/build/register.js) - it is the only thing standing
    // between a fresh deploy and a reload in the user's face. A plain controllerchange
    // listener could not do it: the plugin's reload fires first.
    onNeedReload: deferReload,
    onRegisteredSW(_swUrl, r) {
      if (!r) return
      const check = () => { r.update().catch(() => {}) }
      // A 60s poll bought nothing but a near-certain mid-session takeover.
      setInterval(check, 30 * 60 * 1000)
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check() })
      window.addEventListener('focus', check)
    },
  })
  if ('serviceWorker' in navigator) {
    // Backstop for a worker that takes control without going through the plugin's
    // `activated` path. Never on the first install's initial claim, which would bounce
    // every brand-new visitor.
    const hadController = !!navigator.serviceWorker.controller
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hadController) deferReload()
    })
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
