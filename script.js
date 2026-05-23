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

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // පේජ් එක රිෆ්‍රෙෂ් වීම වළක්වයි

        // Loading පෙන්වීම
        notification.innerHTML = `
            <h3>Processing...</h3>
            <div class="loader"></div>
        `;
        notification.style.display = 'block';
        document.body.classList.add('blur-active');
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 50);

        // සර්වර් එකට යැවීම
        fetch(form.action, { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(response => {
            form.reset();
            // සාර්ථක පණිවිඩය පෙන්වීම
            setTimeout(() => {
                notification.innerHTML = `
                    <h3>Success!</h3>
                    <p>ඔබේ පණිවිඩය සාර්ථකව ලැබුණා.</p>
                    <button onclick="closeNotification()">Close</button>
                `;
            }, 1500);
        })
        .catch(error => {
            notification.innerHTML = `
                <h3>Error!</h3>
                <p>පණිවිඩය යැවීමට අපහසු විය.</p>
                <button onclick="closeNotification()">Close</button>
            `;
        });
    });
}

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

// පිටත ක්ලික් කළොත් වහන්න
window.addEventListener('click', function(e) {
    if (notification && notification.classList.contains('show')) {
        if (!notification.contains(e.target) && e.target.tagName !== 'BUTTON') {
            closeNotification();
        }
    }
});

