// 1. මෙනුව (Menu Toggle) සඳහා කේතය
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. බුකින් ෆෝම් සහ නොටිෆිකේෂන් සඳහා කේතය
const form = document.querySelector('.booking-form');
const notification = document.getElementById('notification');

// පණිවිඩය වහන Function එක
function closeNotification() {
    if (notification) {
        notification.classList.remove('show');
        document.body.classList.remove('blur-active');
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 400); 
    }
}

// ෆෝම් එක සබ්මිට් කිරීම
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        // Checkbox දත්ත එකතු කරගැනීම (මෙම නම HTML එකේ name එකට සමාන විය යුතුයි)
        let selectedDestinations = [];
        let checkboxes = document.querySelectorAll('input[name="Select_Destinations"]:checked');
        checkboxes.forEach((checkbox) => {
            selectedDestinations.push(checkbox.value);
        });
        
        // FormData එකක් සාදාගැනීම
        let formData = new FormData(form);
        
        // අදාළ Checkbox පේළියට (String ලෙස) එකතු කිරීම
        formData.set('Select_Destinations', selectedDestinations.join(', '));
        
        // නොටිෆිකේෂන් පෙන්වීම සහ Loading එෆෙක්ට් එක
        notification.innerHTML = `<div class="loader"></div><h3 style="margin-top:15px; color:#333;">Processing...</h3>`;
        notification.style.display = 'block';
        document.body.classList.add('blur-active');
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 50);

        // API වෙත දත්ත යැවීම
        fetch(form.action, { 
            method: 'POST', 
            body: formData 
        })
        .then(response => {
            setTimeout(() => {
                if (response.ok) {
                    form.reset();
                    notification.innerHTML = `<h3 style="color:#25D366;">Success!</h3><p>Your booking has been received.</p>`;
                    setTimeout(() => {
                        closeNotification();
                    }, 2000);
                } else {
                    alert("Something went wrong!");
                    closeNotification();
                }
            }, 1000);
        })
        .catch(error => {
            console.error('Error!', error);
            alert("Error sending data.");
            closeNotification();
        });
    });
}

// 3. පණිවිඩය පේන වෙලාවේ පිටත ක්ලික් කළොත් වහන්න
window.addEventListener('click', function(e) {
    if (notification && notification.classList.contains('show')) {
        if (!notification.contains(e.target) && e.target.tagName !== 'BUTTON') {
            closeNotification();
        }
    }
});

function addNewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const gallery = document.querySelector('.gallery-grid');
            const img = document.createElement('img');
            img.src = e.target.result;
            // Upload box එකට පස්සේ අලුත් පින්තූරය එකතු කරන්න
            gallery.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}

// මෙනුවේ ඇති Link ක්ලික් කළ විට මෙනුව වසා දැමීම
const navLinksItems = document.querySelectorAll('.nav-links li a');

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        // මෙනුව ඇරී තිබේ නම් එය වසන්න
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// --- 1. වෙබ් පිටුව Load වන විට Sheet එකේ ඇති පින්තූර පෙන්වීම ---
window.onload = function() {
    // ඔබේ Google Web App URL එක මෙතනට දාන්න
    const WEB_APP_URL = 'YOUR_DEPLOYED_WEB_APP_URL_HERE';

    fetch(WEB_APP_URL)
    .then(response => response.json())
    .then(data => {
        const gallery = document.querySelector('.gallery-grid');
        data.forEach(url => {
            if (url && url.startsWith('http')) { // URL එකක් තිබේ නම් පමණක්
                const img = document.createElement('img');
                img.src = url;
                // Upload box එකට කලින් පින්තූරය එකතු කරන්න
                gallery.insertBefore(img, gallery.lastElementChild);
            }
        });
    })
    .catch(error => console.error('Error loading images:', error));
};

// --- 2. අලුත් පින්තූරයක් Upload කරන විට ක්‍රියාත්මක වන කොටස ---
function addNewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    // ImgBB වෙත පින්තූරය යැවීම
    fetch('https://api.imgbb.com/1/upload?key=6a1643645130812a42437897fa8f60c5', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        const imageUrl = result.data.url; 

        // Google Sheet වෙත URL එක යැවීම
        fetch('https://script.google.com/macros/s/AKfycbxu6-_64RLfI2UXXP-6hMY2jzVtcCd0Cmor_W3niKQ2dJ9kkvJ1IJ24GeL5m1L3rPj6ig/exec', { // මෙතනත් ඔබේ URL එක දාන්න
            method: 'POST',
            mode: 'no-cors', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: imageUrl })
        })
        .then(() => {
            alert("Image uploaded successfully!");
            
            // ගැලරියට පින්තූරය එකතු කරන්න
            const gallery = document.querySelector('.gallery-grid');
            const img = document.createElement('img');
            img.src = imageUrl;
            gallery.insertBefore(img, gallery.lastElementChild);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Upload failed!");
    });
}
