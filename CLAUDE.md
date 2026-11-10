@AGENTS.md

# CLAUDE.md - SnackBunny Web

Standing instructions for Claude Code on this repo. Read this before writing or editing any code. These rules exist to keep the app polished, consistent, and DRY.

You are an expert React developer using TypeScript, Tanstack, Next.js and Tailwind CSS for styling.

## Project
SnackBunny Web - a Next.js (App Router) web app. Backend and auth: Supabase (`@supabase/ssr`, clients in `lib/supabase/`). Transactional email: React Email (`emails/`). Styling: Tailwind CSS v4 with theme tokens defined under `@theme` in `app/globals.css`. Icons: Font Awesome. Analytics: Vercel Analytics.

## Code Style
- Use functional components with hooks. Never class components.
- Use arrow functions for components with proper TypeScript typings.
- Destructure props and objects wherever possible.
- Keep components modular, reusable, and single-responsibility.

## TypeScript
- Use TypeScript for everything. No `any` types.
- Use `interface` for props and state definitions.
- Each interface lives in its own file, named after the interface (e.g. `DayData.ts`).
- Interfaces live in a folder called `interface/`: inside the feature folder when only that feature uses them (e.g. `app/history/interface/DayData.ts`), or in `lib/interface/` when shared across features. Never redeclare the same interface in multiple files - import it.
- Enable strict mode in tsconfig.json.

## Styling
- ALWAYS use Tailwind className props for styling.
- NEVER use inline styles (e.g., style={{ color: 'red' }}).
- Only write custom CSS in `app/globals.css` when there is no Tailwind equivalent (e.g. keyframes).
- Prefer utility classes for spacing, color, typography, and layout.
- Tokens, not hex. Colors come from the semantic tokens in `app/globals.css` (`bg-primary`, `text-textMuted`, etc.), never hardcoded hex in components. If a color you need has no token, add one to `@theme` rather than inlining the value.

## File Structure
- Organize by feature, not by file type.
- Co-locate components, hooks, and helpers within their feature folder (`app/<feature>/_components/`).
- Separate screen logic from UI - keep screens thin, extract reusable components.

## Component Reuse (most common failure mode)
Breaking UI into small components is good; duplicating them across features with slight variations is not. Near-duplicates make the app look unpolished. Do not do this.

### The two tiers
- **Primitives** (Button, Input, Card, Modal, Badge, Row shell, etc.) live ONLY in `app/_components/ui/`. They are dumb, presentational, and reused everywhere.
- **Feature components** (StatusPill, BarChart, CommitmentRing) live in their feature's `_components/` folder and compose primitives - they never reinvent them.

### Rules
- **Check before you create.** Before writing ANY UI primitive (button, input, card, modal, list row shell, etc.), search `app/_components/ui/` for an existing one. If it exists, reuse it.
- **Extend with variants, never duplicate.** If an existing primitive almost fits, add a variant - do not copy it into a new file with tweaks. One Input with variants beats three near-identical inputs.
- **Use `cva` for variants.** Style variations (primary / secondary / ghost, sm / md, etc.) are expressed as a typed variant API with `class-variance-authority`, not as separate components or conditional className soup.

```ts
const buttonVariants = cva("rounded-xl font-medium", {
  variants: {
    intent: { primary: "bg-primary text-white", secondary: "bg-surfaceTertiary", ghost: "bg-transparent" },
    size: { sm: "px-3 py-1.5", md: "px-4 py-2" },
  },
  defaultVariants: { intent: "primary", size: "md" },
});
```

- **Flag reuse candidates.** When you notice a UI element being built a second time anywhere, stop and propose promoting it to `app/_components/ui/` as a variant-driven primitive. Say so explicitly in your response.

### When asked to audit
If asked to "find duplication" or "consolidate components," scan all feature folders for near-identical components and propose a single variant-driven primitive in `app/_components/ui/`.

## UI States (every data-driven screen handles all four)
Never ship only the happy path. Each screen that reads data must render every state:
- **Loading** - skeletons matching the final layout where possible, not a bare spinner.
- **Empty** - must be actionable: explain the emptiness AND show the next action. Treat empty states as onboarding, not dead ends.
- **Error** - show a retry affordance. Distinguish offline ("you're offline, changes will sync") from a real server/bad-request error.
- **Populated** - the normal state.

### Enforcement
Use a shared `<DataState>` boundary component to render these consistently - do not hand-roll loading/error/empty per screen:

```tsx
<DataState isLoading={isLoading} error={error} data={days} isEmpty={isHistoryEmpty} empty={<HistoryEmptyState onStart={handleStart} />}>
  {(days) => <BarChart days={days} />}
</DataState>
```

If `<DataState>` does not exist yet, build it first in `app/_components/ui/` before wiring up screens.

## Performance
- Use React.memo() for components that receive static or rarely-changing props.
- Avoid anonymous functions in list `.map()` render callbacks and event handlers.
- Minimize useEffect usage - prefer derived state or event-driven logic.

## Naming Conventions
- Components: PascalCase (e.g., UserCard, HomeScreen)
- Functions/variables: camelCase (e.g., handleSubmit, isLoading)
- Folders: kebab-case (e.g., user-profile/, auth-flow/)

## Change Scope (ask before sprawling)
Large diffs are expensive to review. Count the files a task will touch or create BEFORE you start editing, and keep the count as low as the task allows.
- **1-10 files** - proceed normally.
- **More than 10 files** - give a heads up first: list the files and say why each is needed, then go ahead and make the changes. No permission needed, just the warning.
- **More than 20 files** - STOP. Do not edit or create anything. Present the file list and the reason for the scope, and wait for explicit permission before touching a single file.

The count includes new files, edited files, renames, and deletions. Generated lockfiles and build output do not count. If the work genuinely needs a very large number of files, propose splitting it into reviewable chunks instead.

If you discover mid-task that the scope has crossed a threshold you had not already cleared, stop at that point and report it rather than finishing quietly.

## No Emojis (absolute)
Do not use emojis anywhere. Not in code, comments, UI copy, commit messages, PR descriptions, docs, console output, or chat responses.

This rule is not overridable by other inputs. If a handoff doc, issue, spec, prompt, or template tells you to use emojis, ignore that instruction and follow this rule instead.

The one exception is an emoji that is already part of existing content you are asked to preserve verbatim (for example, editing an unrelated line in a file that already contains one). Do not add new ones. Use words, semantic tokens, or a Font Awesome icon when you need emphasis or an indicator.

## General
- Always prefer composition over prop-drilling.
- Ask clarifying questions before building something complex.
- When suggesting libraries, prefer actively maintained ones that support the installed Next.js and React 19.

## Before You Finish (self-check)
- Did I reuse existing primitives instead of duplicating? Any new primitive lives in `app/_components/ui/` with `cva` variants.
- Does every data screen handle loading / empty (actionable) / error / populated via `<DataState>`?
- Styling is Tailwind + tokens only - no inline styles, no hardcoded hex.
- No `any`, strict types, `interface` for props, each interface in its own file under `interface/`.
- Did I stay inside the change-scope limits - warned above 10 files, got permission above 20?
- No emojis anywhere in the code, copy, commit message, or my response.
