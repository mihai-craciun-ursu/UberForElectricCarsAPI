// let pages = ['profile','statistics'];

loginPage = true;
$('#content-section').load("./login_page/login.html");
if(loginPage === true) {
  $('#content-section').css({"width": "100%", "height" : "100%"});
} else {
  $('#content-section').css({"width": "100%", "height" : "100%"});
  $('#nav-section').load("./sidenav/sidenav.html");
}

//profile values

var cars;

//invoice values
var idPayment, status, provider, providerEmail, consumer, createdDate, totalChargedkW, pricePerKw, totalPrice;