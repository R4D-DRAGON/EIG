// මෙනු ටොගල් කිරීම
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. ඔබගේ නව Web App URL එක මෙතැනට දමන්න (Deploy පසු ලැබුණු URL එක)
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwMsWmmSaPE48WRSzeP-O0HOJ5WKtbgekjEWylLZCbLt5WgQPXwskm7GbMZkiodnLSvnA/exec';

// 3. පින්තූර අයිතමයක් නිර්මාණය කිරීම
function createGalleryItem(imageUrl) {
    const gallery = document.querySelector('.gallery-grid');
    const uploadBox = document.querySelector('.upload-box');
    
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.width = '200px'; 
    img.style.height = '200px'; 
    img.style.objectFit = 'cover';
    img.style.borderRadius = '10px';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '✕';
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.top = '10px';
    deleteBtn.style.right = '10px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.background = 'rgba(255, 255, 255, 0.8)';
    deleteBtn.style.color = '#ff4757';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '50%';
    deleteBtn.style.width = '30px';
    deleteBtn.style.height = '30px';
    
    deleteBtn.onclick = () => {
        let password = prompt("Admin Password Required:");
        if (password) {
            fetch(WEB_APP_URL, {
                method: 'POST',
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({ action: "delete", url: imageUrl, password: password })
            }).then(() => {
                container.remove();
                alert("Deleted successfully!");
            });
        }
    };

    container.appendChild(img);
    container.appendChild(deleteBtn);
    gallery.insertBefore(container, uploadBox);
}
    .catch(err => {
        console.error("Error loading images:", err);
        alert("පින්තූර පූරණය කිරීමට නොහැකි විය. කරුණාකර Web App URL එක නිවැරදි දැයි බලන්න.");
    });
}

// 5. පින්තූර Upload කිරීම
function addNewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    alert("Uploading... Please wait.");
    const formData = new FormData();
    formData.append('image', file);
    
    fetch('https://api.imgbb.com/1/upload?key=6a1643645130812a42437897fa8f60c5', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        const imageUrl = result.data.url;
        fetch(WEB_APP_URL, {
            method: 'POST',
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({ action: "add", url: imageUrl })
        }).then(() => {
            loadGallery(); // පින්තූරය එකතු කළ පසු නැවත ලැයිස්තුව පූරණය කරන්න
            alert("Image uploaded successfully!");
        });
    })
    .catch(err => alert("Upload failed!"));
}

