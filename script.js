// මෙනු සහ ෆෝම් කේතය
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// 1. මෙනු Toggle කිරීම
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. මෙනුවෙන් link එකක් ක්ලික් කළ පසු එය වැසීම
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 3. Web App URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwMsWmmSaPE48WRSzeP-O0HOJ5WKtbgekjEWylLZCbLt5WgQPXwskm7GbMZkiodnLSvnA/exec';

// 4. පින්තූර අයිතමයක් නිර්මාණය කිරීම (Gallery Function)
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
    // ... (ඔබේ ඉතිරි deleteBtn කේතය මෙතනම තබන්න)
    
    container.appendChild(img);
    container.appendChild(deleteBtn);
    gallery.insertBefore(container, uploadBox);
}

// 5. පින්තූර Upload කිරීම
function addNewImage(event) {
    // ... (ඔබේ ඉතිරි addNewImage කේතය මෙතනම තබන්න)
}
