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
    }
}

// ෆෝම් එක සබ්මිට් කිරීම
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // පිටුව Reload වීම වළක්වයි
        
        fetch(form.action, { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(response => {
            if (response.ok) {
                // පෝරමය හිස් කිරීම
                form.reset();
                
                // Notification එක පෙන්වීම
                if (notification) {
                    notification.classList.add('show');
                }
            } else {
                alert("Something went wrong!");
            }
        })
        .catch(error => {
            console.error('Error!', error);
            alert("Error sending data.");
        });
    });
}

// 3. පණිවිඩය පේන වෙලාවේ පිටත ක්ලික් කළොත් වහන්න
window.addEventListener('click', function(e) {
    // නොටිෆිකේෂන් එක පේනවා නම් සහ ක්ලික් කරපු දේ නොටිෆිකේෂන් එක ඇතුලේ නැත්නම්
    if (notification && notification.classList.contains('show')) {
        if (!notification.contains(e.target) && e.target.tagName !== 'BUTTON') {
            closeNotification();
        }
    }
});

function closeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.remove('show');
        // ටික වෙලාවකින් display none වෙන්න දානවා (එතකොට තමයි මැකෙන effect එක පේන්නේ)
        setTimeout(() => {
            notification.style.display = 'none';
        }, 400); 
    }
}

// ෆෝම් එක සබ්මිට් වුණාම show කරන තැන මෙහෙම වෙනස් කරන්න
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch(form.action, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (response.ok) {
                form.reset();
                notification.style.display = 'block'; // පලවෙනි පියවර
                setTimeout(() => {
                    notification.classList.add('show'); // දෙවෙනි පියවර - දැන් ඇනිමේෂන් එක වැඩ
                }, 50);
            }
        });
    });
}
