import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)))

export default defineConfig({
  // Bake the version + build time in so Settings can show which code is actually
  // running. With a service worker and a Capacitor bundle both able to serve stale
  // assets, "am I on the new build?" is a question that needs a real answer rather
  // than a guess. Keep package.json's version in step with the Xcode marketing
  // version, or this line will confidently report the wrong one.
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __APP_BUILD__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    react(),
    // Offline + install, mirroring GuestBook's setup. This one earns its keep on
    // mission grounds, not just speed: the rights content, the self-checks and the
    // printable letters are all bundled and deterministic, so with a warm cache the
    // whole reference side of the app keeps working in a group home with bad wifi.
    //
    // `manifest: false` - RightsBook already ships public/manifest.webmanifest and
    // index.html links it; regenerating one here would leave two competing manifests.
    // `injectRegister: null` - registration is hand-written in src/main.jsx so the
    // NATIVE build can opt out (a SW inside the Capacitor webview serves stale code
    // across Xcode reinstalls - the "my fix never showed up" trap).
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      injectRegister: null,
      workbox: {
        // App shell only. Deliberately NOT '**/*.png' (which GuestBook uses): the big
        // PNGs here are platform assets, not runtime ones - icon-512 (443 KB) is read
        // by the OS at install, og-image (387 KB) only by link-preview crawlers.
        // Precaching them made every first visit pay ~950 KB for images the app never
        // renders. favicon is listed by hand because the browser tab does want it.
        // (Those two files are also just fat for their dimensions; a proper pngquant
        // pass would cut ~80% with no visible loss. Lossless recompression only buys
        // 7-10%, and palette-quantizing them here banded the gradients, so they are
        // left untouched rather than degraded.)
        globPatterns: ['**/*.{js,css,html,woff2}', 'favicon.png'],
        // /privacy.html is a real page, not a SPA route - don't let the navigation
        // fallback swallow it and serve the app shell instead.
        navigateFallbackDenylist: [/^\/privacy/],
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Split the bundle along the lines that change at DIFFERENT rates, so a
        // routine copy or layout edit stops invalidating the ~230 KB of reference
        // data and vendor code that did not change.
        //
        // These are STATIC chunks (plain ES imports the entry pulls in eagerly), not
        // dynamic import(). Total first-load bytes are unchanged - the win is on
        // every visit after the first, and after every deploy. Dynamic import() would
        // cut first load too, but this project has device-proven evidence that a
        // dynamic-import chunk never resolves inside the native WKWebView (see the
        // warning at the top of src/purchases.js), so it is off the table here.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.includes('@supabase') ? 'supabase' : 'vendor'
          }
          if (id.includes('_corpus')) return 'corpus'  // 51 state packs + the federal base
          if (id.includes('stateGuide') || id.includes('regionalCenters') || id.includes('glossary')) return 'statedata'
          if (id.includes('i18n')) return 'i18n'       // en/es/tl strings
          return undefined                             // app code
        },
      },
    },
  },
})
