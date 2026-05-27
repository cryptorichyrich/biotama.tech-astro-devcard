---
title: "I Replaced Three useEffect Chains With One Zustand Store and Lost 200 Lines"
description: "Three dependent useEffect chains tangled across a dashboard component. One Zustand store with derived state fixed it. Here is how the refactor went."
pubDate: 2026-05-27
author: "Bio Lumbantoruan"
tags: ["react", "zustand", "state-management", "frontend", "quick-take"]
image: "/images/blog/use-effect-chains-zustand-store-cleanup.jpg"
draft: false
---

I inherited a dashboard component with three `useEffect` hooks wired together like a house of cards. The first fetched user data. The second watched the first result and computed permissions. The third watched permissions and kicked off a secondary API call. Remove one effect and the whole thing collapsed.

The component was 340 lines. Two hundred of them were effect boilerplate, loading spinners, and state-sync plumbing. This code was not complex. It was fragile through ceremony.

## The Problem with Chained Effects

Effects that depend on other effects create implicit ordering. React guarantees effects fire in definition order, but that contract breaks under concurrent features. Add a suspense boundary or a deferred value and your cascade becomes a race.

The second effect in the chain needed a `hasHydrated` flag from the first. The third needed data from the second. Each step added a guard clause, a loading boolean, and an extra render.

## The Fix: One Store, Derived State

I pulled the data, permissions, and derived API call into a single Zustand store. Zustand's `subscribeWithSelector` middleware let me react to specific slices without triggering full re-renders.

```typescript
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useDashboardStore = create(
  subscribeWithSelector((set) => ({
    user: null,
    permissions: [],
    secondaryData: null,
    isLoading: false,
    fetchUser: async () => {
      set({ isLoading: true });
      const user = await api.getUser();
      const permissions = computePermissions(user);
      const secondaryData = user.role === "admin"
        ? await api.getAdminData()
        : await api.getUserData();
      set({ user, permissions, secondaryData, isLoading: false });
    },
  }))
);
```

No effects. No `useEffect` watching `useEffect` watching `useEffect`. The store owns the entire data flow in one synchronous-looking async function. The component calls `fetchUser` on mount and reads whatever slice it needs.

## What I Lost

Two hundred lines. Three loading states folded into one. Five state variables collapsed into three. No more `useMemo` dependency arrays that duplicated effect logic. The component dropped to 140 lines and became a pure render layer.

The tests got shorter too. Instead of mocking three effects with different timing behaviors, I tested the store directly. Zustand stores are just functions. No React wrapper needed.

## The Pattern I Reach For Now

For any data flow where one fetch depends on another fetch, I skip `useEffect` entirely. I put the orchestration in a Zustand store action and let the component subscribe to the result. The store action is a function. I can test it, reuse it across components, and sequence async steps without worrying about React's lifecycle ordering.

Not every project needs Zustand. But if your component has three effects and one of them watches a variable set by another effect, you have a problem that a store solves and an effect chain makes worse.

The trade-off is worth it. Less code, fewer render cycles, and zero implicit dependencies between effects.
