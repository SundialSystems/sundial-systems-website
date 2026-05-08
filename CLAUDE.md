# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Complete multi-page marketing website for **Sundial Systems** — a boutique digital growth agency based in Redding, California. Pure HTML/CSS/JS, no frameworks or build tools.

**Domain:** sundialsystems.net  
**Phone:** (530) 782-3789  
**Tagline:** "We Build the System. You Run the Business."

## File Structure

```
index.html                — Homepage
services-systems.html     — Business Systems & Automation
services-websites.html    — Website Design & SEO
services-google.html      — Google Management
work.html                 — Portfolio
about.html                — About
contact.html              — Contact & intake form

css/styles.css            — Full design system, all component styles
css/animations.css        — Keyframes, scroll reveal classes, hero stagger
js/main.js                — Nav scroll, mobile menu, custom cursor, popup widget
js/animations.js          — IntersectionObserver scroll reveals, stat counters, graph lines
images/bridge.jpg         — Sundial Bridge hero photo (Redding, CA)
images/zayden.jpg         — Founder photo (placeholder — drop in real file)
images/partner.jpg        — Co-founder photo (placeholder — drop in real file)
```

## Design Tokens (css/styles.css :root)

| Token | Value |
|---|---|
| `--navy` | `#1B2E4B` |
| `--navy-dark` | `#0F1E30` |
| `--gold` | `#F5A623` |
| `--cream` | `#F5F0E8` |
| `--text` | `#1A2535` |
| `--gray` | `#8A9BAC` |

**Fonts:** Clash Display (headings) · Satoshi (body) · Cormorant Garamond (pull quotes/italic) — all loaded from CDN, no local files.

## Architecture Notes

- **No shared partials** — nav and footer are inlined in every HTML file. When updating nav or footer copy, update all 7 files.
- **Scroll reveal** — add `data-reveal` attribute to any element to opt in. Values: `up` (default), `slide-right`, `slide-left`, `scale`. Add `data-delay="1"` through `"6"` for stagger. Wrap a container in `data-stagger` to auto-assign stagger delays to direct children.
- **Stat counters** — add `data-count="42"` to a `<span>` to animate a number counting up on scroll. Optional: `data-prefix="$"` and `data-suffix="+%"`.
- **Human popup** — controlled by `sessionStorage` key `popup_shown`. Auto-opens 3.5s after first page load per session. IDs: `popupTrigger`, `popupModal`, `popupClose`.
- **Hero load animation** — triggered by adding class `hero-loaded` to `#heroContent`. CSS in `animations.css` handles the stagger via `hero-loaded .eyebrow`, `.hero-h1`, etc.
- **Contact form** — client-side only. On submit, hides `#contactForm`, shows `#formSuccess`. Wire to a backend or form service (Formspree, Netlify Forms, etc.) when deploying.
- **Team photos** — `onerror` handlers on `<img>` tags gracefully fall back to initials when `images/zayden.jpg` / `images/partner.jpg` don't exist.

## Brand Voice

- Direct, confident — never salesy
- Lead with owner pain (time, missed revenue, complexity)
- "We're in Redding" not "We serve the greater Sacramento area"
- Short sentences. No corporate speak.
- Never mention HighLevel, GoHighLevel, or any specific software names — say "our business management platform" or "our automation system"
