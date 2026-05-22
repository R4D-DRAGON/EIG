// 1. මෙනුව (Menu Toggle) සඳහා කේතය
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

const form = document.querySelector('.booking-form');
const notification = document.getElementById('notification');

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
                
                // තත්පර 5කින් ස්වයංක්‍රීයව සැඟවීම
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 5000);
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
