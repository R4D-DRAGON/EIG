// 1. මෙනුව සහ බුකින් ෆෝම් (ඔබේ පැරණි කේතය)
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
            setTimeout(() => {
                if (response.ok) {
                    form.reset();
                    notification.innerHTML = `<h3 style="color:#25D366;">Success!</h3><p>Your booking has been received.</p>`;
                    setTimeout(() => { closeNotification(); }, 2000);
                } else { alert("Something went wrong!"); closeNotification(); }
            }, 1000);
        })
        .catch(error => { console.error('Error!', error); alert("Error sending data."); closeNotification(); });
    });
}

// 2. පින්තූර පෙන්වන සහ Delete කරන කාර්යයන්
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxvd5t4AdPyyivBWig68Nb3-bhMXvvYg9GHJHiYt33yj91BsTAicKGyWXq_4HMlKh-L/exec';

function createGalleryItem(imageUrl) {
    const gallery = document.querySelector('.gallery-grid');
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.width = '100%';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '⋮'; // තිත් තුන
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.top = '5px';
    deleteBtn.style.right = '5px';
    deleteBtn.style.cursor = 'pointer';

    deleteBtn.onclick = () => {
        if (confirm("Do you want to delete this image?")) {
            fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete", url: imageUrl })
            }).then(() => {
                container.remove();
            });
        }
    };

    container.appendChild(img);
    container.appendChild(deleteBtn);
    gallery.insertBefore(container, gallery.lastElementChild);
}

// පින්තූර Load කිරීම
window.onload = function() {
    fetch(WEB_APP_URL)
    .then(response => response.json())
    .then(data => {
        data.forEach(url => { if (url) createGalleryItem(url); });
    });
};

// පින්තූර Upload කිරීම
function addNewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
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
            mode: 'no-cors',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "add", url: imageUrl })
        }).then(() => {
            createGalleryItem(imageUrl);
            alert("Image uploaded!");
        });
    });
}
