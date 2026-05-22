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

// පරිශීලකයාට ස්තුති පණිවිඩය යැවීම (English Version)
var customerEmail = e.parameter.Email;
var customerName = e.parameter.Name;

var replyBody = "Dear " + customerName + ",\n\n" +
                "Thank you for contacting Emerland Island Getaways! We have successfully received your booking request.\n\n" +
                "Our team is currently reviewing your details and will get back to you as soon as possible with further information regarding your tour.\n\n" +
                "We look forward to providing you with an unforgettable experience in Sri Lanka.\n\n" +
                "Best regards,\n" +
                "The Emerland Island Getaways Team.";

MailApp.sendEmail(customerEmail, "Booking Confirmation - Emerland Island Getaways", replyBody);
