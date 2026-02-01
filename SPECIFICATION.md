# SWA_WP Specification

## Project Overview

SWA_WP is a Static Web Application inspired by WordPress, designed for Git Pages. It combines the familiar content management experience of WordPress with the simplicity, security, and performance of a static site generator. Content is managed through Git-based workflows using Markdown files, enabling version control, collaboration, and seamless deployment to static hosting platforms.

## System Architecture

### Static Site Generator Approach

The system follows a **static site generator (SSG)** architecture pattern:

1. **Content Layer**: Markdown files stored in a Git repository
2. **Build Layer**: Static site generator that transforms content into HTML
3. **Deployment Layer**: Static files served via CDN/Git Pages
4. **Management Layer**: Web-based UI for content editing (optional)

#### Architecture Components

```
┌─────────────────────────────────────────────────────────┐
│                     Git Repository                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Content    │  │    Themes    │  │   Plugins    │  │
│  │  (Markdown)  │  │  (Templates) │  │   (Extensions)│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   Build Process                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  1. Read content files                            │  │
│  │  2. Process markdown → HTML                       │  │
│  │  3. Apply theme templates                         │  │
│  │  4. Execute plugin hooks                          │  │
│  │  5. Generate static assets                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Static Output                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │     HTML     │  │     CSS      │  │      JS      │  │
│  │    Assets    │  │    Images    │  │    Feeds     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Deployment (Git Pages/CDN)                  │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack Considerations

- **Core Language**: Node.js / Python / Go (to be determined based on performance and ecosystem)
- **Markdown Parser**: CommonMark or GitHub Flavored Markdown (GFM)
- **Template Engine**: Liquid / Handlebars / Nunjucks
- **CSS Framework**: Tailwind CSS / Bootstrap (themable)
- **Build Tool**: Webpack / Vite / esbuild
- **CLI Framework**: Commander.js / Click / Cobra

## Core Features

### 1. Content Management

#### Posts
- Markdown-based blog posts with frontmatter metadata
- Categories and tags support
- Draft/published status
- Scheduled publishing via frontmatter dates
- Featured images
- Custom post types

#### Pages
- Static pages (About, Contact, etc.)
- Hierarchical page structure
- Custom page templates
- Reusable content blocks

#### Media Management
- Image optimization and responsive images
- Asset organization in `/media` directory
- Image galleries
- Alt text and metadata support

#### Content Organization
```
/content
  /posts
    /2024
      2024-01-15-first-post.md
      2024-02-20-second-post.md
  /pages
    about.md
    contact.md
  /media
    /images
    /videos
    /documents
```

### 2. Theme System

#### Theme Structure
```
/themes
  /theme-name
    /templates
      layout.html
      post.html
      page.html
      archive.html
      index.html
    /assets
      /css
      /js
      /images
    theme.json (theme metadata and configuration)
    README.md
```

#### Theme Features
- Template inheritance and partials
- Custom CSS and JavaScript
- Responsive design support
- Theme configuration via `theme.json`
- Multiple theme support (switch between themes)
- Child theme support for customization

### 3. Plugin System

#### Plugin Architecture
- Hook-based system (filters and actions)
- Plugin lifecycle events (init, build, post-build)
- Data transformation capabilities
- Custom shortcodes support
- Plugin dependencies management

#### Plugin Structure
```
/plugins
  /plugin-name
    index.js (or main.py)
    plugin.json (metadata and configuration)
    README.md
