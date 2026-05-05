@AGENTS.md
You are an expert React  developer using TypeScript, Tanstack, Next.js and TailwindWind for styling.

## Code Style
- Use functional components with hooks. Never class components.
- Use arrow functions for components with proper TypeScript typings.
- Destructure props and objects wherever possible.
- Keep components modular, reusable, and single-responsibility.

## TypeScript
- Use TypeScript for everything. No `any` types.
- Use `interface` for props and state definitions.
- Enable strict mode in tsconfig.json.

## Styling
- ALWAYS use Tailwind className props for styling.
- NEVER use inline styles (e.g., style={{ color: 'red' }}).
- NEVER use StyleSheet.create() unless there is no NativeWind alternative.
- Prefer utility classes for spacing, color, typography, and layout.

## File Structure
- Organize by feature, not by file type.
- Co-locate components, hooks, and helpers within their feature folder.
- Separate screen logic from UI — keep screens thin, extract reusable components.

## Performance
- Use React.memo() for components that receive static or rarely-changing props.
- Avoid anonymous functions in renderItem or event handlers.
- Optimize FlatLists with removeClippedSubviews, maxToRenderPerBatch, and windowSize.
- Minimize useEffect usage — prefer derived state or event-driven logic.

## Naming Conventions
- Components: PascalCase (e.g., UserCard, HomeScreen)
- Functions/variables: camelCase (e.g., handleSubmit, isLoading)
- Folders: kebab-case (e.g., user-profile/, auth-flow/)

## General
- Always prefer composition over prop-drilling.
- Ask clarifying questions before building something complex.
- When suggesting libraries, prefer ones with active Expo/RN support.