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
        // ටික වෙලාවකින් display none වෙන්න දානවා (එතකොට තමයි මැකෙන effect එක පේන්නේ)
        setTimeout(() => {
            notification.style.display = 'none';
        }, 400); 
    }
}

// ෆෝම් එක සබ්මිට් කිරීම
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // පිටුව Reload වීම වළක්වයි
        
        // පෝරමය සබ්මිට් වෙනකොට Loading පෙන්නන්න
        notification.innerHTML = `<div class="loader"></div><h3 style="margin-top:15px;">Processing...</h3>`;
        notification.style.display = 'block';
        document.body.classList.add('blur-active');
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 50);

        fetch(form.action, { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                // සාර්ථක වුණාම නොටිෆිකේෂන් එක වහන්න හෝ Success පණිවිඩය දාන්න
                // ඔයාට ඕනේ Loading එකෙන් පස්සේ වැහෙන්න නම් closeNotification() මෙතනට දාන්න
                closeNotification(); 
            } else {
                alert("Something went wrong!");
                closeNotification();
            }
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
