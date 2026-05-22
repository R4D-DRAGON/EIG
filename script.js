// 1. මෙනුව (Menu Toggle) සඳහා කේතය
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. Booking ෆෝම් එක Google Sheet එකට යැවීම සහ Notification පෙන්වීම සඳහා කේතය
const form = document.querySelector('.booking-form');
const notification = document.getElementById('notification');

// Notification එක වසා දැමීමට අවශ්‍ය function එක
function closeNotification() {
    notification.classList.remove('show');
}

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // පිටුව Reload වීම වළක්වයි
        
        // දත්ත යැවීම
        fetch(form.action, { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(response => {
            if (response.ok) {
                // සාර්ථක නම් ෆෝම් එක හිස් කර Notification එක පෙන්වීම
                form.reset();
                
                // Notification එක පෙන්වීම (CSS class එක එකතු කිරීම)
                if (notification) {
                    notification.classList.add('show');
                    
                    // තත්පර 5කින් Notification එක ස්වයංක්‍රීයව සැඟවීම
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 5000);
                }
            } else {
                alert("Something went wrong! Please try again.");
            }
        })
        .catch(error => {
            console.error('Error!', error);
            alert("Error sending data. Please check your internet connection.");
        });
    });
}
