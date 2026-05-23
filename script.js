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
        
        // Loading පෙන්නන්න
        notification.innerHTML = `<div class="loader"></div><h3 style="margin-top:15px;">Processing...</h3>`;
        notification.style.display = 'block';
        
        // මෙතන තමයි වැදගත්: body එකට class එක add කරන්න
        document.body.classList.add('blur-active');
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 50);

        fetch(form.action, { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(response => {
            // Loading එක ටික වෙලාවක් පේන්න තත්පර 1ක delay එකක්
            setTimeout(() => {
                if (response.ok) {
                    form.reset();
                    closeNotification(); 
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
