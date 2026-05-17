# SnackBunny — Sign-Out Spec

> Add the ability for signed-in users to sign out. Desktop uses an avatar menu in the top-right. Mobile uses a sign-out button in Settings. Both paths trigger a clean session destruction, redirect to the landing page, and show a brief "Signed out" toast confirmation.

---

## Why This Spec Exists

Currently, signed-in users cannot sign out. Their only option is to clear browser cookies manually, which most users will never figure out. This means:

1. Users are stuck in their account indefinitely
2. Sharing a device (family, work computer) is impossible without exposing the account
3. Testing auth flows in development is annoying — you can't easily switch accounts
4. Trust suffers: people don't sign up for things they can't leave

This is the next gap to close after the initial auth push.

---

## Scope

**In scope:**
- Desktop: avatar + chevron in the top-right of the page header that opens a dropdown menu
- Dropdown menu shows the user's email and a sign-out button
- Mobile: a sign-out row in Settings (no avatar in mobile header or bottom nav)
- Single-tap sign-out (no confirmation modal)
- Post-signout: redirect to landing page, brief "Signed out" toast
- Analytics event fired on successful sign-out

**Out of scope:**
- Account deletion (separate concern, much higher stakes)
- Editing the user's email or other account details
- Profile photo upload
- Showing OAuth provider avatars (Google profile photo) — defer until Google OAuth ships
- Multiple-account switching

Stay narrow.

---

## Desktop UX

### Where the avatar lives

In the top-right of the page header. The same header that currently shows "SnackBunny" + the date subtitle + the "This week" button on Home.

```
┌──────────────────────────────────────────────────────────┐
│  SnackBunny                    [This week →]   [C ⌄]     │  ← Header
│  Today, Tuesday, May 13                                  │
└──────────────────────────────────────────────────────────┘
```

The avatar sits to the right of the "This week" button. It only renders when the user is signed in. Anonymous users see nothing in this position.

### Avatar visual

| Element | Token | Notes |
|---------|-------|-------|
| Container | `flex items-center gap-1 px-2 py-1 rounded-full hover:bg-surfaceTertiary` | Subtle hover background |
| Avatar circle | `h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm` | Coral background, white initial |
| Initial | First letter of email, uppercase | "cjara002@gmail.com" → "C" |
| Chevron | Font Awesome `chevron-down` | `text-textSecondary` |
| Cursor | `cursor-pointer` | Clearly tappable |

### Dropdown menu

Opens below the avatar when clicked.

```
                                     ┌──────────────────────┐
                                     │ cjara002@gmail.com   │  ← email
                                     ├──────────────────────┤
                                     │ Sign out             │  ← action
                                     └──────────────────────┘
```

| Element | Token | Notes |
|---------|-------|-------|
| Container | `absolute right-0 mt-2 w-56 bg-secondary border border-borderSoft rounded-2xl shadow-lg z-40 overflow-hidden` | Lifted, contained, anchored to avatar |
| Email row | `px-4 py-3 text-sm text-textSecondary border-b border-borderSoft truncate` | Non-interactive, just info. Truncates if too long. |
| Sign-out row | `w-full px-4 py-3 text-sm font-semibold text-textPrimary text-left hover:bg-surfaceTertiary` | Tappable, hover background |
| Sign-out icon | Font Awesome `arrow-right-from-bracket` to the left of "Sign out" | Visual cue for the action |

### Open/close behavior

- Click avatar → menu opens
- Click outside the menu → menu closes
- Press Escape → menu closes
- Click "Sign out" → menu closes and sign-out flow begins (see below)

Use the standard React pattern of an outside-click detector and an Escape key listener. No backdrop overlay — the menu is small and unobtrusive.

---

## Mobile UX

### No avatar in mobile header or bottom nav

Mobile keeps the header and bottom nav unchanged. Avatar lives only on the Settings page.

### Sign-out row in Settings (Account section)

