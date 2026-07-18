import React from 'react'
import ReactDOM from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import App from './App.jsx'

// Native shell only: draw under the status bar (edge-to-edge) and use DARK status
// icons, since RightsBook's background is the light greige/cream. The app already
// pads for the notch via env(safe-area-inset-*) in index.html + the header.
// ⚠️ StatusBar is STATICALLY imported (top of file) — never lazy import() a native
// plugin; the dynamic chunk never resolves in the WKWebView and hangs. On web these
// calls are guarded away. Style.Light = dark content (for a light background).
// See [[capacitor-edge-to-edge-cream]].
if (Capacitor?.isNativePlatform?.()) {
  StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {})
  StatusBar.setStyle({ style: Style.Light }).catch(() => {})
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
