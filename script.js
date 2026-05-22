
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');

menuToggle.addEventListener('click',()=>{
navLinks.classList.toggle('active');
});

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  sheet.appendRow([
    new Date(), 
    e.parameter.name, 
    e.parameter.email, 
    e.parameter.date, 
    e.parameter.phone, 
    e.parameter.guests, 
    e.parameter.days, 
    e.parameter.destinations, 
    e.parameter.message
  ]);
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
