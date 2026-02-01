// Admin panel script

function getPosts() {
    const posts = localStorage.getItem('blog_posts');
    return posts ? JSON.parse(posts) : [];
}

function savePosts(posts) {
    localStorage.setItem('blog_posts', JSON.stringify(posts));
}

function generateSlug(title) {
    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
}

function getNextId() {
    const posts = getPosts();
    if (posts.length === 0) return 1;
    return Math.max(...posts.map(p => p.id)) + 1;
}

function savePost(postData) {
    const posts = getPosts();
    const existingIndex = posts.findIndex(p => p.id === postData.id);
    
    if (existingIndex >= 0) {
        // Update existing post
        posts[existingIndex] = postData;
    } else {
        // Create new post
        posts.push(postData);
    }
    
    savePosts(posts);
    return postData;
}

function deletePost(id) {
    const posts = getPosts();
    const filtered = posts.filter(p => p.id !== id);
    savePosts(filtered);
}

function displayPostsList() {
    const posts = getPosts();
    const container = document.getElementById('posts-list');
    
    if (posts.length === 0) {
        container.innerHTML = '<p>No posts yet. Create your first post above!</p>';
        return;
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = posts.map(post => `
        <div class="post-item" data-id="${post.id}">
            <div class="post-item-info">
                <h3>${post.title}</h3>
                <p>By ${post.author} on ${new Date(post.date).toLocaleDateString()}</p>
            </div>
            <div class="post-item-actions">
                <button class="btn edit-btn" data-id="${post.id}">Edit</button>
                <button class="btn btn-danger delete-btn" data-id="${post.id}">Delete</button>
            </div>
        </div>
    `).join('');
    
    // Attach event listeners
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            editPost(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            if (confirm('Are you sure you want to delete this post?')) {
                deletePost(id);
                displayPostsList();
            }
        });
    });
}

function editPost(id) {
    const posts = getPosts();
    const post = posts.find(p => p.id === id);
    
    if (!post) return;
    
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-slug').value = post.slug;
    document.getElementById('post-excerpt').value = post.excerpt;
    document.getElementById('post-content').value = post.content;
    document.getElementById('post-author').value = post.author;
    document.getElementById('post-tags').value = post.tags ? post.tags.join(', ') : '';
    
    // Store the ID for updating
    document.getElementById('post-form').dataset.editId = id;
    
    // Scroll to form
    document.getElementById('post-form').scrollIntoView({ behavior: 'smooth' });
}

function clearForm() {
    document.getElementById('post-form').reset();
    delete document.getElementById('post-form').dataset.editId;
}

function setupForm() {
    const form = document.getElementById('post-form');
    const titleInput = document.getElementById('post-title');
    const slugInput = document.getElementById('post-slug');
    
    // Auto-generate slug from title
    titleInput.addEventListener('input', (e) => {
        if (!form.dataset.editId) {
            slugInput.value = generateSlug(e.target.value);
        }
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const slug = document.getElementById('post-slug').value;
        const excerpt = document.getElementById('post-excerpt').value;
        const content = document.getElementById('post-content').value;
        const author = document.getElementById('post-author').value;
        const tagsInput = document.getElementById('post-tags').value;
        const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];
        
        const editId = form.dataset.editId;
        
        const postData = {
            id: editId ? parseInt(editId) : getNextId(),
            title,
            slug,
            excerpt,
            content,
            author,
            tags,
            date: editId ? getPosts().find(p => p.id === parseInt(editId)).date : new Date().toISOString()
        };
        
        savePost(postData);
        clearForm();
        displayPostsList();
        
        alert(editId ? 'Post updated successfully!' : 'Post created successfully!');
    });
}

function setupExport() {
    const exportBtn = document.getElementById('export-btn');
    
    exportBtn.addEventListener('click', () => {
        const posts = getPosts();
        const dataStr = JSON.stringify(posts, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'blog-posts.json';
        link.click();
        URL.revokeObjectURL(url);
    });
}

function validatePost(post) {
    // Validate required fields
    if (!post.id || !post.title || !post.slug || !post.content || !post.author || !post.date) {
        return false;
    }
    
    // Validate types
    if (typeof post.id !== 'number' || typeof post.title !== 'string' || 
        typeof post.slug !== 'string' || typeof post.content !== 'string' ||
        typeof post.author !== 'string' || typeof post.date !== 'string') {
        return false;
    }
    
    // Validate tags if present
    if (post.tags && !Array.isArray(post.tags)) {
        return false;
    }
    
    return true;
}

function setupImport() {
    const importFile = document.getElementById('import-file');
    
    importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const posts = JSON.parse(event.target.result);
                if (Array.isArray(posts)) {
                    // Validate all posts
                    const validPosts = posts.filter(validatePost);
                    
                    if (validPosts.length === 0) {
                        alert('No valid posts found in the file');
                        return;
                    }
                    
                    if (validPosts.length < posts.length) {
                        if (!confirm(`Found ${validPosts.length} valid posts out of ${posts.length}. Import valid posts only?`)) {
                            return;
                        }
                    }
                    
                    if (confirm(`This will import ${validPosts.length} posts. Continue?`)) {
                        savePosts(validPosts);
                        displayPostsList();
                        alert('Posts imported successfully!');
                    }
                } else {
                    alert('Invalid JSON format');
                }
            } catch (error) {
                alert('Error parsing JSON file');
            }
        };
        reader.readAsText(file);
        
        // Clear the file input
        e.target.value = '';
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupForm();
    setupExport();
    setupImport();
    displayPostsList();
});
