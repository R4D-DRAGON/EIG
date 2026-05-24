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
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxy4_YefHhoqNpH-Dtk8gOMfS4_TzKRJQ8O1YYFozQKJHJhqkx_QfUdnbL1OdHU4DskAA/exec';

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

// Booking Form Submission
const bookingForm = document.querySelector('.booking-form');
const overlayModal = document.getElementById('overlayModal');
const loaderContent = document.getElementById('loaderContent');
const successContent = document.getElementById('successContent');

if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
        e.preventDefault();

        // Loading Modal එක පෙන්වීම
        overlayModal.style.display = 'flex';
        loaderContent.style.display = 'block';
        successContent.style.display = 'none';

        // Form එකේ දත්ත එකතු කිරීම
        const formData = new FormData(bookingForm);

        // Checkbox වල තෝරපු Destinations ඔක්කොම අරගෙන කොමා (,) දාලා එකතු කිරීම
        const selectedDestinations = Array.from(bookingForm.querySelectorAll('input[name="Select_Destinations"]:checked'))
            .map(checkbox => checkbox.value)
            .join(', '); // උදා: "Sigiriya, Ella, Kandy"
            
        // එකතු කරපු Destinations ටික ආයෙත් FormData එකට දානවා
        formData.set('Select_Destinations', selectedDestinations);

        // Google Script එකට යැවීම
        fetch(WEB_APP_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // යැවීම සාර්ථක නම් Loading එක වහලා Success මැසේජ් එක පෙන්වීම
            loaderContent.style.display = 'none';
            successContent.style.display = 'block';
            bookingForm.reset(); // ෆෝම් එක හිස් කිරීම
        })
        .catch(error => {
            console.error('Error!', error);
            alert("Error sending booking. Please check your connection.");
            overlayModal.style.display = 'none';
        });
    });
}

// Modal එක වසා දැමීම
function closeModal() {
    if (overlayModal) {
        overlayModal.style.display = 'none';
    }
}
