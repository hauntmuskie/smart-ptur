---
trigger: always_on
---

# Next.js Project Assistant Configuration

## MCP Integration and Research Workflow
- **High-Priority Tool Usage Hierarchy**:
  1. **Next.js DevTools MCP** (Primary): Always use this for all Next.js-specific tasks, including code generation, debugging, configuration, documentation lookup, runtime diagnostics, upgrades, and Cache Components enablement. This is based on the official Next.js DevTools MCP[](https://github.com/vercel/next-devtools-mcp), which provides tools like `nextjs_docs` for official documentation, `nextjs_index` for dev server discovery, `nextjs_call` for diagnostics (e.g., get_errors, get_logs), `browser_eval` for browser automation, `upgrade_nextjs_16` for upgrades, and `enable_cache_components` for migrations.
  2. **Context7 MCP** (Fallback for Libraries): Use this only if Next.js DevTools MCP cannot resolve the issue, particularly for third-party library documentation, API examples, or non-Next.js-specific code. Based on Context7[](https://github.com/upstash/context7), invoke via tools like `resolve-library-id` to get library IDs and `get-library-docs` to fetch up-to-date docs (e.g., for libraries like React, Supabase). Trigger automatically or with "use context7" in prompts.
  3. **Internet Search** (Last Resort): Use web search or browsing tools only for complex, community-driven, or "radical" problems not covered by the above MCPs (e.g., rare bugs from Stack Overflow or GitHub issues).
- **Research Before Execution**:
  - **Always perform research first**: Before any operation (e.g., code generation, setup, modification, debugging), use the appropriate MCP to research documentation, examples, and best practices. For Next.js, start with `nextjs_docs` (search then get actions). For libraries, use Context7 tools. Only after gathering info, proceed to execute or generate code.
  - This ensures up-to-date, accurate assistance and avoids hallucinations or outdated code.
- **UI Generation with shadcn/ui MCP**:
  - When generating or adding UI components (e.g., buttons, dialogs, forms), always use the shadcn/ui MCP[](https://ui.shadcn.com/docs/mcp) to browse, search, and install components from registries (e.g., shadcn, custom).
  - Integrate with Next.js via natural language prompts like "Add the button and dialog components" or "Build a contact form using shadcn components".
  - Check `components.json` for registries and use environment variables for private auth if needed.
  - Invoke shadcn CLI tools within the MCP context for installation.

## Core Tools and Context Rules (Strict Enforcement)
- **Mandatory Next.js DevTools Usage**:  
  When working on **any** Next.js project or any task related to Next.js (including but not limited to code generation, debugging, configuration, feature implementation, styling, routing, API routes, components, etc.):  
  **Always** use **Next.js DevTools MCP** exclusively as the primary source for all Next.js-related information, documentation, runtime inspection, and assistance.
- **Strict Initialization Requirement**:  
  **Always** call the `init` tool **first** (as the very first action) whenever a Next.js-related task begins or resumes.  
  This initializes the Next.js DevTools context (including project path if needed) and must never be skipped. It sets up tools, best practices, and enforces documentation usage.
- **Proactive Enforcement**:  
  Even if the user does not explicitly mention "Next.js" but the context or request clearly involves a Next.js project (e.g., App Router, Server Components, `next/` imports, Tailwind in Next.js, etc.), immediately invoke `init` and maintain Next.js DevTools MCP context throughout the entire interaction.

## Fallback Rules for Problem Solving
- Primary reliance: Always attempt to resolve issues, errors, or questions using **Next.js DevTools MCP** first (e.g., via `nextjs_docs`, `nextjs_call`).
- If Next.js DevTools MCP cannot provide relevant fixes, documentation, or solutions for a specific problem (e.g., third-party library issues, general programming errors, or ecosystem tools not covered deeply in Next.js docs):
  - Allow fallback to **Context7 MCP** for library-specific documentation, examples, or configuration help (e.g., resolve IDs and get docs for libraries like MongoDB or Vercel integrations).
- For more complex, unusual, or "radical" problems (e.g., rare bugs, cutting-edge workarounds, community-reported issues, or problems requiring up-to-the-minute solutions from forums, GitHub issues, blogs, or Stack Overflow):
  - Use internet search tools (web search, browsing specific pages, etc.) to find current, real-world fixes and solutions.
- Never use Context7 or internet search as the first option for Next.js core features; they are strictly fallbacks.
- Never use general internet search for standard Next.js behavior that should be covered by Next.js DevTools MCP.

## Project Context Inspection
- Before generating or modifying any code in a Next.js project:  
  **Always first examine the `package.json`** (and any relevant config files like `biome.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `components.json`, etc.) to understand the project setup.
- Pay special attention to:
  - Runtime / package manager (e.g., Bun, npm, pnpm, Yarn)
  - Formatting and linting tools (e.g., Biome.js, Prettier, ESLint)
  - Type checking configuration (e.g., TypeScript strict mode)
  - Styling setup: Check if Tailwind CSS is used (via dependencies or config files)
  - UI registries: Check `components.json` for shadcn/ui or custom registries
  - Available scripts in `"scripts"` section

## Styling and Tailwind CSS Handling
- If the project uses Tailwind CSS:
  - Always generate code using the **up-to-date Tailwind CSS v4 class syntax**.
  - Use Next.js DevTools MCP (or fallback tools if needed) to reference the latest Tailwind v4 documentation and best practices.
- During post-generation checks:
  - Inspect for any Tailwind-specific warnings or errors and resolve them.

## Post-Code-Generation Workflow
- After generating or modifying code (and applying changes to relevant files):
  1. Run formatting on **the entire project** using the command(s) defined in the project's `package.json` `"scripts"` or the direct tool command compatible with the detected runtime (e.g., Biome.js for formatting if configured).
  2. Run linting on **the entire project** using the command(s) defined in the project's `package.json` `"scripts"` or the direct tool command compatible with the detected runtime (e.g., Biome.js for linting if configured).
  3. Run type checking on **the entire project** (if TypeScript is present) using the command(s) defined in the project's `package.json` `"scripts"` or the direct tool command compatible with the detected runtime.
- Always run these checks project-wide.
- Prefer commands from the project's `package.json` `"scripts"` section when available; otherwise use appropriate direct commands based on detected tools and runtime.
- If Tailwind is detected, include checks for Tailwind warnings in the linting step.
- **Biome.js Specific Rules** (if Biome.js is detected in the project):
  - Always follow Biome.js best practices in generated code (e.g., proper code organization, avoid unsafe patterns, use recommended syntax).
  - During linting and formatting, ensure no suppressions are added (e.g., no `// biome-ignore` or equivalent comments). Instead, fix all issues properly to comply with Biome rules.
  - If needed, research Biome.js documentation or best practices via the MCP hierarchy (Next.js MCP first if integrated, then Context7 for Biome docs, then internet search).
- Report any errors or warnings clearly.
- If issues are found, apply fixes to the relevant files and re-run the full project checks until everything passes cleanly without any suppressions.

## Response Guidelines
- Never create or suggest markdown files after generating code.
- Never use emojis in responses; use plain text or Unicode characters instead.
- Never add comments to generated code.