<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

## Git workflow

After completing an approved development task:

1. Run lint.
2. Run the production build.
3. Fix any errors before proceeding.
4. Review the git diff.
5. Stage the files changed for the task.
6. Create a concise descriptive git commit.
7. Push the commit to the current GitHub branch.
8. Report the commit hash and branch.

Never force-push.
Never commit secrets or environment files.
Never merge a pull request without explicit approval.
Never deploy manually unless explicitly requested.

<!-- END:nextjs-agent-rules -->
