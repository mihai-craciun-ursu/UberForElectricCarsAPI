// var firstName = "Sarah";
// var lastName = "Cooper";
// var email = "sarah.cooper@yahoo.com";

// function modifyData(firstNameReceived, lastNameReceived, emailReceived) {
//     firstName = firstNameReceived;
//     lastName = lastNameReceived;
//     email = emailReceived;
//     document.querySelector("#name").innerHTML = `${firstName} ${lastName}`;
//     document.querySelector("#welcome-message-name").innerHTML = firstNameReceived;
//     document.querySelector("#email").innerHTML = email;
// }

$("#myBtn2").click(function () {

  $('#main-content').load('../statistics/statistics2.html');
});

getCars();

function getCars() {
  const authToken = localStorage.getItem('auth-token');
  jQuery.ajax({
    url: `${apiURL}/profile`,
    headers: {
      "Auth-Token": authToken
    },
    success: function (data, textStatus, request) {
      console.log(data, textStatus, request.status);
      localStorage.setItem('auth-token', authToken);
      let firstName = data["user"]['firstName'];
      let lastName = data["user"]['lastName'];
      let email = data['user']['email'];
      cars = data["user"]["listOfCars"];
      document.getElementById("name").innerHTML = `${firstName} ${lastName}`;
      document.getElementById("email").innerHTML = email;
      document.getElementById("welcome-message-name").innerHTML = firstName;
      let carListElement = document.getElementById('car-list');
      console.log(cars);
      if (cars.length > 0) {
        mapCars(cars, carListElement, 5);
      }

    },
    error: function (xhr, status, error) {
      getAnotherToken();
      console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
    }
  });
}


function mapCars(carList, carListElement, number) {
  for (let index = 0; index < Math.min(number, carList.length); index++) {
    let item = document.createElement("div");
    item.className = "car-item";
    let x_img = document.createElement("img");
    x_img.src = "https://img.icons8.com/ios-glyphs/24/000000/multiply.png";
    x_img.style.float = "right";
    x_img.style.height = "20px";
    x_img.style.width = "20px";
    x_img.style.padding = "0";
    x_img.style.position = "relative";
    x_img.style.bottom = "-10px";
    x_img.style.left = "-10px";
    x_img.style.cursor = "pointer";


    let figure = document.createElement("figure");
    figure.className = "carfigures";
    let carImage = document.createElement("img");
    carImage.src = carList[index]['imagesData']['image']['url'];
    let brand = document.createElement("figcaption");
    brand.innerHTML = carList[index]['make'];
    let model = document.createElement("figcaption");
    model.className = "cartext";
    model.innerHTML = carList[index]['carModel'];

    item.appendChild(figure);

    x_img.addEventListener("click", function () {
      deleteCar(item, carList[index]['id']);
    })
    figure.appendChild(x_img);
    figure.appendChild(carImage);
    figure.appendChild(brand);
    figure.appendChild(model);
    carListElement.appendChild(item);
  }
}

function deleteCar(element, car_id) {
  element.style.display = "none";
  const authToken = localStorage.getItem('auth-token');
  jQuery.ajax({
    url: `${apiURL}/profile/removeCar`,
    type: "POST",
    headers: {
      "Auth-Token": authToken
    },
    data: {
      carId: car_id
    },
    dataType: "json",
    success: function (data, textStatus, request) {
      console.log(data, textStatus, request.status);
      location.reload();
    },
    error: function (xhr, status, error) {
      getAnotherToken();
      console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
    }
  });


}

// getProfile();

function modal() {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  // span.onclick = function() {
  //     modal.style.display = "none";
  // }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}


function modal3() {
  if (cars.length > 0) {
    // Get the modal
    var modal3 = document.getElementById("myModal3");

    // Get the button that opens the modal
    var btn3 = document.getElementById("myBtn3");

    // Get the <span> element that closes the modal
    // var span3 = document.getElementsByClassName("close3")[0];

    // When the user clicks on the button, open the modal
    modal3.style.display = "block";
    let carListElement = document.getElementById('modal-content3');
    if (!$.trim($('#modal-content3').html()).length) {
      mapCars(cars, carListElement, cars.length);
    }
    // When the user clicks on <span> (x), close the modal
    // span3.onclick = function() {
    //     modal3.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal3) {
        modal3.style.display = "none";
      }
    }
  }
}

$("#myBtn2").click(function () {

  $('#main-content').load('../statistics/statistics2.html');
});
$("#myBtn4").click(function () {

  $('#main-content').load('../settings/settings.html');
});

var paymentsArray = [];

var getPayments = () => {
  const authToken = localStorage.getItem('auth-token');
  jQuery.ajax({
    async: false,
    url: 'https://uber-electric.herokuapp.com/payment/payments',
    headers: {
      "Auth-Token": authToken
    },
    success: function (data, textStatus, request) {
      paymentsArray = data.payments;
      console.log(paymentsArray);
    },
    error: function (xhr, status, error) {
      alert(error);
      console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
    }
  })
};

getPayments();
var max = Math.max(paymentsArray.length - 1, paymentsArray.length - 5);
var min = Math.min(paymentsArray.length - 1, paymentsArray.length - 5);
var color = "green";
if (min < 0) {
  min = 0;
}

if (max < 0) {
  max = 0;
}

for (i = max; i >= min; i--) {
  if (paymentsArray[i].status == "pending") {
    color = "coral";
  } else if (paymentsArray[i].status == "failed") {
    color = "red";
  } else {
    color = "green";
  }
  var variabila = "<div class=\"payment\" id=\"payment1\" style = \" height:100px\"> <img src=\"../profile/masina.png\"> <p style=\"color:" + color + ";\"> Payment " + paymentsArray[i].status + " </p> <p>" + paymentsArray[i].consumer + "</p> <p> $ " + paymentsArray[i].totalPrice.toFixed(2); + "</p> </div>"

  document.getElementsByClassName('modal-content')[0].innerHTML += variabila;
}


var max = Math.max(paymentsArray.length - 1, paymentsArray.length - 2);
var min = Math.min(paymentsArray.length - 1, paymentsArray.length - 2);
var color = "green";
if (min < 0) {
  min = 0;
}

if (max < 0) {
  max = 0;
}

for (i = max; i >= min; i--) {
  if (paymentsArray[i].status == "pending") {
    color = "coral";
  } else if (paymentsArray[i].status == "failed") {
    color = "red";
  } else {
    color = "green";
  }
  var variabila = "<div class=\"payment\" id=\"payment1\" style = \"margin-top: 10px;\"> <img src=\"../profile/masina.png\"> <p style=\"color:" + color + ";\"> Payment " + paymentsArray[i].status + " </p> <p>" + paymentsArray[i].consumer + "</p> <p> $ " + paymentsArray[i].totalPrice.toFixed(2); + "</p> </div>"

  document.getElementsByClassName('wrappertext')[0].innerHTML += variabila;
}