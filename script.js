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

// 2. Web App URL (අලුත් Deployment URL එක මෙතනට දාන්න)
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyo5tmabrvcvD68RYzSw-smZkmPWN-tk-Q0ssRQZ3BDempJfDRXre5VzDieizCKpB4OQg/exec';

// 3. පින්තූර අයිතමයක් නිර්මාණය කිරීම (Gallery Function)
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

// පින්තූර Upload කිරීම
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

// 4. Booking Form Submission (දත්ත යැවීම සහ Loading පෙන්වීම)
const bookingForm = document.getElementById('bookingForm');
const overlayModal = document.getElementById('overlayModal');
const loaderContent = document.getElementById('loaderContent');
const successContent = document.getElementById('successContent');

if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
        e.preventDefault(); // Page එක reload වෙන එක නවත්වයි

        // Loading Modal එක පෙන්වීම
        if (overlayModal && loaderContent && successContent) {
            overlayModal.style.display = 'flex';
            loaderContent.style.display = 'block';
            successContent.style.display = 'none';
        }

        const formData = new FormData(bookingForm);

        // Checkbox වල තෝරපු Destinations ඔක්කොම අරගෙන කොමා (,) දාලා එකතු කිරීම
        const selectedDestinations = Array.from(bookingForm.querySelectorAll('input[name="Select_Destinations"]:checked'))
            .map(checkbox => checkbox.value)
            .join(', '); 
            
        // පරණ Destinations මකලා, අලුත් කොමා දාපු Destinations ටික formData එකට දානවා
        formData.delete('Select_Destinations');
        formData.append('Select_Destinations', selectedDestinations);

        // Google Script එකට යැවීම
        fetch(WEB_APP_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(overlayModal) {
                // යැවීම සාර්ථක නම් Loading එක වහලා Success මැසේජ් එක පෙන්වීම
                loaderContent.style.display = 'none';
                successContent.style.display = 'block';
            } else {
                alert("Booking successfully sent!");
            }
            bookingForm.reset(); // ෆෝම් එක හිස් කිරීම
        })
        .catch(error => {
            console.error('Error!', error);
            if(overlayModal) overlayModal.style.display = 'none';
            alert("Error sending booking. Please check your connection.");
        });
    });
}

// 5. Modal එක වසා දැමීම (Close Button Function)
function closeModal() {
    if (overlayModal) {
        overlayModal.style.display = 'none';
    }
}
