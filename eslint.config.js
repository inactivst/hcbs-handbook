// Lint config, mirroring GuestBook's: focused on dead code (unused vars/imports) and
// real React-hook bugs, not style. exhaustive-deps is intentionally OFF - this
// codebase manages several dependency arrays by hand with deliberate
// eslint-disable comments, and turning the rule on would bury the real findings.
// Run: npm run lint
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import a11y from 'eslint-plugin-jsx-a11y'

export default [
  { ignores: ['dist/**', 'ios/**', 'node_modules/**', 'public/**', 'drafts/**'] },
  js.configs.recommended,
  {
    // api/ is Node (Vercel serverless), src/ is the browser - they need different globals.
    files: ['src/**/*.{js,jsx}'],
    // The existing inline `eslint-disable ... exhaustive-deps` comments stay (that
    // rule is off here); don't report them as unused or the noise returns.
    linterOptions: { reportUnusedDisableDirectives: false },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.es2021, __APP_VERSION__: 'readonly', __APP_BUILD__: 'readonly' },
    },
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': a11y },
    settings: { react: { version: 'detect' } },
    rules: {
      // ─── ACCESSIBILITY ────────────────────────────────────────────────────
      // This app's audience is people with disabilities and the advocates working
      // on their behalf, so these are not polish. Ported from BlackBook and
      // GuestBook, where the same rules found controls drawn as divs and fields
      // with no name that repeated hand passes had walked past.
      //
      // `label-has-associated-control`, NOT `control-has-associated-label`. Every
      // field here already had a visible translated <label> above it and simply was
      // not wired to it; the fix was htmlFor/id, and this is the rule that checks
      // that relationship. The other rule cannot resolve htmlFor across the tree, so
      // it would report 12 permanent false positives on fields that are now correct
      // — and a warning that is always there is a warning nobody reads.
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either', depth: 3 }],
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',

      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^_' }],
      // So components referenced only inside JSX aren't falsely flagged unused.
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      // The one that would have caught the VaultPage remount bug class.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      // The code deliberately swallows ignorable failures (localStorage parse,
      // speech synthesis, clipboard) - an empty catch there is the intent, not a bug.
      'no-empty': ['warn', { allowEmptyCatch: true }],
    },
  },
  {
    files: ['api/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^_' }],
      'no-empty': ['warn', { allowEmptyCatch: true }],
    },
  },
]