```

#### Built-in Plugin Hooks
- `before_build`: Execute before build starts
- `after_content_load`: Modify content after loading
- `before_render`: Modify data before template rendering
- `after_render`: Modify HTML after rendering
- `after_build`: Execute after build completes

### 4. Search Functionality
- Client-side search using JSON index
- Optional integration with external search services
- Full-text search on posts and pages

### 5. RSS/Atom Feeds
- Automatic feed generation
- Multiple feed support (posts, categories, tags)

### 6. SEO Features
- Customizable meta tags
- Sitemap generation
- Robots.txt generation
- Open Graph and Twitter Card support
- Structured data (JSON-LD)

### 7. Analytics Integration
- Support for Google Analytics, Plausible, etc.
- Privacy-focused analytics options

## Technical Requirements and Constraints

### Functional Requirements
1. **Build Performance**: Generate 1000 pages in under 30 seconds
2. **Incremental Builds**: Only rebuild changed content
3. **Live Preview**: Development server with hot reload
4. **Cross-platform**: Support Windows, macOS, Linux
5. **Offline Capability**: All build processes work offline

### Non-Functional Requirements
1. **Performance**: Static output should score 95+ on Lighthouse
2. **Security**: No server-side vulnerabilities (static files only)
3. **Accessibility**: WCAG 2.1 Level AA compliance
4. **SEO**: Proper semantic HTML and meta tags
5. **Scalability**: Support sites with 10,000+ pages

### Technical Constraints
1. **No Database**: All data in files (Git repository)
2. **No Server Runtime**: Static files only (no Node/PHP/Python at runtime)
3. **Git-based**: All content versioned in Git
4. **Standard Formats**: Markdown for content, JSON for configuration
5. **Portability**: No platform-specific dependencies

### Browser Support
- Modern browsers (last 2 versions)
- Progressive enhancement for older browsers
- Mobile-first responsive design

## Data Storage Approach

### Git-Based Storage

All content, configuration, and assets are stored in a Git repository, providing:
- **Version Control**: Full history of all changes
- **Collaboration**: Multiple authors via Git workflows
- **Backup**: Distributed copies of content
- **Rollback**: Easy reversion to previous states
- **Branching**: Testing changes in isolation

### File Structure
```
/
├── content/              # All site content
│   ├── posts/           # Blog posts
│   ├── pages/           # Static pages
│   └── media/           # Images, videos, files
├── themes/              # Theme templates and assets
│   └── default/
├── plugins/             # Custom plugins
├── config/              # Configuration files
│   ├── site.json       # Site-wide configuration
│   └── navigation.json # Menu structure
├── output/              # Generated static files (gitignored)
└── swa_wp.json         # Main configuration file
```

### Content Format: Markdown with Frontmatter

```markdown
---
title: "My First Post"
date: 2024-01-15T10:30:00Z
author: "John Doe"
categories: ["Technology", "Tutorial"]
tags: ["static-site", "jamstack"]
featured_image: "/media/images/featured.jpg"
status: "published"
excerpt: "A brief description of the post"
---

# Post Content

Your markdown content here...
```

### Configuration Format: JSON

**swa_wp.json** (Main Configuration)
```json
{
  "site": {
    "title": "My Site",
    "description": "A static site powered by SWA_WP",
    "url": "https://example.com",
    "language": "en",
    "timezone": "UTC"
  },
  "theme": "default",
  "plugins": [
    "rss-generator",
    "sitemap-generator",
    "image-optimizer"
  ],
  "build": {
    "output": "output",
    "clean": true,
    "minify": true
  },
  "server": {
    "port": 3000,
    "livereload": true
  }
}
```

### Data Access Patterns
- **Read**: Parse markdown files on build
- **Write**: Via Git commits (manual or through UI)
- **Query**: In-memory filtering during build
- **Cache**: Build cache for unchanged files

## Build and Deployment Workflow

### Local Development Workflow

1. **Setup**
   ```bash
   # Install SWA_WP
   npm install -g swa_wp
   
   # Initialize new site
   swa_wp init my-site
   cd my-site
   
   # Install dependencies
   npm install
   ```

2. **Development**
   ```bash
   # Start development server with live reload
   swa_wp serve
   
   # Create new post
   swa_wp new post "My Post Title"
   
   # Create new page
   swa_wp new page "About"
   ```

3. **Build**
   ```bash
   # Build for production
   swa_wp build
   
   # Build with specific environment
   swa_wp build --env production
   ```

### Build Process

```
1. Read Configuration
   ↓