The existing Account section in Settings currently has:
- "Signed in" status row (informational, from the last spec)
- "Daily reset reminder" row (post-MVP, ignore)

Add a third row: **"Sign out"** below the existing rows.

| Element | Token | Notes |
|---------|-------|-------|
| Container | `flex items-center gap-3 px-4 py-3 bg-secondary cursor-pointer hover:bg-surfaceTertiary` | Tappable, hover state |
| Icon | Font Awesome `arrow-right-from-bracket` at `text-textPrimary` | Same icon as the desktop menu — consistency matters |
| Label | "Sign out" at `text-sm font-semibold text-textPrimary` | Match the style of other Settings row labels |
| Chevron | Font Awesome `chevron-right` at `text-textMuted` | Hint that it does something |

**Placement:** below the "Signed in" status row, above the existing "Daily reset reminder" row (or wherever you have the next section divider).

**Anonymous users do not see this row.** The "Signed in" row is replaced by "Sign in to sync" for anonymous users (per the previous spec), and the "Sign out" row simply doesn't render.

### Why this approach for mobile

- Avoids cluttering an already-busy mobile header
- Settings is the natural account hub on mobile (one tap from anywhere via bottom nav)
- Users don't sign out often; making it slightly less discoverable is acceptable
- Matches patterns from Notion, Linear, Spotify mobile apps

---

## Sign-Out Flow

This is the actual action that happens when "Sign out" is clicked on either platform.

### Steps

1. User taps "Sign out" (from avatar menu on desktop or Settings row on mobile)
2. **No confirmation modal.** Sign-out happens immediately.
3. Internally:
   - Fire analytics event `user_signed_out` (see Analytics section)
   - Call `await supabase.auth.signOut()` — destroys the session
   - Clear any in-memory user state (React state, contexts, etc.)
   - Clear any cached Supabase user data
4. Redirect to `/` (landing page) using Next.js router
5. After the redirect completes, show a toast: **"Signed out"** for ~3 seconds
6. The landing page now renders in its anonymous state — "Try it free" CTA, etc.

### What about localStorage data?

**Keep it.** This is important.

The user's localStorage still has their snack events from before they signed in. If we wipe it, we lose data the user might want. If we keep it, anonymous mode works seamlessly after sign-out — they'd see their bunny in whatever state they last left it.

A subtle but real benefit: if the user signs out and later signs back in to the same browser, their localStorage cache means the home screen renders instantly with cached data while we re-fetch from Supabase. The cache stays useful.

The only thing being destroyed is the Supabase session cookie.

### What the toast looks like

| Element | Token | Notes |
|---------|-------|-------|
| Container | `fixed bottom-6 left-1/2 -translate-x-1/2 bg-textPrimary text-secondary px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg z-50` | Dark brown pill, centered horizontally near bottom of viewport |
| Icon | Font Awesome `circle-check` at `text-successPrimary` | Small green check on the left of the label |
| Label | "Signed out" | Clear and brief |
| Duration | 3 seconds, then fades out over 200ms | Long enough to register, short enough to not annoy |
| Position on mobile | `bottom-24` instead of `bottom-6` (clear the bottom nav) | Don't cover the navigation |

### Edge case: what if sign-out fails?

If `supabase.auth.signOut()` returns an error (very rare, but possible on flaky networks):

1. Show an error toast: "Could not sign out. Try again?" using `bg-errorPrimary`
2. Keep the user on the current page
3. Do not redirect

This is unlikely to happen in practice — Supabase's signOut is mostly a client-side operation — but having the error path documented prevents weird stuck states.

---

## Analytics Event

Fire a custom event on every successful sign-out so you can track behavior.

**Event name:** `user_signed_out`
**Properties:** none required, but include the session duration if you have it:
```
{
  session_duration_seconds: 3600  // optional, only if easy to compute
}
```

For Vercel Analytics, this is `track('user_signed_out')`. For any other tool, follow that tool's convention.

