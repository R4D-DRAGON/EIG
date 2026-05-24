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

// 6. Form Submission (Booking එක Google Sheet එකට යැවීම)
const bookingForm = document.querySelector('.booking-form');
const notification = document.getElementById('notification');

if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
        e.preventDefault(); // සාමාන්‍ය විදියට page එක වෙනස් වෙන එක (reload වෙන එක) නවත්වනවා

        // Submit බට්න් එකේ text එක වෙනස් කිරීම (යැවෙන බව පෙන්වන්න)
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        // Form එකේ දත්ත ටික එකතු කිරීම
        const formData = new FormData(bookingForm);

        // Fetch මගින් Google Script එකට data යැවීම
        fetch(WEB_APP_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // සාර්ථකව යැවුනාම notification එක පෙන්වීම
            notification.style.display = 'block';
            bookingForm.reset(); // ෆෝම් එක හිස් කිරීම
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("There was an error sending your booking. Please try again.");
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

// 7. Notification එක Close කිරීම
function closeNotification() {
    if (notification) {
        notification.style.display = 'none';
    }
}