2. Load Plugins
   ↓
3. Scan Content Directory
   ↓
4. Parse Markdown Files
   ↓
5. Process Frontmatter
   ↓
6. Execute Plugin Hooks (before_render)
   ↓
7. Apply Theme Templates
   ↓
8. Generate Static HTML
   ↓
9. Optimize Assets (minify, compress)
   ↓
10. Copy Static Files
   ↓
11. Generate Feeds & Sitemap
   ↓
12. Execute Plugin Hooks (after_build)
   ↓
13. Output to /output directory
```

### Deployment Options

#### GitHub Pages
```bash
# Deploy to GitHub Pages
swa_wp deploy --github

# Or via GitHub Actions (automated)
```

**GitHub Actions Workflow**:
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build site
        run: |
          npm install -g swa_wp
          swa_wp build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./output
```

#### Netlify
```bash
# netlify.toml
[build]
  command = "swa_wp build"
  publish = "output"
```

#### Vercel
```bash
# vercel.json
{
  "buildCommand": "swa_wp build",
  "outputDirectory": "output"
}
```

#### Custom Server
```bash
# Build and rsync to server
swa_wp build
rsync -avz output/ user@server:/var/www/html/
```

### Continuous Integration/Continuous Deployment (CI/CD)

- **Automated Builds**: Trigger on Git push
- **Preview Deployments**: Branch-based previews
- **Rollback**: Easy revert to previous deployments
- **Build Notifications**: Slack/Email on build status

## User Roles and Authentication Approach

### User Roles (Git-based)

Since SWA_WP is Git-based and generates static sites, traditional user authentication is not applicable at runtime. Instead, roles are managed through Git repository permissions:

#### 1. **Administrator**
- **Git Permission**: Write access to main branch
- **Capabilities**:
  - Merge pull requests
  - Configure site settings
  - Install/remove themes and plugins
  - Manage deployment settings
  - Access to all content

#### 2. **Editor**
- **Git Permission**: Write access, branch creation
- **Capabilities**:
  - Create and edit all posts/pages
  - Submit pull requests for main branch
  - Upload media files
  - Edit content metadata

#### 3. **Author**
- **Git Permission**: Branch creation, limited write
- **Capabilities**:
  - Create and edit own posts
  - Submit posts for review (pull request)
  - Upload own media files

#### 4. **Contributor**
- **Git Permission**: Fork repository
- **Capabilities**:
  - Submit posts via pull requests
  - Suggest edits to existing content

### Optional Admin UI Authentication

For sites that implement a web-based content editing interface:

#### Authentication Methods
1. **GitHub OAuth**: Authenticate using GitHub account
   - Leverage existing GitHub permissions
   - Single sign-on experience
   - No separate user database needed

2. **Git Provider OAuth**: GitLab, Bitbucket integration
   - Similar to GitHub OAuth
   - Multi-platform support

3. **Static Admin Panel**: 
   - Client-side editor (like Netlify CMS, Forestry)
   - Commits directly to Git repository
   - Uses OAuth for authentication

#### Implementation Example
```javascript
// Admin UI authentication flow
1. User visits /admin
2. Redirects to GitHub OAuth
3. GitHub returns access token
4. Client-side app uses token to:
   - Read repository contents
   - Create/update files via GitHub API
   - Commit changes to repository
5. Automated build triggered on commit
```

### Security Considerations

- **No Runtime Authentication**: Static site has no login system
- **Admin Panel Security**: Separate authentication for content editing UI
- **API Token Management**: Secure storage of Git provider tokens
- **Branch Protection**: Require reviews for production deployments
- **Signed Commits**: Verify commit authors

## Extensibility Model

### Plugin System

#### Plugin API

Plugins can hook into various stages of the build process:

