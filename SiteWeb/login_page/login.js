var formEmail = document.getElementById("email");
var formPassword = document.getElementById("password");

document.getElementById("submit-sign-up").addEventListener("click", function () {

  document.getElementById("login").style.display = 'none';
  document.getElementById("register").style.display = 'block';


});
document.getElementById("submit-sign-in-reg").addEventListener("click", function () {
  document.getElementById("register").style.display = 'none';
  document.getElementById("login").style.display = 'block';
});

document.getElementById('submit-sign-in').addEventListener("click", function (event) {
  event.preventDefault();
  let user = {
    email: document.getElementById('signIn-email').value,
    password: document.getElementById('signIn-password').value
  };
  makeAuthRequest(user);


});

(function () {
  if (localStorage.getItem('auth-token') !== null) {
    loginPage = false;
    $('#content-section').load('../main/main.html');
  }
})();


myStorage = window.localStorage;
const apiURL = 'https://uber-electric.herokuapp.com';
function makeAuthRequest(user) {
  jQuery.ajax({
    url: `https://uber-electric.herokuapp.com/auth/login`,
    type: "POST",
    data: {
      email: user.email,
      password: user.password
    },
    dataType: "json",
    success: function (data, textStatus, request) {
      console.log(data);
      const authToken = request.getResponseHeader('auth-token');
      const refreshToken = request.getResponseHeader('refresh-token');
      localStorage.setItem('auth-token', authToken);
      localStorage.setItem('refresh-token', refreshToken);
      loginPage = false;
      $('#content-section').load('../main/main.html');


    },
    error: function (xhr, status, error) {
      alert(error);
      console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);

    }

  });
};
document.getElementById('submit-sign-Up').addEventListener('click', () => registerUser());
function registerUser() {
  user = {
    firstName: document.getElementById("name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("signUp-email").value,
    password: document.getElementById("signUp-password").value,
    phoneNumber: document.getElementById("phone").value
  }
  console.log(user.firstName);
  jQuery.ajax({
    url: `https://uber-electric.herokuapp.com/auth/register`,
    type: "POST",
    data: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data, textStatus, request) {
      console.log(data);
    },
    error: function (xhr, status, error) {
      alert(error);
      console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);

    }
  });
}

function login() {
  let email = document.querySelector('#signI-nemail').value;
  let password = document.querySelector("#signIn-password").value;
  console.log(email, password);
  let user = {
    email: email,
    password: password
  };
  makeAuthRequest(user);
}