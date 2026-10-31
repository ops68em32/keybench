# Start here

Three files in this folder are what Claude Code builds from:

- `CLAUDE.md` — standing instructions Claude Code reads automatically every time.
- `SPEC.md` — the product plan (what to build, in what order, how it is graded).
- `GUIDE.md` — the piano curriculum, with the diagram code at the end.

You do not paste these into the chat. They sit in the project; Claude Code reads them itself.

## Route A — everything in the browser, nothing installed (recommended)

1. Create a free account at github.com. Click "New repository", name it `keybench`, tick "Add a README", create it.
2. On the repository page click "Add file" → "Upload files", drag `CLAUDE.md`, `SPEC.md` and `GUIDE.md` in, click "Commit changes".
3. Go to claude.ai/code, connect your GitHub account when asked, and choose the `keybench` repository.
4. Paste this as your first message:

   > Read CLAUDE.md and SPEC.md. Implement Phase 0 from the Build roadmap. Also set up a GitHub Actions workflow that builds the app and publishes it to GitHub Pages on every push to main, so I can test each phase at the published link without installing anything. Stop when the Phase 0 gate passes, and write VERIFY.md telling me exactly what to open and click.

5. When it finishes, accept its pull request (it will show you a button), wait a minute, and open `https://<your-github-username>.github.io/keybench/` on your phone or laptop. Follow VERIFY.md.
6. Each later phase is one message of the same shape: "Implement Phase 1 from the Build roadmap. Stop when its gate passes and update VERIFY.md." Test at the piano between phases and paste what felt wrong back to Claude Code in plain words.

Requirements: a Claude plan that includes Claude Code, a GitHub account, and Chrome or Safari. The microphone permission prompt will appear the first time; allow it.

## Route B — on your Windows laptop

Only if you prefer a local setup. Install Node.js 22 LTS (nodejs.org), Git (git-scm.com), then in a terminal: `npm install -g @anthropic-ai/claude-code`. Make a folder `keybench`, put the three files in it, open a terminal there, run `claude`, and paste the same first message as Route A (you can drop the GitHub Pages sentence and use `npm run dev` instead).

## What you do each phase

Open the published link, test at the piano for 20 minutes following VERIFY.md, write down what felt wrong, paste it into Claude Code. That feedback loop is the whole development process. No coding session without a practice session that day.

## If Claude Code asks you something you can't answer

Paste the question to Claude in the chat where this plan was written. The plan already contains a recommended default for every decision, so the answer is usually "use the default in SPEC.md".
