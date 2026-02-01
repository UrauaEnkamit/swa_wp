# Deployment Guide for GitHub Pages

This guide provides step-by-step instructions for deploying your WordPress-like static site to GitHub Pages.

## Prerequisites

- A GitHub account
- This repository pushed to GitHub

## Deployment Steps

### 1. Push to GitHub

If you haven't already, push this repository to GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down and click on **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
5. Click **Save**

### 3. Wait for Deployment

- GitHub will take 1-3 minutes to deploy your site
- A green banner will appear with your site URL when ready
- Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### 4. Custom Domain (Optional)

To use a custom domain:

1. In the Pages settings, enter your custom domain
2. Configure your DNS provider:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or add A records pointing to GitHub's IP addresses
3. Enable "Enforce HTTPS" after DNS propagates

## Post-Deployment

### Accessing Your Site

- **Homepage**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
- **Admin Panel**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/admin.html`

### Managing Content

1. Visit the admin panel
2. Create, edit, or delete posts
3. Posts are saved in localStorage (browser-specific)
4. Use Export/Import to backup or share posts

### Important Notes

- **localStorage Limitation**: Posts are stored in each browser's localStorage
- **Backup**: Regularly export your posts as JSON
- **Multiple Devices**: Use export/import to sync posts between browsers
- **Collaboration**: Consider committing exported JSON to the repository

## Advanced Configuration

### Custom Site Title

Edit the `<h1 class="site-title">` in:
- `index.html`
- `post.html`
- `admin.html`

### Custom Styling

Modify `css/style.css` to change:
- Colors (search for hex values like `#2c3e50`)
- Fonts (update `font-family` declarations)
- Layout (adjust grid settings)

### Persistent Storage (Optional)

To make posts persist across browsers, you can:

1. Export posts from admin panel
2. Save the JSON file as `data/posts.json` in your repository
3. Modify `js/app.js` to load from this file on first visit
4. Commit and push to GitHub

Example modification in `js/app.js`:

```javascript
async function getPosts() {
    const stored = localStorage.getItem('blog_posts');
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Try loading from repository
    try {
        const response = await fetch('data/posts.json');
        if (response.ok) {
            const posts = await response.json();
            localStorage.setItem('blog_posts', JSON.stringify(posts));
            return posts;
        }
    } catch (e) {
        // Fallback to default posts
    }
    
    return getDefaultPosts();
}
```

## Troubleshooting

### Site Not Loading

- Check that GitHub Pages is enabled in settings
- Verify the correct branch is selected
- Wait a few minutes for deployment
- Check the Actions tab for build status

### Posts Not Appearing

- Clear browser cache and reload
- Check browser console for JavaScript errors
- Verify localStorage is enabled in browser settings

### Styling Issues

- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check that `css/style.css` is accessible

### Custom Domain Not Working

- Verify DNS records are configured correctly
- Wait for DNS propagation (up to 48 hours)
- Check HTTPS certificate status in Pages settings

## Updating Your Site

To update your site:

1. Make changes locally
2. Test by opening `index.html` in browser
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update site"
   git push
   ```
4. GitHub Pages will automatically redeploy

## Best Practices

1. **Regular Backups**: Export posts weekly
2. **Version Control**: Commit exported JSON periodically
3. **Testing**: Always test locally before pushing
4. **Documentation**: Keep README updated with your changes
5. **Security**: Only import JSON from trusted sources

## Support

For issues or questions:
- Check the [SETUP.md](SETUP.md) for detailed usage
- Review [OPTIMUM_SETUP.md](OPTIMUM_SETUP.md) for architecture
- Open an issue on GitHub

---

Happy blogging! 🎉