You'll be able to compare sign-up count vs sign-out count to see if users are bouncing after trying the app or sticking with it. This is also the precursor to a real "session length" metric when you set up more analytics later.

---

## Component Tree Changes

### Desktop header (Home, History, Settings — anywhere the page header renders)

```
<Header>
  <BrandTitle />
  <DateSubtitle />
  <ThisWeekButton />          ← only on Home
  {isSignedIn && <AvatarMenu user={user} />}   ← NEW
</Header>
```

### Mobile Settings page

```
<Section title="Account">
  {isSignedIn ? (
    <>
      <SignedInRow />
      <SignOutRow onClick={handleSignOut} />   ← NEW
    </>
  ) : (
    <SignInTeaseRow />
  )}
  <DailyReminderRow ... />
</Section>
```

### App-level toast system

Use **SweetAlert2** in toast mode for the "Signed out" notification. SweetAlert2 is a more comprehensive dialog library, but it includes a toast configuration that works perfectly for non-blocking feedback like this. The benefit of choosing SweetAlert2 over a dedicated toast library: you'll likely want it for destructive confirmations (account deletion, data wipes) and other modal needs later. One library, two patterns.

```bash
npm install sweetalert2
```

Example usage for the signed-out toast:

```typescript
import Swal from 'sweetalert2';

const SignedOutToast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  customClass: {
    popup: 'snackbunny-toast',
  },
});

// On successful sign-out
SignedOutToast.fire({
  icon: 'success',
  title: 'Signed out',
});
```

**Mobile placement:** SweetAlert positions toasts at fixed viewport positions. On mobile, the default `position: 'bottom'` may overlap the bottom nav. Customize with CSS to add `bottom: 6rem` (24px) margin on viewports under 768px, or use `position: 'bottom-end'` and offset further.

**Custom styling:** SweetAlert lets you pass a `customClass` to apply your own styles. Match SnackBunny's design tokens via:

```css
.snackbunny-toast {
  background: var(--color-textPrimary) !important;
  color: var(--color-secondary) !important;
  border-radius: 9999px !important;
  font-family: 'Nunito', sans-serif !important;
}
```

(Or use the equivalent Tailwind approach if your setup supports global CSS targeting from utilities.)

### New components to build

- `<AvatarMenu>` — the desktop avatar + dropdown
- `<SignOutRow>` — the mobile Settings row
- A shared `handleSignOut` function that both components call

The shared function is important — both paths should go through identical logic. Don't duplicate the sign-out steps in two places.

---

## Implementation Notes

### The shared sign-out function

```typescript
// lib/auth/signOut.ts
import { createClient } from '@/lib/supabase/client';
import { track } from '@/lib/analytics'; // or whatever you're using

export async function signOut() {
  // Fire analytics first (in case signOut redirects fast)
  track('user_signed_out');

  // Destroy session
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    // Surface error via toast
    return { error };
  }

  return { error: null };
}
```

Both the desktop avatar menu and the mobile Settings row call this function. The component that calls it is responsible for:
- Showing the success toast on completion
- Triggering the redirect to `/`
- Showing an error toast if the function returns an error

### Avatar initial logic

```typescript
function getInitial(email?: string): string {
  if (!email) return '?';
  return email.trim().charAt(0).toUpperCase();
}
```

