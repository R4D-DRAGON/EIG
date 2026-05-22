
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');

menuToggle.addEventListener('click',()=>{
navLinks.classList.toggle('active');
});

document.querySelector('.booking-form').addEventListener('submit',function(e){
e.preventDefault();
alert('Booking Request Sent Successfully!');
});

const form = document.getElementById('bookingForm');
const successMsg = document.getElementById('successMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    }).then(() => {
        form.reset();
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 5000);
    });
});
