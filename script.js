// 1. මෙනුව සහ බුකින් ෆෝම්
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
    menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
}

const form = document.querySelector('.booking-form');
const notification = document.getElementById('notification');

function closeNotification() {
    if (notification) {
        notification.classList.remove('show');
        document.body.classList.remove('blur-active');
        setTimeout(() => { notification.style.display = 'none'; }, 400);
    }
}

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let selectedDestinations = [];
        let checkboxes = document.querySelectorAll('input[name="Select_Destinations"]:checked');
        checkboxes.forEach((checkbox) => { selectedDestinations.push(checkbox.value); });
        let formData = new FormData(form);
        formData.set('Select_Destinations', selectedDestinations.join(', '));
        
        notification.innerHTML = `<div class="loader"></div><h3 style="margin-top:15px; color:#333;">Processing...</h3>`;
        notification.style.display = 'block';
        document.body.classList.add('blur-active');
        setTimeout(() => { notification.classList.add('show'); }, 50);
        
        fetch(form.action, { method: 'POST', body: formData })
        .then(response => {
            if (response.ok) {
                form.reset();
                notification.innerHTML = `<h3 style="color:#25D366;">Success!</h3><p>Your booking has been received.</p>`;
                setTimeout(() => { closeNotification(); }, 2000);
            } else { alert("Something went wrong!"); closeNotification(); }
        })
        .catch(error => { console.error('Error!', error); alert("Error sending data."); closeNotification(); });
    });
}

// 2. පින්තූර කළමනාකරණය
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxY9v1-kmc1E-cayIGbe-jpEPgUGDVWajrcYC-_sBkvRbsjGM5TtKifrIO4HEvL7FPxzQ/exec';

function createGalleryItem(imageUrl) {
    const gallery = document.querySelector('.gallery-grid');
    const uploadBox = document.querySelector('.upload-box');
    
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.width = '100%';
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
    deleteBtn.style.fontSize = '18px';
    deleteBtn.style.fontWeight = 'bold';
    
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
    
    if (uploadBox) {
        gallery.insertBefore(container, uploadBox);
    } else {
        gallery.appendChild(container);
    }
}

// ගැලරිය නැවුම්ව පෙන්වීමේ ශ්‍රිතය (Cache වළක්වයි)
function loadGallery() {
    const gallery = document.querySelector('.gallery-grid');
    const uploadBox = document.querySelector('.upload-box');
    
    // පවතින පින්තූර ඉවත් කර නැවත Load කිරීම
    const items = gallery.querySelectorAll('.gallery-item');
    items.forEach(item => item.remove());

    fetch(WEB_APP_URL + '?nocache=' + new Date().getTime())
    .then(response => response.json())
    .then(data => {
        data.forEach(url => { if (url) createGalleryItem(url); });
    })
    .catch(err => console.error("Error loading images:", err));
}

// පිටුව Load වන විට පින්තූර පෙන්වීම
window.addEventListener('load', loadGallery);

// පින්තූර Upload කිරීම
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
            loadGallery(); // පින්තූරය එකතු කළ පසු ගැලරිය Refresh කරන්න
            alert("Image uploaded successfully!");
        });
    })
    .catch(err => alert("Upload failed!"));
}
// පින්තූර ගැලරිය Load කරන ශ්‍රිතය
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const uploadBox = document.querySelector('.upload-box');
    
    // 1. කලින් තිබූ පින්තූර ඉවත් කිරීම (uploadBox එක ඉතිරි කරමින්)
    const existingImages = galleryGrid.querySelectorAll('img');
    existingImages.forEach(img => img.remove());

    // 2. Google Sheet එකෙන් URL ලැයිස්තුව ලබා ගැනීම
    fetch(WEB_APP_URL + '?nocache=' + new Date().getTime())
    .then(response => response.json())
    .then(data => {
        data.forEach(url => {
            if (url) {
                // නව img ටැගයක් නිර්මාණය කිරීම
                const newImg = document.createElement('img');
                newImg.src = url;
                newImg.style.width = '100%'; // කැමති විදිහට CSS සාදාගන්න
                newImg.style.height = '200px';
                newImg.style.objectFit = 'cover';
                
                // uploadBox එකට කලින් පින්තූරය ඇතුළු කිරීම
                galleryGrid.insertBefore(newImg, uploadBox);
            }
        });
    })
    .catch(err => console.error("Error loading images:", err));
}

// පිටුව Load වූ විට ක්‍රියාත්මක වීමට
window.addEventListener('load', loadGallery);
