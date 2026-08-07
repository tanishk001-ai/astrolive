# AstroLive Reimagined

Built for **AstroHack 2026** (Astrolive x Unstop).

A prototype that reimagines AstroLive around one idea: the platform actually
serves two different users — the **Seeker**, who wants reassurance now, and
the **Learner**, who wants to study astrology as a subject — and today they
get the same generic browse-and-call experience. This prototype forks them
into two deliberately different products from a single shared entry point.

## The fork

- **Talk to someone now** (Consult) — a stark, monochrome, Co-Star-inspired
  flow: intent capture → a jaali-lattice matching animation that visibly
  demonstrates the specialist-filtering logic → a match (or an honest
  fallback) → session → a timing follow-up capture for re-engagement.
- **Learn to read a chart** (Learn) — a calm, credibility-forward,
  Unacademy-adjacent flow: browse courses taught by working astrologers,
  course detail, and a learning dashboard.

Picking Learn triggers the one deliberate visual transition in the app, from
the stark Consult language into Learn's rounded ed-tech language. Picking
Consult changes nothing, because nothing needs to change.

## Stack

React + React Router + Tailwind CSS, built with Vite. No backend — state and
data are mocked in [`src/state`](src/state) and [`src/data`](src/data); this
is a UX/product prototype, not a production system.

## Running locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
