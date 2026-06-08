// script.js (සම්පූර්ණ කෝඩ් එක)

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

// මෙනුව විවෘත වූ පසු පිටත (Blur වූ කොටස) ක්ලික් කළ විටද මෙනුව වැසීමට
document.addEventListener('click', (e) => {
    // මෙනුව විවෘතව ඇත්නම් සහ ක්ලික් කළේ මෙනුව හෝ toggle button එක මත නොවේ නම්
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {toggleMenu();}});

// 2. Google Apps Script URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz3LB7u6IczMIGri3jzR7mnTT5NhGlLs-obzuHRDWc0_qjm_owM9CROHj-tXXW6PPClCw/exec';


// 3. Booking Form එක පාලනය කිරීම (With Modern Loading Modal) - සංශෝධිත කොටස
const bookingForm = document.getElementById('bookingForm');
const bookingModal = document.getElementById('bookingModal');
const modalLoading = document.getElementById('modalLoading');
const modalSuccess = document.getElementById('modalSuccess');
const modalError = document.getElementById('modalError');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Double Click වළක්වන්න සබ්මිට් බටන් එක ලොක් (Disable) කිරීම
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        // Loading ස්ටේට් එක Modal එකට දමා පෙන්වීම
        showModalState(modalLoading);

        const formData = new FormData(bookingForm);

        // Checkbox දත්ත සකස් කිරීම
        const selected = Array.from(bookingForm.querySelectorAll('input[name="Select_Destinations"]:checked'))
            .map(cb => cb.value)
            .join(', ');

        formData.delete('Select_Destinations'); 
        formData.append('Select_Destinations', selected); 

        // Google Script එකට දත්ත යැවීම
        fetch(WEB_APP_URL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json()) // Google Apps Script එකෙන් එන JSON Output එක කියවීම
        .then(data => {
            if (data.result === "success") {
                // බුකින් එක සාර්ථක නම් Success ස්ටේට් එක පෙන්වීම
                showModalState(modalSuccess);
                bookingForm.reset();
            } else {
                // Google එකෙන් Error එකක් ආවොත් Error ස්ටේට් එක පෙන්වීම
                showModalState(modalError);
            }
            if (submitBtn) submitBtn.disabled = false;
        })
        .catch(err => {
            console.error(err);
            // ඉන්ටර්නෙට් නැති වුණොත් හෝ මැසේජ් එක නොගියොත් Error ස්ටේට් එක පෙන්වීම
            showModalState(modalError);
            if (submitBtn) submitBtn.disabled = false;
        });
    });
}

// Modal එක ඇතුළේ වෙනස් වෙන ස්ටේට්ස් (Loading, Success, Error) පාලනය කරන ශ්‍රිතය
function showModalState(activeState) {
    if(modalLoading) modalLoading.classList.remove('active');
    if(modalSuccess) modalSuccess.classList.remove('active');
    if(modalError) modalError.classList.remove('active');
    
    if(activeState) activeState.classList.add('active');
    if(bookingModal) bookingModal.classList.add('show');
}

// Modal එක වසා දැමීමට
function closeBookingModal() {
    if(bookingModal) bookingModal.classList.remove('show');
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


let currentImgIndex = 0;
// ගැලරියේ ඇති සියලුම පින්තූර එකතු කරගැනීම
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// පින්තූරයක් ක්ලික් කළ විට Lightbox විවෘත කිරීම
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImgIndex = index;
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

// වහන පහසුකම
function closeLightbox() {
    lightbox.style.display = 'none';
}

// ඊළඟ පින්තූරයට යාම (Next)
function nextImg() {
    currentImgIndex++;
    if (currentImgIndex >= galleryImages.length) {
        currentImgIndex = 0; // ආපහු මුල් පින්තූරයට එනවා
    }
    lightboxImg.src = galleryImages[currentImgIndex].src;
}

// පෙර පින්තූරයට යාම (Previous)
function prevImg() {
    currentImgIndex--;
    if (currentImgIndex < 0) {
        currentImgIndex = galleryImages.length - 1; // ආපහු අන්තිම පින්තූරයට යනවා
    }
    lightboxImg.src = galleryImages[currentImgIndex].src;
}

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextImg(); // වමට ස්වයිප් කළොත් ඊළඟට
    if (touchEndX > touchStartX + 50) prevImg(); // දකුණට ස්වයිප් කළොත් කලින් එකට
}
