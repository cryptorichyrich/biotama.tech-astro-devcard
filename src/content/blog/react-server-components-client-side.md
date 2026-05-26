---
title: "React Server Components Made Me Rethink Client-Side"
description: "RSC doesn't just move rendering to the server. It destroys the 'client vs. server' mental model and replaces it with something sharper."
pubDate: 2026-05-26
author: "Bio Lumbantoruan"
tags: ["react", "frontend", "architecture"]
image: "/images/blog/react-server-components-client-side.svg"
draft: false
---

I built React apps for seven years with a clean mental model: server renders HTML, client hydrates it into something interactive. "Client-side" meant an empty shell that fetched data via API calls. Two buckets. Two worlds. React Server Components did not blur that line. They erased it.

The shift started with Next.js 13 and the App Router. I opened a project, saw `'use client'` directives peppered through the component tree, and felt genuine confusion. Every React component I had written up to that point ran in the browser. The server existed to deliver the initial bundle and some JSON. Now I had to mark components that belonged on the client. The default pushed execution to the server. You opted in to interactivity.

That inversion reshapes the architecture decisions you make before writing a single line. For a decade, "server-side" meant a request hit a backend, a template engine assembled HTML, and the result landed in the browser. Hydration turned that static markup into a living application. "Client-side" meant the opposite: the browser built the entire DOM from scratch after loading a JavaScript bundle. RSC breaks both definitions.

A React Server Component runs on the server. It does not produce HTML templates. It produces a serialized React tree — a format the client runtime can stream and reconcile without destroying existing state. It queries databases. It reads the filesystem. It accesses backend secrets. When it ships its output to the browser, the client never receives the component's code. Zero JavaScript for that part of the tree.

The old mental model said "this code runs on the server, this code runs on the client." RSC says "this component ships zero JS, this component hydrates, and they compose in the same tree."

What changed after building with this pattern: I stopped thinking about pages as monolithic rendering decisions. A product detail page can render the header and footer on the server with zero client cost, while keeping the add-to-cart button interactive. The reviews section streams in after the critical content. The search autocomplete stays client-side because latency matters there. Each component carries its own rendering strategy.

The trade-off is how much added complexity your team absorbs. Server Components cannot use hooks, state, or event handlers. They cannot call browser APIs. You now maintain two component categories with different rules. A junior developer who drops `useState` into a server component hits an error they have never seen before. Boundaries your team once managed through convention now come enforced by the framework.

Is the trade-off worth it? For data-heavy applications where bundle size matters, the answer is yes. I watched a dashboard project drop its initial JavaScript payload by 40% after migrating data-fetching components to RSC. The users noticed. The Lighthouse scores reflected it. The DX improved because data fetching moved closer to the source — no more prop drilling from a top-level `getServerSideProps`.

React Server Components did not invent server rendering. PHP has done that for decades. RSC introduced a component-level decision about where code executes and what ships to the browser. Early web limitations forced the client-server divide. RSC replaces it with something more precise: per-component control over execution environment and bundle cost. That shift changes how I approach frontend architecture decisions. The old two-bucket model feels like 2018.
