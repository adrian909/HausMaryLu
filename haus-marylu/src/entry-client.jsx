import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import App from './App'

import './styles/tokens.css'
import './styles/base.css'

const container = document.getElementById('root')

const tree = (
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)

// Prerendered pages ship real markup, so they are hydrated rather than replaced.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
