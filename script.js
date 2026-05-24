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
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbywQnQTyHkc5h7FWX5xjlU2We5qmlbv3Itatb2cJOVghKxJgZ_jqzR9vHNM95Q4EiGTmg/exec';

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

// 2. Booking ෆෝම් එක Google Sheet එකට යැවීම සඳහා කේතය
const form = document.querySelector('.booking-form');
const successMessage = document.getElementById('successMessage');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // පිටුව Reload වීම වළක්වයි
        
        // දත්ත යැවීම
        fetch(form.action, { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(response => {
            if (response.ok) {
                // සාර්ථක නම් පණිවිඩය පෙන්වා ෆෝම් එක හිස් කිරීම
                successMessage.style.display = 'block';
                form.reset();
                
                // තත්පර 5කින් සාර්ථක පණිවිඩය නැවත සැඟවීම
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert("Something went wrong! Please try again.");
            }
        })
        .catch(error => {
            console.error('Error!', error);
            alert("Error sending data. Please check your internet connection.");
        });
    });
}

