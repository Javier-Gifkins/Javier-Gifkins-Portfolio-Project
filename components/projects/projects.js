// Simple Comments System - Authentication Required

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Test Firebase connection
    console.log('Firebase initialized:', typeof firebase !== 'undefined');
    console.log('Firestore available:', typeof db !== 'undefined');
    
    // Initially show form, will hide if not logged in
    const commentForm = document.getElementById('commentForm');
    const formHeading = document.querySelector('.comment-form-container h3');
    
    // Check auth state
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in - show comment form
            commentForm.style.display = 'block';
            formHeading.innerHTML = 'Place Your Feedback here';
            console.log('User logged in:', user.email);
        } else {
            // User not logged in - hide comment form
            commentForm.style.display = 'none';
            formHeading.innerHTML = '<a href="../home/home.html">Login to post comments</a>';
            console.log('Not logged in');
        }
    });
    
    // Load existing comments when page loads
    loadComments();
    
    // Handle comment form submission
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Stop form from reloading page
        
        const user = firebase.auth().currentUser;
        if (!user) {
            alert('Please login first!');
            return;
        }
        
        console.log('Form submitted!');
        
        // Get form values
        const name = document.getElementById('commentName').value;
        const email = document.getElementById('commentEmail').value;
        const message = document.getElementById('commentMessage').value;
        
        console.log('Attempting to save:', { name, email, message });
        
        // Save to Firestore with userId
        db.collection('comments').add({
            name: name,
            email: email,
            message: message,
            userId: user.uid,
            userEmail: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log('Comment saved successfully!');
            // Success! Clear the form
            document.getElementById('commentForm').reset();
            alert('Comment posted successfully!');
            // Reload comments to show the new one
            loadComments();
        })
        .catch((error) => {
            console.error('Full error details:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            alert('Error posting comment: ' + error.message);
        });
    });
});

// Function to load all comments from Firestore
function loadComments() {
    db.collection('comments')
        .orderBy('timestamp', 'desc') // Newest first
        .get()
        .then((querySnapshot) => {
            const commentsContainer = document.querySelector('.comments-display');
            
            // Clear existing comments except the heading
            const heading = commentsContainer.querySelector('h3');
            commentsContainer.innerHTML = '';
            commentsContainer.appendChild(heading);
            
            // Add each comment
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const commentHTML = createCommentHTML(data);
                commentsContainer.innerHTML += commentHTML;
            });
        })
        .catch((error) => {
            console.error('Error loading comments:', error);
        });
}

// Function to create HTML for a single comment
function createCommentHTML(data) {
    // Get initials from name
    const initials = data.name.split(' ').map(word => word[0]).join('').toUpperCase();
    
    // Format timestamp
    let timeString = 'Just now';
    if (data.timestamp) {
        const date = data.timestamp.toDate();
        timeString = formatDate(date);
    }
    
    return `
        <div class="comment-item">
            <div class="comment-header">
                <div class="author-avatar">${initials}</div>
                <div class="author-details">
                    <span class="author-name">${data.name}</span>
                    <span class="comment-date">${timeString}</span>
                </div>
            </div>
            <div class="comment-content">
                <p>${data.message}</p>
            </div>
        </div>
    `;
}

// Simple date formatting function
function formatDate(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
}
