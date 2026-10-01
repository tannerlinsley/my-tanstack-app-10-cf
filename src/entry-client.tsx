import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'
import { initSentry } from './integrations/sentry/client'

// Initialize integrations
initSentry()

hydrateRoot(document, <StartClient />)