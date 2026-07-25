// Lint config, mirroring GuestBook's: focused on dead code (unused vars/imports) and
// real React-hook bugs, not style. exhaustive-deps is intentionally OFF - this
// codebase manages several dependency arrays by hand with deliberate
// eslint-disable comments, and turning the rule on would bury the real findings.
// Run: npm run lint
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

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
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
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
