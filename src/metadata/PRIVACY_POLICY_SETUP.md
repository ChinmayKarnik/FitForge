# How to Host Privacy Policy on GitHub Pages (Free)

## Step 1: Create a New GitHub Repository

1. Go to https://github.com/new
2. Create a repository named: `fitforge-privacy` (or any name)
3. Set it to **Public** (required for GitHub Pages)
4. Click "Create repository"

## Step 2: Upload Privacy Policy File

1. In the repository, click "Add file" → "Create new file"
2. Name it: `index.html`
3. Copy the contents from `privacy_policy.html` (in this folder)
4. Click "Commit changes"

## Step 3: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
3. Click "Save"
4. GitHub will provide your URL in a few moments (usually blue banner at top)

## Your Privacy Policy URL

Your URL will be:
```
https://[your-github-username].github.io/fitforge-privacy/
```

For example:
```
https://chinmaykarnik.github.io/fitforge-privacy/
```

## Step 4: Update This File

Once your GitHub Pages site is live, update the privacy_policy_url.md with the actual URL.

---

## Alternative Hosting Options

If you don't want to use GitHub Pages:

### Option 1: Vercel (Free)
1. Go to https://vercel.com
2. Connect GitHub account
3. Deploy the privacy_policy.html file
4. Get instant HTTPS URL

### Option 2: Netlify (Free)
1. Go to https://netlify.com
2. Drag & drop privacy_policy.html
3. Get instant HTTPS URL

### Option 3: Your Own Website
If you have a personal website, simply upload the HTML file there.

---

## Important Notes

✅ Privacy Policy MUST be:
- Publicly accessible (no login required)
- On HTTPS (GitHub Pages, Vercel, Netlify all provide this)
- Working and not throwing errors

❌ Privacy Policy CANNOT be:
- A file path or local file
- Behind authentication
- Blocked or 404 error
- Non-HTTPS (Play Store requires HTTPS)

---

## Testing the URL

Once you have your URL:
1. Open it in a browser
2. Verify it loads and displays the privacy policy
3. Check that it's HTTPS (lock icon in address bar)
4. Use this URL in Play Store submission

---

## Next: Update privacy_policy_url.md

Once your policy is hosted and live, update the privacy_policy_url.md file with the actual URL.
