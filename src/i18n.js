// ─── LANGUAGES ─────────────────────────────────────────────────────────────────
// UI strings live here; the model is instructed (api/chat.js) to ANSWER in the
// chosen language too. The rights corpus itself stays English - answers are the
// translated surface. Add a language: extend STRINGS + LANG_OPTIONS; every t()
// falls back to English for any key a translation misses, so a partial pack
// never renders blank UI.
import { createContext, useContext } from 'react'

export const LANG_KEY = 'handbook.lang.v1'

export const LANG_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
]

// Model-facing names for the answer-language instruction.
export const LANG_NAMES = { en: 'English', es: 'Spanish' }

const STRINGS = {
  en: {
    tagline: 'Your HCBS rights, in plain language',
    disclaimer: "General information, not legal advice. Your saved history stays on this device only. Please don't include names or other personal details.",
    accountSynced: 'Account (synced)',
    cloudSync: 'Cloud sync',
    settings: 'Settings',
    navAsk: 'Ask',
    navHistory: 'History',
    navRights: 'Rights',
    answeringFor: 'Answering for',
    state: 'State',
    federalOnly: 'federal rules only',
    tryAsking: 'Try asking:',
    starter1: 'Can my group home lock the fridge?',
    starter2: 'Do I have a right to visitors at any time?',
    starter3: 'What is service code 510?',
    starter4: 'How do I appeal a regional center decision?',
    starter5: 'Can I choose my own roommate?',
    lookingUp: 'Looking that up…',
    composerPlaceholder: 'Ask about your rights…',
    ask: 'Ask',
    errGeneric: 'Something went wrong. Please try again.',
    errCompare: 'Could not compare right now. Please try again.',
    compareSelect: "See another state's take…",
    compareAria: 'Compare with another state',
    comparing: 'Comparing…',
    compareEmpty: 'Other states currently follow the same federal baseline. State-to-state comparisons will appear here as state guides are added.',
    savedQuestions: 'Saved questions',
    historyEmpty: 'Your questions are saved here so you can come back to an answer later. Ask something in the Ask tab to get started.',
    conversation: 'Conversation',
    question1: 'question',
    questionN: 'questions',
    delete: 'Delete',
    deleteConversation: 'Delete conversation',
    swipeHint: 'Swipe a question left to delete it. ',
    historyFooter: 'Saved on this device only. The {n} most recent conversations are kept.',
    justNow: 'Just now',
    minAgo: '{n} min ago',
    hrAgo: '{n} hr ago',
    dayAgo: '{n} day ago',
    daysAgo: '{n} days ago',
    yourState: 'Your state',
    caFootnote: 'Partial service-code list. The full crosswalk is published by the CA Department of Developmental Services at dds.ca.gov. Free advocacy help: OCRA at Disability Rights California, 1-800-390-7032.',
    federalRights: 'Federal rights (all states)',
    federalSub: 'The federal HCBS Settings Rule applies in every state and is the floor your state builds on.',
    otherStates: 'Other states',
    otherStatesSub: 'Tap a state to see what HandBook has for it. Every state gets the federal rights above; state-specific guides are added as the team vets them.',
    stateGuide: 'State guide',
    commonServiceCodes: 'Common service codes',
    statePackMissing: "{name}-specific rules aren't loaded yet. The federal HCBS rights below apply in {name} too, and answers for {name} use that federal baseline. For state specifics, contact {name}'s Medicaid or developmental-disabilities agency, or your local Protection and Advocacy office (find yours at ndrn.org).",
    language: 'Language',
    noSaved: 'No saved questions on this device.',
    savedCount1: '{n} conversation saved on this device.',
    savedCountN: '{n} conversations saved on this device.',
    tapAgainDelete: 'Tap again to delete everything',
    deleteAll: 'Delete all saved questions',
    about: 'About',
    aboutBody1: "HandBook explains Home and Community-Based Services (HCBS) rights in plain language, grounded in the federal Settings Rule and California's Lanterman Act. It offers general information, not legal advice.",
    aboutBody2: "Questions you ask are answered by an AI model and are not stored on any HandBook server. Saved history lives only on this device. Please don't include names or other personal details.",
    aboutBody3: 'Free advocacy help: OCRA at Disability Rights California, 1-800-390-7032 · dds.ca.gov',
    whereLive: 'Where do you live?',
    whereLiveBody: 'HCBS rights start with the same federal rules everywhere, but each state runs its own program. Pick your state so answers fit where you live. You can change it anytime.',
    chooseState: 'Choose your state…',
    continue: 'Continue',
    skipUseCA: 'Skip - use California',
    account: 'Account',
    notConnected: 'Not connected',
    offBody1: 'HandBook works fully on this device without an account - nothing you do here requires one.',
    offBody2: 'Optional accounts are coming soon. Signing in will keep your saved questions indefinitely across devices - and everything stays private to you.',
    signInBody: 'Sign in to keep your saved questions indefinitely and across devices. Everything is end-to-end encrypted - private to you.',
    signInSub: 'HandBook works fully without an account; this only adds cloud history.',
    email: 'Email',
    sending: 'Sending…',
    emailMeCode: 'Email me a code',
    codeSentBody: 'We emailed a code to {email}. Enter it below.',
    code: 'Code',
    verifying: 'Verifying…',
    verify: 'Verify',
    useDifferentEmail: 'Use a different email',
    pinSetupTitle: 'Create a PIN',
    pinSetupSub: 'This 4-digit PIN encrypts your history. Only you can unlock it - we can never read it, so keep it somewhere safe.',
    pinSetupCta: 'Set PIN',
    pinUnlockTitle: 'Enter your PIN',
    pinUnlockSub: 'Unlock your saved history on this device.',
    pinUnlockCta: 'Unlock',
    pinRecoverSub: 'Enter the PIN you created to restore your history on this device.',
    pinRecoverCta: 'Restore',
    working: 'Working…',
    signOut: 'Sign out',
    synced: 'Synced',
    readyBody: 'Signed in as {email}. Your history is saved to your account and encrypted so only you can read it.',
    readySub: 'Lock hides your history until you re-enter your PIN. Sign out removes it from this device.',
    lock: 'Lock',
    // cloud.js (non-component) errors
    errEnterEmail: 'Enter your email.',
    errSendCode: 'Could not send the code. Please try again.',
    errEnterCode: 'Enter the code from the email.',
    errBadCode: 'That code did not work. Check it and try again.',
    errPinSetup: 'Could not set up your PIN. Please try again.',
    errPinWrong: 'That PIN did not work. Try again.',
    errPinFinish: 'Set a PIN to finish setting up.',
  },
  es: {
    tagline: 'Tus derechos de HCBS, en lenguaje sencillo',
    disclaimer: 'Información general, no asesoría legal. Tu historial guardado se queda solo en este dispositivo. Por favor no incluyas nombres ni otros datos personales.',
    accountSynced: 'Cuenta (sincronizada)',
    cloudSync: 'Sincronización en la nube',
    settings: 'Configuración',
    navAsk: 'Preguntar',
    navHistory: 'Historial',
    navRights: 'Derechos',
    answeringFor: 'Respondiendo para',
    state: 'Estado',
    federalOnly: 'solo reglas federales',
    tryAsking: 'Prueba preguntar:',
    starter1: '¿Puede mi hogar grupal cerrar el refrigerador con llave?',
    starter2: '¿Tengo derecho a recibir visitas a cualquier hora?',
    starter3: '¿Qué es el código de servicio 510?',
    starter4: '¿Cómo apelo una decisión del centro regional?',
    starter5: '¿Puedo elegir a mi compañero de cuarto?',
    lookingUp: 'Buscando la respuesta…',
    composerPlaceholder: 'Pregunta sobre tus derechos…',
    ask: 'Preguntar',
    errGeneric: 'Algo salió mal. Por favor intenta de nuevo.',
    errCompare: 'No se pudo comparar en este momento. Por favor intenta de nuevo.',
    compareSelect: 'Ver la respuesta de otro estado…',
    compareAria: 'Comparar con otro estado',
    comparing: 'Comparando…',
    compareEmpty: 'Por ahora los demás estados siguen la misma base federal. Las comparaciones entre estados aparecerán aquí cuando se agreguen guías estatales.',
    savedQuestions: 'Preguntas guardadas',
    historyEmpty: 'Tus preguntas se guardan aquí para que puedas volver a ver una respuesta después. Haz una pregunta en la pestaña Preguntar para empezar.',
    conversation: 'Conversación',
    question1: 'pregunta',
    questionN: 'preguntas',
    delete: 'Eliminar',
    deleteConversation: 'Eliminar conversación',
    swipeHint: 'Desliza una pregunta a la izquierda para eliminarla. ',
    historyFooter: 'Guardado solo en este dispositivo. Se conservan las {n} conversaciones más recientes.',
    justNow: 'Ahora mismo',
    minAgo: 'hace {n} min',
    hrAgo: 'hace {n} h',
    dayAgo: 'hace {n} día',
    daysAgo: 'hace {n} días',
    yourState: 'Tu estado',
    caFootnote: 'Lista parcial de códigos de servicio. El catálogo completo lo publica el Departamento de Servicios del Desarrollo de California en dds.ca.gov. Ayuda gratuita de defensa: OCRA en Disability Rights California, 1-800-390-7032.',
    federalRights: 'Derechos federales (todos los estados)',
    federalSub: 'La Regla federal de Entornos de HCBS aplica en todos los estados y es la base sobre la que tu estado construye.',
    otherStates: 'Otros estados',
    otherStatesSub: 'Toca un estado para ver lo que HandBook tiene para él. Todos los estados tienen los derechos federales de arriba; las guías estatales se agregan cuando el equipo las revisa.',
    stateGuide: 'Guía estatal',
    commonServiceCodes: 'Códigos de servicio comunes',
    statePackMissing: 'Las reglas específicas de {name} aún no están cargadas. Los derechos federales de HCBS de abajo también aplican en {name}, y las respuestas para {name} usan esa base federal. Para detalles estatales, contacta la agencia de Medicaid o de discapacidades del desarrollo de {name}, o tu oficina local de Protección y Defensa (encuentra la tuya en ndrn.org).',
    language: 'Idioma',
    noSaved: 'No hay preguntas guardadas en este dispositivo.',
    savedCount1: '{n} conversación guardada en este dispositivo.',
    savedCountN: '{n} conversaciones guardadas en este dispositivo.',
    tapAgainDelete: 'Toca otra vez para borrar todo',
    deleteAll: 'Eliminar todas las preguntas guardadas',
    about: 'Acerca de',
    aboutBody1: 'HandBook explica los derechos de los Servicios en el Hogar y la Comunidad (HCBS) en lenguaje sencillo, con base en la Regla federal de Entornos y la Ley Lanterman de California. Ofrece información general, no asesoría legal.',
    aboutBody2: 'Las preguntas que haces las responde un modelo de inteligencia artificial y no se guardan en ningún servidor de HandBook. El historial guardado vive solo en este dispositivo. Por favor no incluyas nombres ni otros datos personales.',
    aboutBody3: 'Ayuda gratuita de defensa: OCRA en Disability Rights California, 1-800-390-7032 · dds.ca.gov',
    whereLive: '¿Dónde vives?',
    whereLiveBody: 'Los derechos de HCBS empiezan con las mismas reglas federales en todas partes, pero cada estado maneja su propio programa. Elige tu estado para que las respuestas correspondan a donde vives. Puedes cambiarlo cuando quieras.',
    chooseState: 'Elige tu estado…',
    continue: 'Continuar',
    skipUseCA: 'Omitir: usar California',
    account: 'Cuenta',
    notConnected: 'No conectado',
    offBody1: 'HandBook funciona completamente en este dispositivo sin una cuenta; nada de lo que hagas aquí requiere una.',
    offBody2: 'Las cuentas opcionales llegan pronto. Al iniciar sesión, tus preguntas guardadas se conservarán indefinidamente en todos tus dispositivos, y todo se mantiene privado para ti.',
    signInBody: 'Inicia sesión para conservar tus preguntas guardadas indefinidamente y en todos tus dispositivos. Todo está cifrado de extremo a extremo: privado para ti.',
    signInSub: 'HandBook funciona completamente sin una cuenta; esto solo agrega historial en la nube.',
    email: 'Correo electrónico',
    sending: 'Enviando…',
    emailMeCode: 'Envíame un código',
    codeSentBody: 'Enviamos un código a {email}. Escríbelo abajo.',
    code: 'Código',
    verifying: 'Verificando…',
    verify: 'Verificar',
    useDifferentEmail: 'Usar otro correo',
    pinSetupTitle: 'Crea un PIN',
    pinSetupSub: 'Este PIN de 4 dígitos cifra tu historial. Solo tú puedes desbloquearlo; nosotros nunca podemos leerlo, así que guárdalo en un lugar seguro.',
    pinSetupCta: 'Establecer PIN',
    pinUnlockTitle: 'Escribe tu PIN',
    pinUnlockSub: 'Desbloquea tu historial guardado en este dispositivo.',
    pinUnlockCta: 'Desbloquear',
    pinRecoverSub: 'Escribe el PIN que creaste para restaurar tu historial en este dispositivo.',
    pinRecoverCta: 'Restaurar',
    working: 'Procesando…',
    signOut: 'Cerrar sesión',
    synced: 'Sincronizado',
    readyBody: 'Sesión iniciada como {email}. Tu historial se guarda en tu cuenta y está cifrado para que solo tú puedas leerlo.',
    readySub: 'Bloquear oculta tu historial hasta que vuelvas a escribir tu PIN. Cerrar sesión lo elimina de este dispositivo.',
    lock: 'Bloquear',
    errEnterEmail: 'Escribe tu correo electrónico.',
    errSendCode: 'No se pudo enviar el código. Por favor intenta de nuevo.',
    errEnterCode: 'Escribe el código del correo.',
    errBadCode: 'Ese código no funcionó. Revísalo e intenta de nuevo.',
    errPinSetup: 'No se pudo configurar tu PIN. Por favor intenta de nuevo.',
    errPinWrong: 'Ese PIN no funcionó. Intenta de nuevo.',
    errPinFinish: 'Establece un PIN para terminar la configuración.',
  },
}

export function getStoredLang() {
  try {
    const v = localStorage.getItem(LANG_KEY)
    return STRINGS[v] ? v : 'en'
  } catch { return 'en' }
}

export function storeLang(code) {
  try { localStorage.setItem(LANG_KEY, code) } catch { /* just won't persist */ }
}

export function translate(lang, key, vars) {
  let s = STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v))
  return s
}

export const LangContext = createContext('en')

// Component-side translator; re-renders with the app's language state.
export function useT() {
  const lang = useContext(LangContext)
  return (key, vars) => translate(lang, key, vars)
}

// Non-component code (cloud.js errors, module helpers) reads the stored
// language at call time.
export const tr = (key, vars) => translate(getStoredLang(), key, vars)
