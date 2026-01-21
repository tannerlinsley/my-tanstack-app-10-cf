import { sentryVitePlugin } from '@sentry/vite-plugin'

export default function () {
  return sentryVitePlugin({
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  })
}
