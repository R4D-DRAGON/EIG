// 1. මෙනුව සහ බුකින් ෆෝම්
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
            if (response.ok) {
                form.reset();
                notification.innerHTML = `<h3 style="color:#25D366;">Success!</h3><p>Your booking has been received.</p>`;
                setTimeout(() => { closeNotification(); }, 2000);
            } else { alert("Something went wrong!"); closeNotification(); }
        })
        .catch(error => { console.error('Error!', error); alert("Error sending data."); closeNotification(); });
    });
}

// 2. පින්තූර පෙන්වන සහ Delete කරන කාර්යයන්
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzYP1S9IaNLygGwp1g7bmmbxQAcT000lsAPVOOApTMPYCrmTQpgyDFYNSEbb8_LYmxCeg/exec';

function createGalleryItem(imageUrl) {
    const gallery = document.querySelector('.gallery-grid');
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.width = '100%';
    img.style.height = '200px'; 
    img.style.objectFit = 'cover';
    img.style.borderRadius = '10px';

// Delete Button එකේ මූලික හැඩය
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '✕'; // මෙය වඩාත් පැහැදිලි ලකුණකි
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.top = '10px';
    deleteBtn.style.right = '10px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.background = 'rgba(255, 255, 255, 0.8)'; // සුදු පසුබිම
    deleteBtn.style.color = '#ff4757'; // රතු පාට අකුරු
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '50%'; // රවුම් හැඩය
    deleteBtn.style.width = '30px';
    deleteBtn.style.height = '30px';
    deleteBtn.style.fontSize = '18px';
    deleteBtn.style.fontWeight = 'bold';
    deleteBtn.style.display = 'flex';
    deleteBtn.style.alignItems = 'center';
    deleteBtn.style.justifyContent = 'center';
    deleteBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)'; // සෙවනැල්ලක් (Shadow)
    deleteBtn.style.transition = 'all 0.3s ease'; // සිනිඳු වෙනසක් සඳහා

    // මවුස් එක උඩ තැබූ විට වෙනස් වන විදිය (Hover Effect)
    deleteBtn.onmouseover = () => {
        deleteBtn.style.background = '#ff4757';
        deleteBtn.style.color = 'white';
        deleteBtn.style.transform = 'scale(1.1)';
    };
    deleteBtn.onmouseout = () => {
        deleteBtn.style.background = 'rgba(255, 255, 255, 0.8)';
        deleteBtn.style.color = '#ff4757';
        deleteBtn.style.transform = 'scale(1)';
    };

    deleteBtn.onclick = () => {
        // මුරපද ඉල්ලීම
        let password = prompt("Admin Password Required to delete this image:");
        
        if (password) {
            fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    action: "delete", 
                    url: imageUrl, 
                    password: password // මුරපදය මෙහි යවනු ලැබේ
                })
            }).then(() => {
                alert("If the password was correct, the image is deleted!");
                container.remove();
            });
        }
    };

    container.appendChild(img);
    container.appendChild(deleteBtn);
    gallery.insertBefore(container, gallery.lastElementChild);
}

// පිටුව load වන විට Sheet එකේ දත්ත ගෙන පෙන්වීම
window.addEventListener('load', () => {
    fetch(WEB_APP_URL)
    .then(response => response.json())
    .then(data => {
        data.forEach(url => { if (url) createGalleryItem(url); });
    });
});

// පින්තූර Upload කිරීම
function addNewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    alert("Uploading... Please wait.");

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
            alert("Image uploaded successfully!");
        });
    })
    .catch(err => alert("Upload failed!"));
}
