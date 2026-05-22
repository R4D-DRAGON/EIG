
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');

menuToggle.addEventListener('click',()=>{
navLinks.classList.toggle('active');
});

// 1. මෙනුව (Menu Toggle) සඳහා කේතය
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. Booking ෆෝම් එක Google Sheet එකට යැවීම සඳහා කේතය
const form = document.querySelector('.booking-form');
const successMessage = document.getElementById('successMessage');

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
                // සාර්ථක නම් පණිවිඩය පෙන්වා ෆෝම් එක හිස් කිරීම
                successMessage.style.display = 'block';
                form.reset();
                
                // තත්පර 5කින් සාර්ථක පණිවිඩය නැවත සැඟවීම
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
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
