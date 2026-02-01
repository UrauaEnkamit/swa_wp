// Main application script for the home page

// Initialize posts storage
function getPosts() {
    const posts = localStorage.getItem('blog_posts');
    return posts ? JSON.parse(posts) : getDefaultPosts();
}

function getDefaultPosts() {
    const defaultPosts = [
        {
            id: 1,
            title: "Welcome to Your WordPress-like Site",
            slug: "welcome-to-your-site",
            excerpt: "This is a static WordPress-like site that runs entirely on GitHub Pages. No server required!",
            content: "<p>Welcome to your new WordPress-like static site! This system is designed to give you the familiar WordPress experience while being completely static and hostable on GitHub Pages.</p><h2>Features</h2><ul><li>Static HTML/CSS/JavaScript - no server required</li><li>Post management through the admin panel</li><li>Client-side search functionality</li><li>Responsive design</li><li>All data stored in localStorage</li></ul><h2>Getting Started</h2><p>Click on the 'Admin' link in the navigation to create your first post. All posts are stored in your browser's localStorage.</p><p>To deploy this to GitHub Pages, simply push this repository to GitHub and enable GitHub Pages in the repository settings.</p>",
            author: "Admin",
            date: new Date().toISOString(),
            tags: ["welcome", "getting-started", "github-pages"]
        },
        {
            id: 2,
            title: "How to Use the Admin Panel",
            slug: "how-to-use-admin-panel",
            excerpt: "Learn how to create, edit, and manage your posts using the built-in admin panel.",
            content: "<p>The admin panel is your central hub for managing content on your site.</p><h2>Creating a New Post</h2><p>Simply fill out the form with your post details:</p><ul><li><strong>Title:</strong> The main heading of your post</li><li><strong>Slug:</strong> The URL-friendly version (e.g., 'my-first-post')</li><li><strong>Excerpt:</strong> A short summary shown on the home page</li><li><strong>Content:</strong> The full post content (HTML is supported)</li><li><strong>Author:</strong> Your name</li><li><strong>Tags:</strong> Comma-separated tags for categorization</li></ul><h2>Editing Posts</h2><p>Click the 'Edit' button next to any post in the admin panel to modify it.</p><h2>Exporting Your Posts</h2><p>Use the export button to download all your posts as JSON. This is useful for backup or migrating to another system.</p>",
            author: "Admin",
            date: new Date(Date.now() - 86400000).toISOString(),
            tags: ["tutorial", "admin", "how-to"]
        },
        {
            id: 3,
            title: "Deploying to GitHub Pages",
            slug: "deploying-to-github-pages",
            excerpt: "Step-by-step guide to deploy your site to GitHub Pages and make it publicly accessible.",
            content: "<p>Deploying your site to GitHub Pages is simple and free!</p><h2>Steps to Deploy</h2><ol><li>Push this repository to GitHub</li><li>Go to your repository settings</li><li>Navigate to 'Pages' in the left sidebar</li><li>Select the branch you want to deploy (usually 'main' or 'master')</li><li>Click 'Save'</li></ol><p>GitHub will provide you with a URL like <code>https://yourusername.github.io/repository-name</code></p><h2>Custom Domain</h2><p>You can also configure a custom domain in the GitHub Pages settings if you have one.</p><h2>Important Notes</h2><ul><li>All posts are stored in localStorage, so they're specific to each browser</li><li>To persist posts across deployments, use the export/import feature</li><li>Consider committing your posts.json to the repository</li></ul>",
            author: "Admin",
            date: new Date(Date.now() - 172800000).toISOString(),
            tags: ["deployment", "github-pages", "tutorial"]
        }
    ];
    
    localStorage.setItem('blog_posts', JSON.stringify(defaultPosts));
    return defaultPosts;
}

function displayPosts(posts) {
    const container = document.getElementById('posts-container');
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p class="text-center">No posts found. Create your first post in the <a href="admin.html">Admin Panel</a>!</p>';
        return;
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = posts.map(post => `
        <article class="post-card">
            <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
            <div class="post-meta">
                By ${post.author} on ${formatDate(post.date)}
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
            ${post.tags && post.tags.length > 0 ? `
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            <a href="post.html?id=${post.id}" class="read-more">Read More &rarr;</a>
        </article>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function setupSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    const searchInput = document.getElementById('search-input');
    
    if (!searchToggle || !searchBar || !searchInput) return;
    
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
        if (searchBar.style.display === 'block') {
            searchInput.focus();
        }
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const posts = getPosts();
        
        if (!query) {
            displayPosts(posts);
            return;
        }
        
        const filtered = posts.filter(post => 
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
        );
        
        displayPosts(filtered);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const posts = getPosts();
    displayPosts(posts);
    setupSearch();
});
