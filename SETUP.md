# WordPress-like Static Site for GitHub Pages

A fully functional WordPress-like blogging system that runs entirely on GitHub Pages with no server required! This static site generator gives you the familiar WordPress experience while being completely static and hostable for free on GitHub Pages.

## Features

- 📝 **Post Management** - Create, edit, and delete blog posts through an intuitive admin panel
- 🎨 **Responsive Design** - Beautiful, mobile-friendly interface
- 🔍 **Search Functionality** - Real-time search across all posts
- 🏷️ **Tagging System** - Organize posts with tags
- 💾 **Export/Import** - Backup and restore your content as JSON
- 🚀 **Zero Configuration** - No build process, just open and use
- 🆓 **100% Free** - Host on GitHub Pages at no cost

## Quick Start

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/raleec/swa_wp.git
   cd swa_wp
   ```

2. Open `index.html` in your web browser

3. Visit the Admin panel at `admin.html` to create your first post

### Deploy to GitHub Pages

1. Push this repository to GitHub

2. Go to your repository Settings → Pages

3. Under "Source", select your main branch

4. Click "Save"

5. Your site will be live at `https://yourusername.github.io/repository-name/`

## How It Works

This system uses:
- **HTML/CSS/JavaScript** - Pure static files, no build process needed
- **localStorage** - Posts are stored in your browser's local storage
- **Client-side rendering** - All content is dynamically loaded via JavaScript

## Security

- **HTML Sanitization**: Titles, authors, excerpts, and tags are automatically sanitized to prevent XSS attacks
- **Content Field**: The content field supports HTML by design. Only add content from trusted sources
- **Import Validation**: Imported JSON files are validated before being added to the system
- **No Server**: Being client-side only eliminates many server-side security concerns

## Usage Guide

### Creating a Post

1. Navigate to `admin.html`
2. Fill out the post form:
   - **Title**: Your post heading
   - **Slug**: URL-friendly identifier (auto-generated from title)
   - **Excerpt**: Brief summary for the homepage
   - **Content**: Full post content (HTML supported)
   - **Author**: Your name
   - **Tags**: Comma-separated tags
3. Click "Save Post"

### Editing a Post

1. Go to the Admin panel
2. Find your post in the list
3. Click "Edit"
4. Modify the fields
5. Click "Save Post"

### Deleting a Post

1. Go to the Admin panel
2. Click "Delete" next to the post
3. Confirm deletion

### Backing Up Your Content

1. Go to the Admin panel
2. Scroll to "Export/Import"
3. Click "Export All Posts (JSON)"
4. Save the downloaded file

### Restoring Content

1. Go to the Admin panel
2. Scroll to "Export/Import"
3. Choose your JSON file
4. Confirm the import

## Customization

### Change Site Title

Edit the `<h1 class="site-title">` in:
- `index.html`
- `post.html`
- `admin.html`

### Modify Styling

All styles are in `css/style.css`. You can customize:
- Colors (search for hex codes like `#2c3e50`)
- Fonts (modify the `font-family` declarations)
- Layout (adjust grid and spacing)

### Add More Pages

1. Create a new HTML file (e.g., `about.html`)
2. Copy the header/footer from `index.html`
3. Add your content
4. Link to it in the navigation

## File Structure

```
swa_wp/
├── index.html          # Homepage with post listing
├── post.html           # Single post view
├── admin.html          # Admin panel for post management
├── css/
│   └── style.css       # All styling
├── js/
│   ├── app.js          # Homepage functionality
│   ├── post.js         # Single post functionality
│   └── admin.js        # Admin panel functionality
└── data/
    └── (optional JSON files)
```

## Technical Details

### Data Storage

Posts are stored in the browser's localStorage. This means:
- ✅ No server needed
- ✅ Instant saves
- ❌ Data is browser-specific (not synced across devices)
- ❌ Clearing browser data will delete posts

**Recommendation**: Regularly export your posts as JSON for backup.

### Browser Compatibility

Works with all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Optimum Setup for GitHub Pages

This repository is already optimized for GitHub Pages:

1. **No Build Process** - Static files work immediately
2. **Relative Paths** - All links work in any directory
3. **Client-side Rendering** - No server-side code needed
4. **localStorage** - Data persistence without a database

### Optional: Jekyll Configuration

If you want to use Jekyll features (optional), create a `_config.yml`:

```yaml
title: My WordPress-like Site
description: A static blog powered by GitHub Pages
theme: null
```

Add this `.nojekyll` file to skip Jekyll processing:
```bash
touch .nojekyll
```

## Advanced Features

### Syntax Highlighting

Add Prism.js for code highlighting:

```html
<!-- Add to <head> in all HTML files -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
```

### Comments

Integrate with services like:
- Disqus
- Utterances (GitHub issues as comments)
- Giscus (GitHub discussions as comments)

### Analytics

Add Google Analytics or Plausible for tracking.

## FAQ

**Q: Can I use a custom domain?**  
A: Yes! Configure it in GitHub Pages settings.

**Q: How do I migrate from WordPress?**  
A: Export your WordPress posts, convert to JSON format matching this structure, and import.

**Q: Is this suitable for a high-traffic blog?**  
A: Yes! GitHub Pages is powered by a CDN and can handle significant traffic.

**Q: Can multiple people manage posts?**  
A: Posts are in localStorage, so each browser has its own copy. Use export/import to share, or commit the JSON to the repository.

**Q: How do I add images?**  
A: Upload images to the repository or use external hosting (Imgur, etc.), then reference in HTML.

## Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - feel free to use for any project!

## Credits

Built as a demonstration of static site capabilities on GitHub Pages. Inspired by WordPress but designed to be simpler and completely static.

## Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for the static web
