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
        // බ්ලර් එක ඉවත් කිරීම
        document.body.classList.remove('blur-active');
        
        // ටික වෙලාවකින් display none වෙන්න දානවා (Animation එක පේන්න)
        setTimeout(() => {
            notification.style.display = 'none';
        }, 400); 
    }
}

// ෆෝම් එක සබ්මිට් කිරීම
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // පිටුව Reload වීම වළක්වයි
        
        // නොටිෆිකේෂන් එක පෙන්වීම සහ Loading එෆෙක්ට් එක
        notification.innerHTML = `<div class="loader"></div><h3 style="margin-top:15px; color:#333;">Processing...</h3>`;
        notification.style.display = 'block';
        
        // බොඩි එකට blur-active පන්තිය එකතු කිරීම
        document.body.classList.add('blur-active');
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 50);

        // API වෙත දත්ත යැවීම
        fetch(form.action, { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(response => {
            // Loading එක ටික වෙලාවක් පේන්න තත්පර 1ක delay එකක්
            setTimeout(() => {
                if (response.ok) {
                    form.reset();
                    // සාර්ථක වුණාම නොටිෆිකේෂන් එකේ Success පණිවිඩයක් පෙන්වන්න
                    notification.innerHTML = `<h3 style="color:#25D366;">Success!</h3><p>Your booking has been received.</p>`;
                    
                    // තත්පර 2කට පසු නොටිෆිකේෂන් එක වහන්න
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
        // නොටිෆිකේෂන් එක ඇතුලේ ක්ලික් කර නැත්නම් පමණක් වහන්න
        if (!notification.contains(e.target) && e.target.tagName !== 'BUTTON') {
            closeNotification();
        }
    }
});
