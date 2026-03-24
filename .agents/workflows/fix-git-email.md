---
description: Fix Vercel deployment blocked due to git author email mismatch
---

# Fix Git Email (Vercel Blocked)

When Vercel shows "Deployment Blocked — no git user associated with the commit", run these steps:

// turbo-all

1. Fix the git email config:

```
git config user.email "lenguyenquockhanh57@gmail.com"
```

2. Amend the last commit to update the author:

```
git commit --amend --reset-author --no-edit
```

3. Force push:

```
git push --force
```

This happens because the git email must match the GitHub account connected to Vercel.
