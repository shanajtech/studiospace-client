# StudioSpace

A responsive marketplace where creators discover inspiring studios and hosts manage their spaces.

**Live website:** https://studiospace-client-dusky.vercel.app

**Client source:** https://github.com/shanajtech/studiospace-client

**Server source:** https://github.com/shanajtech/studiospace-server

## Features
- Three-slide homepage carousel, category discovery and six database-backed featured studios.
- Search, category and hourly-price filters with sorting and pagination.
- Email/password and Google login, session persistence and return-to-page sign-in.
- Studio galleries, amenities, host information, reviews and booking availability.
- Private studio creation, integrated PostImage photo upload, editing and deletion with custom confirmation dialogs.
- Reservation estimates, pending requests, guest cancellation and host booking management.
- A persistent light/dark theme, responsive layouts, skeleton loading, empty states and toast feedback.

## Stack
Next.js App Router, TypeScript, React, shadcn/ui-style Radix Dialog components, Swiper, Sonner and Lucide. Express, MongoDB and Better Auth run in the separate server repository. API requests use a same-origin Next.js rewrite so HTTP-only cookies work consistently on refresh and across private pages.

## Local setup
Use Node 22 or newer. Run `npm ci`, copy `.env.example` to `.env.local`, set `API_ORIGIN=http://127.0.0.1:4000`, start the backend, and run `npm run dev`. Open `http://localhost:3000`. Use the same hostname in the backend's `CLIENT_ORIGIN` and `BETTER_AUTH_URL`.

## Validation
`npm run check` checks TypeScript. `npm run build` creates the production application. Backend integration tests are documented in the server README. On Node 22.18+ or Node 24+, run `node --experimental-strip-types --test test/postimage.test.mjs` to check photo-response parsing and rejection of invalid responses.

## Publish
Import this repository into Vercel as a Next.js application. Set `API_ORIGIN` to the deployed Express server origin and rebuild whenever it changes. Configure the backend with the final frontend URL and Google callback. Confirm sign-in, refresh on private routes, image uploads and booking before submitting.

## Submission details
The production frontend is hosted on Vercel and the Express backend is hosted on Render. MongoDB Atlas stores the application data.

### Public examiner demo login

- Email: examiner@studiospace.example
- Password: e0cc29f14c0ef5c6b003c6c2f4e117bff441Aa

This is an intentionally public demonstration account with ordinary user permissions. Do not add private or personal data to this account. It contains only demonstration reservations; use a separate account for your own work. The host account and infrastructure credentials are private.

Photo workflow: click Upload studio photos, choose images in the official PostImage upload window, and the images return automatically to the listing form. No copying links is required. PostImage hosts the photos and MongoDB stores their URLs. The integration validates the message origin, source window, request ID and image host; provider markup is never rendered as HTML. The optional server-side ImgBB endpoint is not used by the form.

Images: Unsplash and PostImage. Seeded studios are demonstration listings. The application collects no payments and does not offer insurance or email recovery.

