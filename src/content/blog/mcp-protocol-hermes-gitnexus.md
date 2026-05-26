---
title: "MCP Explained: How Hermes Reads Your Entire Codebase"
description: "The Model Context Protocol is the missing layer between LLMs and real codebases. Here's how Hermes uses GitNexus over MCP to understand, refactor, and navigate your code."
pubDate: 2026-05-26
author: "Bio Lumbantoruan"
tags: ["ai", "hermes", "mcp", "architecture"]
image: "/images/blog/mcp-protocol-hermes-gitnexus.jpg"
draft: false
---

You ask an AI coding agent to refactor a function. It reads the file, writes some code, and ships it. Then your CI explodes because three other services imported that function and the agent never checked.

This happens because most AI coding tools treat your codebase as a pile of text files. They open one file at a time, read it, and guess. No call graph. No dependency chains. No understanding of how functions connect across files.

The Model Context Protocol changes this. MCP is an open standard that defines how LLMs connect to external context sources: databases, APIs, file systems, and codebases. Think of it as USB-C for AI tools. One protocol, any data source.

## The Protocol Layer Nobody Talks About

MCP runs on JSON-RPC 2.0. A client (like Hermes) connects to a server (like GitNexus) and exchanges structured messages. Three primitives define the interface:

**Tools** let the LLM take action. `gitnexus_impact({target: "processPayment", direction: "upstream"})` runs a function on the server and returns results. The LLM decides when to call it, what parameters to pass, and how to use the output.

**Resources** provide read access to structured data. `gitnexus://repo/my-project/process/payment-flow` returns a full execution flow trace: every function call, every conditional branch, every external dependency.

**Prompts** are reusable templates that guide the LLM. GitNexus uses these for things like commit message generation and code review summaries, giving the model consistent prompts every time.

The protocol stays transport-agnostic. You can run it over stdio for local tooling, or HTTP with Server-Sent Events for remote servers. GitNexus uses stdio. Hermes spawns the GitNexus process, they talk over a pipe. No network latency. No auth tokens. Just a protocol.

## GitNexus: Turning Code into a Queryable Graph

GitNexus sits on the server side of the MCP connection. Before it can answer questions, it analyzes your codebase and builds a graph. Symbols (functions, classes, types) become nodes. Relationships (calls, imports, inheritance) become edges.

The output is not just a file index. GitNexus traces execution flows: chains of function calls that represent real user-facing processes. In my Astro blog project, it found 4 flows. Blog rendering. Section data loading. The CV page. Static generation. Each flow maps every symbol that fires when a user hits a page.

When Hermes asks `gitnexus_context({name: "BlogSection"})`, GitNexus returns the symbol's definition, its callers, its callees, and which execution flows include it. One query replaces grep, find-references, and manual tracing.

The graph also tracks dependency direction. If `formatDate` calls `parseDate`, and 12 components call `formatDate`, then changing `parseDate` affects all 12. GitNexus labels this as d=2 risk. Indirect dependencies that need testing.

## Impact Analysis: The Feature That Prevents Broken Builds

Before Hermes edits any symbol, it runs impact analysis. GitNexus enforces this through the AGENTS.md file it generates in every project.

The risk levels break down into three tiers:

- **d=1 (WILL BREAK):** Direct callers. Renaming a function that 8 files import means 8 files must change.
- **d=2 (LIKELY AFFECTED):** Indirect dependencies. The callers of those callers. Test these.
- **d=3 (MAY NEED TESTING):** Transitive chain. Run the test suite, but the blast radius is wide.

I learned this the hard way. Before GitNexus, I asked Hermes to rename a shared utility. It found 3 direct imports and updated them. What it missed: 7 more files imported the 3 files it just changed, and two of those were in CI-only code paths. The build passed locally and failed in staging.

Now Hermes runs `gitnexus_impact` before touching anything. If the risk is HIGH or CRITICAL, it warns me and asks before proceeding. This alone has prevented more broken builds than I can count.

## How Hermes Uses MCP in Practice

Hermes connects to GitNexus as an MCP client. The workflow looks like this:

**Exploring unfamiliar code.** Hermes runs `gitnexus_query({query: "payment validation"})` instead of grepping. GitNexus returns results grouped by execution flow and ranked by relevance. Grep gives you matching lines. GitNexus gives you the process those lines participate in.

**Understanding a symbol.** `gitnexus_context({name: "validateTransaction"})` returns the full 360-degree view: who calls it, what it calls, which flows it lives in. Hermes reads this before suggesting changes.

**Safe refactoring.** Before renaming, Hermes runs a dry-run: `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})`. GitNexus previews every file that will change. Graph-based edits are safe and automatic. Text search edits need manual review. After the rename, `gitnexus_detect_changes()` confirms the scope matches expectations.

**Pre-commit verification.** Before committing, Hermes runs `gitnexus_detect_changes({scope: "staged"})` to list every symbol and flow affected. If the list includes anything unexpected, the commit gets reviewed.

The protocol handles all of this as structured JSON-RPC calls. Hermes does not need to know how GitNexus builds its graph. GitNexus does not need to know what Hermes does with the results. The protocol is the contract.

## Why MCP Matters Beyond Hermes

MCP is not a Hermes-specific thing. Claude Desktop uses it. Cursor has MCP support. Zed and Continue are building integrations. The protocol creates a standard interface that any LLM client can use with any context server.

This means you can write one MCP server for your company's internal APIs and connect it to every AI tool your team uses. Your database schema, your API docs, your monitoring dashboards. All exposed through the same protocol.

The alternative is what we had before: every AI tool building its own integrations, its own file parsers, its own indexing. Fragile. Incompatible. Inefficient.

MCP is young. The spec is still evolving. But the core architecture is solid. Client-server. JSON-RPC. Transport-agnostic. I have been running it in production through Hermes for months. It handles dozens of queries per coding session. It has not failed me once.

The next time your AI coding agent breaks something because it did not understand your codebase, the problem is not the model. It is the interface between the model and your code. MCP fixes that.

---

Inspired by the [Model Context Protocol specification](https://modelcontextprotocol.io) and my experience building with GitNexus through Hermes.