```javascript
// Example plugin structure (Node.js)
module.exports = {
  name: 'my-plugin',
  version: '1.0.0',
  
  // Lifecycle hooks
  init: function(config) {
    // Plugin initialization
  },
  
  hooks: {
    before_build: async function(context) {
      // Execute before build starts
    },
    
    after_content_load: async function(content) {
      // Modify content after loading
      return content;
    },
    
    before_render: async function(data) {
      // Modify template data
      return data;
    },
    
    after_render: async function(html) {
      // Modify rendered HTML
      return html;
    },
    
    after_build: async function(output) {
      // Execute after build completes
    }
  },
  
  // Custom CLI commands
  commands: {
    'my-command': function(args) {
      // Custom command implementation
    }
  },
  
  // Template filters
  filters: {
    'uppercase': function(str) {
      return str.toUpperCase();
    }
  },
  
  // Shortcodes
  shortcodes: {
    'gallery': function(attrs, content) {
      // Generate gallery HTML
      return `<div class="gallery">...</div>`;
    }
  }
};
```

#### Plugin Discovery

Plugins are loaded from:
1. `/plugins` directory (local plugins)
2. `node_modules/swa_wp-plugin-*` (npm packages)
3. Configuration file `plugins` array

#### Plugin Configuration

Plugins can have their own configuration in `swa_wp.json`:

```json
{
  "plugins": [
    {
      "name": "image-optimizer",
      "enabled": true,
      "config": {
        "quality": 85,
        "formats": ["webp", "jpg"]
      }
    }
  ]
}
```

### Theme System

#### Theme Customization

Themes can be extended via:

1. **Child Themes**: Override parent theme templates
2. **Theme Hooks**: JavaScript hooks for theme initialization
3. **Custom CSS**: Add custom stylesheets
4. **Theme Options**: JSON configuration for theme settings

#### Theme API

```javascript
// theme.json
{
  "name": "My Theme",
  "version": "1.0.0",
  "parent": "default",  // Optional parent theme
  "config": {
    "colors": {
      "primary": "#007bff",
      "secondary": "#6c757d"
    },
    "layout": {
      "sidebar": true,
      "width": "1200px"
    }
  },
  "templates": {
    "post": "templates/post.html",
    "page": "templates/page.html",
    "archive": "templates/archive.html"
  }
}
```

### Content Type System

Custom post types can be defined:

```json
// config/post-types.json
{
  "portfolio": {
    "label": "Portfolio Items",
    "directory": "content/portfolio",
    "template": "portfolio-item.html",
    "fields": {
      "client": "string",
      "project_date": "date",
      "technologies": "array"
    }
  }
}
```

### Custom Fields (Frontmatter Schema)

Define custom frontmatter fields:

```json
// config/fields.json
{
  "post": {
    "custom_field": {
      "type": "string",
      "required": false,
      "default": ""
    },
    "rating": {
      "type": "number",
      "min": 1,
      "max": 5
    }
  }
}
```

### API Integration

Plugins can integrate external APIs:

```javascript
// Example: Fetch data from API during build
hooks: {
  before_build: async function(context) {
    const data = await fetch('https://api.example.com/data');
    context.external_data = await data.json();
  }
}
```

### Event System

Global event bus for communication between plugins:

```javascript
// Emit event
this.emit('custom_event', data);

// Listen to event
this.on('custom_event', (data) => {
  // Handle event
});
```

## Roadmap and Future Considerations

### Phase 1: Core Features (MVP)
- Basic markdown processing
- Simple theme system
- Command-line interface
- GitHub Pages deployment

### Phase 2: Enhanced Features
- Plugin system
- Advanced theme customization
- Media optimization
- Search functionality

### Phase 3: Optional Admin UI
- Web-based content editor
- Visual theme customizer
- Media library interface

### Phase 4: Advanced Features
- Multilingual support
- E-commerce integration (via plugins)
- Advanced caching strategies
- GraphQL API for content

## Conclusion

SWA_WP aims to provide a familiar WordPress-like experience for content creators while leveraging the benefits of static site generation: security, performance, simplicity, and version control. By building on Git-based workflows and modern web technologies, SWA_WP enables teams to create and manage content efficiently while delivering fast, secure static websites.
