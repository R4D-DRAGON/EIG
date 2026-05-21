
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');

menuToggle.addEventListener('click',()=>{
navLinks.classList.toggle('active');
});

document.querySelector('.booking-form').addEventListener('submit',function(e){
e.preventDefault();
alert('Booking Request Sent Successfully!');
});
