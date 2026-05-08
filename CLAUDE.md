# Sundial Systems Website

This is a Claude Code project for Sundial Systems. Connected to GitHub: https://github.com/SundialSystems/sundial-systems-website

## At end of every session: auto-push to GitHub

When the user finishes a working session, you (Claude Code) MUST:

1. Stage and commit any new/changed files:
   ```bash
   git add -A
   git diff --cached --quiet || git commit -m "Update from Claude Code session $(date +%F)"
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

3. Report the latest commit URL to the user:
   `https://github.com/SundialSystems/sundial-systems-website/commit/<sha>`

If `git push` fails because the local branch is behind, do **not** force-push. Pull first:
```bash
git pull --rebase origin main && git push origin main
```

## Going live (Netlify)

This repo is not yet wired to Netlify. To go live:
1. Run `netlify init` from this folder (one-time, interactive)
2. Pick "Create & configure new site"
3. Connect to GitHub → pick this repo
4. Build command: leave empty
5. Publish directory: `.`

After that, every `git push origin main` auto-deploys.
