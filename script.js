// script.js (පවතින මෙනු කෝඩ් එක වෙනුවට මෙය දමන්න)

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// මෙනුව Toggle කරන ශ්‍රිතය (Open/Close)
function toggleMenu() {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // Blur Effect එක සහ ස්ක්‍රෝල් වීම වැළැක්වීමට
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// මෙනු එකෙන් ලින්ක් එකක් ක්ලික් කළ විට මෙනුව වැසීම
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', toggleMenu);
});

function setNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    const height = navbar.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', height + 'px');
}

// පිටුව Load වූ විට සහ තිරය Resize වූ විට ක්‍රියාත්මක වීමට
window.addEventListener('load', setNavbarHeight);
window.addEventListener('resize', setNavbarHeight);

// මෙනුව විවෘත වූ පසු පිටත (Blur වූ කොටස) ක්ලික් කළ විටද මෙනුව වැසීමට
document.addEventListener('click', (e) => {
    // මෙනුව විවෘතව ඇත්නම් සහ ක්ලික් කළේ මෙනුව හෝ toggle button එක මත නොවේ නම්
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

// 2. Google Apps Script URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz3LB7u6IczMIGri3jzR7mnTT5NhGlLs-obzuHRDWc0_qjm_owM9CROHj-tXXW6PPClCw/exec';

// 3. Booking Form එක පාලනය කිරීම
const bookingForm = document.getElementById('bookingForm');
const overlayModal = document.getElementById('overlayModal');
const loaderContent = document.getElementById('loaderContent');
const successContent = document.getElementById('successContent');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Loading එක පෙන්වන්න
        if (overlayModal) {
            overlayModal.style.display = 'flex';
            loaderContent.style.display = 'block';
            successContent.style.display = 'none';
        }

        const formData = new FormData(bookingForm);

        // Checkbox දත්ත සකස් කිරීම
        const selected = Array.from(bookingForm.querySelectorAll('input[name="Select_Destinations"]:checked'))
            .map(cb => cb.value)
            .join(', ');

        formData.delete('Select_Destinations'); 
        formData.append('Select_Destinations', selected); 

        // Google Script එකට යැවීම
        fetch(WEB_APP_URL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then(data => {
            if (overlayModal) {
                loaderContent.style.display = 'none';
                successContent.style.display = 'block';
            } else {
                // ඔබ ඉල්ලූ Notification පෙන්වීම
                document.getElementById('notification').style.display = 'block';
            }
            bookingForm.reset();
        })
        .catch(err => {
            console.error(err);
            alert("Error sending booking. Please try again.");
            if (overlayModal) overlayModal.style.display = 'none';
        });
    });
}

// Notification සහ Modal වැසීමට
function closeNotification() {
    document.getElementById('notification').style.display = 'none';
}

function closeModal() {
    if (overlayModal) {
        overlayModal.style.display = 'none';
    }
}

// 4. පින්තූර Upload කිරීම (Gallery)
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
    deleteBtn.style.background = 'rgba(255, 0, 0, 0.7)';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '50%';
    deleteBtn.style.width = '30px';
    deleteBtn.style.height = '30px';
    deleteBtn.style.cursor = 'pointer';

    deleteBtn.onclick = function() {
        container.remove();
    };
    
    container.appendChild(img);
    container.appendChild(deleteBtn);
    gallery.insertBefore(container, uploadBox);
}

function addNewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            createGalleryItem(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// script.js හි අගට එකතු කරන්න
const closeMenu = document.getElementById('closeMenu');
if (closeMenu) {
    closeMenu.addEventListener('click', toggleMenu);
}
