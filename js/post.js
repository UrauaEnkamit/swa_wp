// Post page script

// HTML sanitization function for non-HTML fields
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getPosts() {
    const posts = localStorage.getItem('blog_posts');
    return posts ? JSON.parse(posts) : [];
}

function getPostById(id) {
    const posts = getPosts();
    return posts.find(post => post.id === parseInt(id));
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function displayPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        window.location.href = 'index.html';
        return;
    }
    
    const post = getPostById(postId);
    
    if (!post) {
        document.getElementById('post-content').innerHTML = `
            <h1>Post Not Found</h1>
            <p>The post you're looking for doesn't exist.</p>
        `;
        return;
    }
    
    document.title = `${post.title} - My WordPress-like Site`;
    
    document.getElementById('post-content').innerHTML = `
        <h1>${escapeHtml(post.title)}</h1>
        <div class="post-meta">
            By ${escapeHtml(post.author)} on ${formatDate(post.date)}
        </div>
        ${post.tags && post.tags.length > 0 ? `
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
        ` : ''}
        <div class="post-body">
            ${post.content}
        </div>
    `;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', displayPost);