Edge cases handled:
- No email (shouldn't happen if signed in, but defensive): show `?`
- Email starting with a number (e.g., `2cjara@gmail.com`): show "2" — that's fine
- Email starting with whitespace (very rare): trimmed first

### Hydration considerations

The avatar shouldn't flash on initial render. If you fetch the user client-side, there's a brief moment where `isSignedIn` is undefined. Solutions:

- **Server-side fetch:** Use Supabase server client to get the user before the page renders. Pass `user` as a prop. No flash, no flicker.
- **Skeleton avatar:** Show a gray circle placeholder until the user state resolves. Looks intentional, not broken.

Server-side fetching is cleaner. Use it if you can.

---

## Acceptance Criteria

### Desktop
- [ ] Avatar with initial + chevron appears in top-right of header for signed-in users only
- [ ] Anonymous users see no avatar (no broken empty space)
- [ ] Clicking the avatar opens a dropdown menu below it
- [ ] Dropdown shows the user's email at the top
- [ ] Dropdown has a "Sign out" button below the email
- [ ] Clicking outside the dropdown closes it
- [ ] Pressing Escape closes the dropdown
- [ ] The dropdown appears on Home, History, and Settings pages

### Mobile
- [ ] No avatar appears in the mobile header
- [ ] No avatar appears in the bottom nav
- [ ] Settings page Account section shows a "Sign out" row for signed-in users
- [ ] Anonymous users do not see the "Sign out" row
- [ ] The row uses the same `arrow-right-from-bracket` icon as desktop

### Sign-out flow (both platforms)
- [ ] No confirmation modal — sign-out happens on first click
- [ ] Supabase session is destroyed
- [ ] localStorage data is preserved (NOT cleared)
- [ ] User is redirected to `/` (landing page)
- [ ] "Signed out" toast appears at the bottom of the screen for ~3 seconds
- [ ] Analytics event `user_signed_out` fires before the redirect
- [ ] Landing page renders in anonymous state immediately

### Error handling
- [ ] If `signOut()` returns an error, show an error toast
- [ ] On error, no redirect happens — user stays on current page
- [ ] On error, analytics event still fires (so you can see how often it fails)

### Cross-cutting
- [ ] No hydration mismatch warnings
- [ ] Avatar doesn't flash visible-then-hidden on page load
- [ ] Toast doesn't cover the mobile bottom nav (use `bottom-24` instead of `bottom-6` on mobile)
- [ ] Works on iPhone Safari, Android Chrome, Desktop Chrome/Firefox/Safari

---

## What This Spec Doesn't Cover

- **Account deletion**: completely different concern (security implications, GDPR, irreversibility). Separate spec.
- **Multiple-account switching**: not needed yet, defer until users actually request it.
- **Editing email or password**: defer until needed.
- **Showing Google profile photo as avatar**: requires Google OAuth to be shipped and to capture the `avatar_url` from the OAuth response. Build this when OAuth lands.
- **Sign-out from all devices**: a power-user feature. Supabase supports this but UI for it is deferred.
- **Session timeout handling**: when a session expires naturally, what happens? Currently handled by the middleware. Worth a separate spec if it becomes a real concern.

---

## Reference Sketch

### Desktop avatar menu (closed)

```
Header:
┌─────────────────────────────────────────────────┐
│ SnackBunny    Today, Tuesday    [This week →] [C ⌄] │
│                                                  ^   │
│                                       avatar + chevron│
└─────────────────────────────────────────────────┘
```

### Desktop avatar menu (open)

```
Header:
┌─────────────────────────────────────────────────┐
│ SnackBunny    Today, Tuesday    [This week →] [C ⌄] │
└─────────────────────────────────────────────────┘
                                          ┌──────────────────────┐
                                          │ cjara002@gmail.com   │
                                          ├──────────────────────┤
                                          │ ← Sign out           │
                                          └──────────────────────┘
```

### Mobile Settings (signed-in)

```
┌──────────────────────────────┐
│ ACCOUNT                      │
│ ┌──────────────────────────┐ │
│ │ ☁ Signed in              │ │
│ │   Synced across devices  │ │
│ ├──────────────────────────┤ │
│ │ ← Sign out             > │ │  ← NEW
│ ├──────────────────────────┤ │
│ │ 🔔 Daily reset reminder  │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

### Post-signout toast (centered near bottom of landing page)

```
                  ┌────────────────────┐
                  │ ✓ Signed out       │
                  └────────────────────┘
```
