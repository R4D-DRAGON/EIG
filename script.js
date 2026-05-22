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
    notification.classList.remove('show');
}

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
                notification.classList.add('show');
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

// 3. පණිවිඩය පේන වෙලාවේ ඕනෑම තැනක ක්ලික් කළොත් වහන්න
window.addEventListener('click', function(e) {
    // පණිවිඩය පේනවා නම් සහ ක්ලික් කරපු තැන පණිවිඩය ඇතුලේ නැත්නම්
    if (notification && notification.classList.contains('show') && !notification.contains(e.target)) {
        closeNotification();
    }
});
