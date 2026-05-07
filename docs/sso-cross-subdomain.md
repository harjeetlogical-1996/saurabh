# Cross-subdomain single sign-on

One signup, one login, one session — shared across every subdomain on
`saurabhbhayana.com`. Same Mongo `user` + `session` collections back every
app.

## How it works

- Better Auth writes its session cookie scoped to `.saurabhbhayana.com`
  (note the leading dot) instead of the host that issued it.
- Every subdomain (`saurabhbhayana.com`, `tools.saurabhbhayana.com`,
  `app.saurabhbhayana.com`, etc.) reads the same cookie and resolves to
  the same session document in Mongo.
- Sign in on any subdomain → all subdomains have the session immediately.
- Sign out on any subdomain → all subdomains lose it immediately.

## Production env vars

Set these on **every** subdomain's deployment (this marketing site, the
tools site, any future app):

```
MONGODB_URI=mongodb+srv://...               # SAME on every app
MONGODB_DB=saurabh                          # SAME on every app
BETTER_AUTH_SECRET=...                      # SAME on every app
BETTER_AUTH_URL=https://<this-subdomain>    # different per app
AUTH_COOKIE_DOMAIN=.saurabhbhayana.com      # leading dot — required
AUTH_TRUSTED_ORIGINS=https://saurabhbhayana.com,https://tools.saurabhbhayana.com,https://app.saurabhbhayana.com
```

Critical:

- `BETTER_AUTH_SECRET` must be **byte-identical** across every app.
  Different secrets = no session validation = silent logouts.
- `AUTH_COOKIE_DOMAIN` must start with a dot, otherwise the cookie is
  scoped only to that exact host.
- `AUTH_TRUSTED_ORIGINS` lists every sibling subdomain that will call
  the auth API. The current app's `BETTER_AUTH_URL` is auto-trusted, so
  it does not need to be in the list, but including it is harmless.

## Local development

Leave both new env vars **blank** in `.env.local`:

```
AUTH_COOKIE_DOMAIN=
AUTH_TRUSTED_ORIGINS=
```

Browsers refuse to set cross-host cookies on `localhost` (they're not
real subdomains), and `secure: true` cookies require HTTPS. Leaving the
vars blank makes the cookie host-scoped to whatever port you run on, so
local auth keeps working unchanged.

If you want to test the cross-subdomain flow locally, edit your
`hosts` file to point `saurabhbhayana.test` and `tools.saurabhbhayana.test`
at `127.0.0.1`, run a local HTTPS proxy (Caddy / mkcert), and set
`AUTH_COOKIE_DOMAIN=.saurabhbhayana.test`.

## Setting up a new subdomain app

Each new app (e.g. `tools.saurabhbhayana.com`) is its own Next.js
project with its own deployment. To wire it into SSO:

1. **Reuse the same auth config.** Copy `src/lib/auth.ts` from this
   repo (or extract it into a shared package later). The file is small
   and config-only, so duplicating it for now is fine.
2. **Set the env vars above** on the new app's hosting (Vercel /
   Cloudflare / Render / wherever). Same Mongo, same secret, same
   cookie domain. Only `BETTER_AUTH_URL` differs.
3. **Add the new origin** to `AUTH_TRUSTED_ORIGINS` on every other
   subdomain's deployment, then redeploy them. This is the one cross-app
   coordination cost.
4. **Wire your Navbar** to call `auth.api.getSession()` like this app's
   `requireAdmin` helper does. Show "Sign in" → link to
   `https://saurabhbhayana.com/login?redirect=https://tools.saurabhbhayana.com/path`
   when no session.
5. **Optional: gate by `plan`.** The user document has a `plan` field
   (default `"free"`) you can use to gate pro/team features without
   another schema change.

## Roles and plans

The user document has two custom fields:

- `role` — used by `requireAdmin` to gate `/sb-console`. Values: `"user"`
  (default) or `"admin"`.
- `plan` — reserved for tool-tier gating across subdomains. Default
  `"free"`. Use `"pro"`, `"team"`, etc. as needed.

Both fields are `input: false`, meaning the public signup form cannot
set them. Promote a user from the admin console (`/sb-console/users`)
or via a Mongo update.

## What this does NOT solve

- **Cross-domain SSO** (`saurabhbhayana.com` ↔ `othercompany.com`).
  This is subdomain-only. Real cross-domain needs OAuth.
- **Single sign-out across browsers/devices.** A logout on one device
  destroys the session in Mongo, which all subdomains pick up on the
  next request. But other devices keep their cookie cache (5 min
  default) until it expires.
- **Account merging.** Each Mongo user is one user, no automatic
  email-collision merging across providers.
