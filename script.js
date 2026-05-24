// 1. මෙනු සහ Nav Links Toggle කිරීම
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

// 2. Google Apps Script URL (ඔයාගේ Deployment URL එක මෙතනට දාන්න)
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwE1jq1hBG1xNeTl1WdmFILykIWpOYhgwbTyW7P0Lyz7bBq7R-o9GiZFdA1QWPrTsD0AA/exec';

// 3. Booking Form එක පාලනය කිරීම
const bookingForm = document.getElementById('bookingForm');
const overlayModal = document.getElementById('overlayModal'); // Modal එකක් තියෙනවා නම්
const loaderContent = document.getElementById('loaderContent');
const successContent = document.getElementById('successContent');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Loading එක පෙන්වන්න (Modal එක තිබේ නම්)
        if (overlayModal) {
            overlayModal.style.display = 'flex';
            loaderContent.style.display = 'block';
            successContent.style.display = 'none';
        }

        const formData = new FormData(bookingForm);

        // Checkbox වල තෝරපු දත්ත අරගෙන කොමා (,) දාලා එකතු කිරීම
        const selected = Array.from(bookingForm.querySelectorAll('input[name="destinations[]"]:checked'))
            .map(cb => cb.value)
            .join(', ');

        formData.delete('destinations[]'); // පරණ Array එක මකන්න
        formData.append('destinations', selected); // අලුත් string එක add කරන්න

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
                alert("Booking successful!");
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

// Modal එක වසා දැමීම
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
