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
        // පේජ් එකේ Blur එකක් දාලා තිබුණොත් ඒක අයින් කරන්න
        document.body.style.filter = "none"; 
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
                    // පේජ් එකට අඳුරු බවක්/Blur එකක් අවශ්‍ය නම් මෙතනින් දාන්න
                    // document.body.style.filter = "blur(2px)"; 
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

// 3. පණිවිඩය පේන වෙලාවේ ඕනෑම තැනක ක්ලික් කළොත් වහන්න
window.addEventListener('click', function(e) {
    if (notification && notification.classList.contains('show')) {
        // ක්ලික් කළ දේ පණිවිඩය ඇතුලේ නැත්නම් සහ බොත්තමක් නොවේ නම් වහන්න
        if (!notification.contains(e.target) && e.target.tagName !== 'BUTTON') {
            closeNotification();
        }
    }
});
