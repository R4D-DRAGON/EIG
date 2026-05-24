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
