# TravelBharat Client

React + Vite frontend for TravelBharat.

## Main user areas

- Home
- Explore States
- State details
- Destination details
- Search and discovery
- About
- Admin login
- Protected admin dashboard

## Production-quality features

- Route-level code splitting with React `lazy` and `Suspense`
- Loading, empty, 404 and retryable error states
- Global rendering error boundary
- Short-lived GET response caching
- Safe image fallback handling
- Accessible navigation, labels, focus states and reduced-motion support
- Dynamic page titles and descriptions
- Lazy-loaded catalogue images

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

Set `VITE_API_BASE_URL` in `client/.env` when the API is not running at the default local URL.

## Deployment

Deploy this Vite application with the project root set to `client`. Configure `VITE_API_BASE_URL` with the deployed TravelBharat API URL. `vercel.json` provides the SPA rewrite required for React Router direct navigation.