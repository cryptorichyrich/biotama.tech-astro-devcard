---
title: "Server Components Rewired My Data Fetching"
description: "Switching from useEffect to async server components rewired my React data fetching. What changed and where client-side patterns still win."
pubDate: 2026-05-24
author: "Bio Lumbantoruan"
tags: ["react", "nextjs", "frontend"]
image: "/images/blog/server-components-data-fetching.svg"
draft: false
---

For three years, my React data fetching looked the same. Component mounts, useEffect fires, loading spinner renders, fetch resolves, state updates, component re-renders. Every page, every dashboard card, every list view followed this pattern. I wrapped it in custom hooks, abstracted it with SWR and React Query, but the mental model stayed fixed: the client asks, the server answers, the component reacts.

Server Components broke that model.

My first weeks with Next.js App Router, I kept reaching for old patterns. I tried putting useEffect in server components (the compiler rejected it). I tried fetching in getServerSideProps before realizing it does not exist in App Router. The friction was not a syntax problem. It was a thinking problem.

## The Old Model: Fetch on the Client, Render What You Get

In the Pages Router world, data fetching meant one of three things:

**getServerSideProps** for server-rendered pages. You fetched everything the page needed upfront, passed it as props, and the component tree rendered with data available. It worked, but it pushed all fetching to the page level. A dashboard page with six widgets meant one massive fetch call or six sequential calls in a single function that had no business knowing about all six widgets.

**getStaticProps** for static pages. Same pattern, different timing. Build-time fetching that turned into JSON files.

**Client-side fetching** with useEffect or data libraries. The component mounts empty, shows a spinner, fetches, and renders. This gave you component-level data ownership but traded it for loading states, waterfall requests, and client-side JavaScript for data that never needed to run in the browser.

The common thread: your data fetching lived at the route level or the component level, and you picked between server-side and client-side as a page-level decision.

## The New Model: Components Fetch Where They Live

Server Components let a component run on the server with direct access to your data layer, then send only the rendered HTML to the client.

```tsx
// src/app/dashboard/page.tsx (runs on the server)
async function DashboardPage() {
  const transactions = await getRecentTransactions();
  const balance = await getCurrentBalance();

  return (
    <div>
      <BalanceCard balance={balance} />
      <TransactionList transactions={transactions} />
      <InteractiveFilter /> {/* Client Component */}
    </div>
  );
}
```

No useEffect. No loading state for initial data. No client-side JavaScript for data the server can fetch and render. The component is an async function that awaits its data and returns JSX. The mental model shifts from "fetch then render" to "render fetches."

This changes how I think about component boundaries. A TransactionList used to receive data as props from a parent that fetched it. Now the TransactionList can fetch its own data inside its own server component, and the parent does not need to know or care.

## Where This Wins

**SEO-critical pages.** Product pages, blog posts, landing pages. The server renders complete HTML with all data. No client-side fetch, no flash of loading state, no JavaScript required for the content to appear. Crawlers see the full page.

**Data-heavy dashboards.** I built a fintech dashboard where the overview page pulled data from four sources: transaction history, account balances, pending settlements, and notification counts. In the old model, this meant one bloated getServerSideProps or four client-side fetches with four loading spinners. With Server Components, each section is its own async component. They fetch in parallel on the server. The client receives rendered HTML.

**Reducing client bundle size.** A server component ships zero JavaScript. If a component only displays data and has no interactivity, it sends no JS to the browser. For a transaction detail page with formatted dates, currency rendering, and status badges, the server handles the work. The client gets static HTML.

## Where Client-Side Fetching Still Wins

**Interactive components.** Search inputs with instant results, drag-and-drop interfaces, real-time chat. These need client-side state and event handlers. Mark them with `"use client"` and fetch on the client. This is not a failure of the pattern. It is the correct use of the boundary.

**Real-time data.** A live transaction feed that updates every few seconds. Server Components render once on the server. For live updates, you need WebSockets or polling on the client. I use Server Components for the initial render and client-side subscriptions for subsequent updates.

**User-driven fetch chains.** Fetch B depends on the result of fetch A, and both happen in response to user interaction. Keep that on the client. Server Components resolve at request time, not in response to click events.

## The Mental Model That Clicked

The shift that took the longest was understanding that Server Components and Client Components are not competing patterns. They compose. A server component fetches data and renders the shell. Client components handle interaction within that shell.

My transaction dashboard uses server components for the data-heavy sections (balance display, transaction table, settlement summary) and client components for the interactive parts (date range picker, export button, live notification badge). The server renders the full page with data. The client hydrates the interactive bits.

This is the same principle as progressive enhancement, applied at the component level. Render the content on the server. Add interactivity on the client. The boundary is not a page-level decision anymore. It is a per-component decision.

## Three Habits I Had to Unlearn

**Fetching everything at the page level.** I used to consolidate all data fetching into one getServerSideProps call. With Server Components, pushing data fetching down to the components that need it produces better separation of concerns and enables parallel fetching.

**Reaching for useEffect by default.** The instinct to think "component mounts, then fetches" runs deep. Now I ask: does this component need to fetch in the browser, or can the server do it? If the server can handle it, it is a Server Component. If user interaction drives the fetch, it is a Client Component.

**Treating all pages the same way.** Pages Router pushed you toward a single fetching strategy per route. App Router lets you mix Server and Client Components within a single page. The architecture adapts to what each section needs.

Architecture is about trade-offs, not silver bullets. Server Components solve the problem of shipping unnecessary JavaScript for data display. They do not replace client-side fetching for interactive features. Understanding where each boundary belongs is the skill that matters.
