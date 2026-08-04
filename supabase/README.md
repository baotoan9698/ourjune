# Our June Supabase

Supabase project URL:

```text
https://pkcksgorafouemjrfkzu.supabase.co
```

## Files

- `schema.sql`: creates the content tables, admin allowlist, Storage bucket, RLS policies, and initial website content.
- `.env.local` in the project root contains the local publishable credentials and is intentionally excluded from Git.
- `.env.example` documents the required variable names without exposing environment values.

For the full setup sequence, see `SUPABASE_SETUP.md` in the project root.

The same environment variables must be added in Vercel under **Project Settings → Environment Variables** before redeploying.
