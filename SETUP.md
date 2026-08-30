# Setup — Vercel and Supabase

Write all documentation in ASD-STE100. Refer to Section 1 of `BUILD_SPEC.md`.

Do Part A to Part D today. Part E can wait. Part F is a Phase 3 task.

The total time is about 45 minutes. Most of that time is a wait for DNS.

---

## Before you start

You must have these items:

- Node 20 or a later version. Run `node -v` to check.
- Git and a GitHub account.
- A credit card for the domain. The cost is about 12 dollars each year.

---

## Part A — Make the local project

```bash
mkdir yimpact-site && cd yimpact-site
npm create vite@latest . -- --template react-ts
npm install
npm install react-router-dom lucide-react
npm install -D tailwindcss @tailwindcss/vite
git init && git add -A && git commit -m "Add the project scaffold"
```

Run `npm run dev`. Check that the Vite start page opens. Then put
`BUILD_SPEC.md` in the root of the project. Give the project to Claude Code.

Check `.gitignore` before the first commit. It must include `.env` and
`.env.local`. The Vite template includes them, but check.

A commit of a key to a public repository is a large risk. This is the most
common error in a student project. The GitHub secret scanner sends you an email
in a few minutes.

---

## Part B — Make the GitHub repository

Make an empty repository. Do not add a README file. Do not add a licence file.
These files make a conflict at the first push.

```bash
git remote add origin git@github.com:YOUR_ORG/yimpact-site.git
git branch -M main
git push -u origin main
```

Keep the repository private now. The club can make it public later.

---

## Part C — Set up Vercel

1. Sign in at vercel.com with GitHub.
2. Select **Add New**, then **Project**. Import the repository.
3. Vercel finds Vite. Check these settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Select **Deploy**. The first build takes about one minute.
5. Vercel gives you a `*.vercel.app` address. Send the address to your friend
   for design comments.

**How a deployment works.** A push to `main` deploys to production. A push to
any other branch makes a preview address for that branch.

The preview behaviour helps you during the design work. Make a `design-v2`
branch. Push the branch. Send your friend the preview address. The live site
does not change.

**Check the rewrite rule.** `vercel.json` must be in the root of the
repository. Open `/sponsors` on the deployed site. Refresh the page. An error
404 means that the rewrite rule is absent or in the wrong directory.

---

## Part D — Set up Supabase

Make the project now. Phase 1 does not use it. The project is free. Phase 2
then starts with the slow tasks complete.

1. Sign in at supabase.com. Select **New project**.
2. Use these settings:
   - Name: `yimpact`
   - Region: **East US (North Virginia)**. Select the region near the users.
     All of our users are on the East Coast.
   - Database password: make a strong password. Put it in a password manager
     immediately. Supabase shows the password one time. You cannot get it
     again. You can only reset it.
3. Wait about two minutes.
4. Open **Project Settings**, then **API**. Record two values:
   - The project URL
   - The `anon` key

You can put both values in the frontend code later. The same page shows a
`service_role` key. Do not copy that key. Put it only in a server environment
variable. That key ignores every security policy that you write.

### Two facts that can cause a problem

**A free project stops after about one week without use.** Your event is months
away. The project will have a quiet period. A stopped project gives a broken
login page at a bad time.

You have two options. You can change to the Pro plan for 25 dollars each month.
You can also set a weekly reminder to open the dashboard. The club can pay, so
change to the Pro plan about two weeks before the first sponsor invitation.

**RLS is a switch on each table.** A table without RLS is readable by any
person with the anon key. That means the whole internet.

Each `create table` statement in Phase 2 needs an
`alter table X enable row level security` statement in the same migration.

---

## Part E — Add a custom domain

Buy the domain today. DNS propagation is slow. Email domain checks are also
slow.

1. Register the domain at Cloudflare Registrar or Namecheap. Use a name like
   `yaleimpactexpo.org`.
2. In Vercel, open **Project**, then **Settings**, then **Domains**. Select
   **Add**. Write the domain name.
3. Vercel shows the DNS records. Make these records at the registrar.
4. Wait. This takes minutes, and sometimes hours. Vercel then makes the TLS
   certificate.

A `yale.edu` subdomain looks more official. It needs Yale ITS and a faculty or
staff sponsor. Ask your advisor at the same time. Do not wait for an answer.

The Vercel Hobby plan does not permit commercial use. A student club event site
is acceptable. If a sponsor pays for a position on the page, change to the Pro
plan for 20 dollars each month.

---

## Part F — Set the email service (Phase 3)

The Supabase SMTP server cannot send 50 to 100 emails. Do these steps before
you send the sponsor invitations.

1. Make a Resend account. The free plan gives 3000 emails each month.
2. Add your custom domain to Resend. This is why you buy the domain early. The
   check needs DKIM and SPF records. It can take one day.
3. In Supabase, open **Authentication**, then **Emails**, then **SMTP
   Settings**. Write the Resend values.
4. Send a test invitation to yourself. Then send the 80 real invitations.

---

## Quick reference

| Item | Location | Safe in the frontend? |
|---|---|---|
| Supabase project URL | `.env` as `VITE_SUPABASE_URL` | Yes |
| anon key | `.env` as `VITE_SUPABASE_ANON_KEY` | Yes |
| service_role key | Edge Function environment only | **No** |
| Database password | Password manager | **No** |
| Resend API key | Supabase SMTP settings | **No** |

Set the Vercel environment variables in **Project**, then **Settings**, then
**Environment Variables**.

Vite shows a variable to the browser only when the name starts with `VITE_`.
This rule is a good guard. A secret never needs a `VITE_` prefix. If you think
that a secret needs one, stop. You are about to make an error.
