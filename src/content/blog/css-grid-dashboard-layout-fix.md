---
title: "One CSS Grid Line Fixed Our Entire Dashboard Layout"
description: "Six media query breakpoints, five layout bugs, and one CSS Grid line later, our dashboard just worked. Why auto-fit beats fixed breakpoints."
pubDate: 2026-05-25
author: "Bio Lumbantoruan"
tags: ["css", "frontend", "react"]
image: "/images/blog/css-grid-dashboard-layout-fix.svg"
draft: false
---

Our fintech dashboard had six widget cards. A balance overview, transaction history, pending settlements, currency breakdown, recent activity feed, and a notification panel. Six widgets, six media query breakpoints, and five recurring layout bugs.

Every time we added a widget or changed card dimensions, the grid broke somewhere. Cards overlapped on tablets. Orphaned widgets sat alone on ultrawide monitors. We maintained a separate flex layout for mobile that drifted out of sync with the desktop version. The CSS for this one dashboard section spanned 80 lines, most of it media queries patching edge cases.

Then I replaced all of it with one declaration.

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}
```

No media queries. No breakpoints. No separate mobile layout. The grid handles every screen width from a phone to an ultrawide monitor.

## How auto-fit + minmax works

`repeat(auto-fit, minmax(320px, 1fr))` does two things at once. `minmax(320px, 1fr)` says each column must be at least 320 pixels wide and can grow to fill available space. `auto-fit` tells the browser to fit as many columns as the container width allows. A 700-pixel container yields two columns. A 1000-pixel container yields three. A 350-pixel phone screen yields one centered column.

The browser calculates the column count. You write zero breakpoints.

Empty tracks collapse because `auto-fit` (unlike `auto-fill`) does not preserve empty column tracks. Three cards in a row that could hold four means the fourth track shrinks to zero width. No ghost space, no orphaned widget floating in the middle.

## What we deleted

The old CSS had breakpoints at 480px, 768px, 1024px, 1280px, 1440px, and 1920px. Each redefined the grid column count. Adding a seventh widget meant touching every breakpoint, retesting on every device, and finding the new edge case where four columns looked cramped but three left too much whitespace.

The new approach eliminates the concept of breakpoints for layout. Column count becomes a function of available space, not a hardcoded integer per viewport range. The same declaration works for a 2-card tablet layout and an 8-card layout on a 34-inch monitor.

## When this does not work

`minmax` with `1fr` works for cards that share equal visual weight. For layouts with a main content area and a sidebar, use named grid areas or explicit column tracks instead.

If your cards differ in aspect ratio, some will stretch to fill the row height. Set `align-items: start` on the grid container or let cards define their own height.

If you need three columns on desktop and two on tablet with a sidebar that behaves differently, write a media query. `auto-fit` replaces fluid card grids, not every layout decision.

## The broader lesson

Frontend layout bugs trace back to hardcoded viewport assumptions. A breakpoint at 768px assumes you know the device. A breakpoint at 1024px assumes you know the browser chrome width. `auto-fit` trades those assumptions for a constraint-based system: the column is at least this wide, the grid uses as many columns as fit, and the browser handles the math.

Architecture is about trade-offs, not silver bullets. For card grids, I traded 80 lines of media queries for one line of CSS Grid. Five layout bugs disappeared and never came back.
