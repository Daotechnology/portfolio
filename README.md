# Build with Ayomide ? Portfolio & MVP Development

Client-focused software development website, portfolio, and installable PWA for Olajide Oladapo Ayomide, a Lagos-based software engineer and founder.

## Features

- Nine projects with case studies, challenges, approaches, and visual previews.
- Screenshot galleries and category filters.
- Detailed project inquiry form that opens a prefilled email draft, with Gmail and copy fallbacks.
- PWA manifest, branded icons, offline shell, install support, and update controls.
- Responsive layouts checked from 320px to 1920px.

## Source

The website is in dist/. It uses plain HTML, CSS, and JavaScript with no build dependencies. Edit dist/index.html, dist/style.css, and dist/app.js. PWA files are dist/manifest.webmanifest, dist/pwa.js, and dist/sw.js.

## Deploy to Netlify

Import this repository in Netlify. netlify.toml sets the publish directory to dist; no build command is needed. HTTPS enables the service worker. The existing .openai/hosting.json supports the separate Sites deployment.

For manual upload, run ./package-static.ps1 in PowerShell to generate a ZIP with portable forward-slash paths. Upload that ZIP or the contents of dist/.

## Verification

Run node review.mjs on Windows with Chrome installed. It checks responsive layouts, project galleries, inquiry draft encoding, and offline loading. Review images and browser profiles stay in the ignored review/ directory. capture-projects.mjs captures public project pages; its BuildKids URL expects a local app on port 4790.

## Content and privacy

Projects: Chekker, Gabbi Health, GabbiDoc, ACTA, ChallengeMe, BuildKids, VEER, Qoray, and Intervia. Web-project screenshots are captured public pages or local app previews. Gabbi Health and Qoray show public sign-in screens. GabbiDoc uses a clearly labeled illustrative conversation with no patient data. Claims are based on owner-supplied information, inspected code, or public product pages.

The inquiry form does not send automatically or store contact details: visitors review and send the draft in their email app. Offline mode does not provide connectivity for email delivery or external sites. Browser install support varies.

## Client acquisition pages

The homepage leads with MVP, business-software, and AI-integration services. Three proof cards show ACTA, ChallengeMe, and Chekker near the main WhatsApp CTA. /build-your-mvp/ is a focused landing page for founder/MVP campaigns; /story.html preserves the personal journey separately. /privacy.html describes inquiry handoff, offline caching, and optional measurement.

The quick form asks for name, contact, project idea, and optional budget. It prepares a WhatsApp message; visitors must review and send it. Email and copy fallbacks are included. The full email brief remains under an expandable section on the homepage.

Campaign UTMs are preserved in prepared messages. sales.js emits contact_intent events to window.dataLayer and a browser CustomEvent, without form text or contact fields. There is no analytics backend or confirmed-lead pipeline. marketing-config.js has a null Meta Pixel ID; adding an owner-supplied ID enables the consent-gated integration. ContactIntent is not a Lead or delivered inquiry. No advertising campaign is created by this repository.

See marketing/AD-TEST-PLAN.md for two creative concepts, sample tagged links, qualification questions, budget boundaries, and measurement instructions. marketing/lead-log.csv is a blank template. Store actual customer records outside this repository. Genuine testimonials can be added after owner approval; none are invented.

Run node review-sales.mjs for homepage/landing responsive checks, short-form WhatsApp/email payloads, UTM handoff, no inquiry PII in custom events, disabled-Pixel behavior, offline landing loading, and supporting-page runtime checks.
