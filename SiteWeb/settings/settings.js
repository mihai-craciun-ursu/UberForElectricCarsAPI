$(document).ready( function () {
    getProfile();
  });
  
(function () {
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
            document.getElementById("name").innerHTML = `${firstName} ${lastName}`;
            document.getElementById("email").innerHTML = email;
            // document.getElementById("welcome-message-name").innerHTML = firstName;
        },
        error: function (xhr, status, error) {
            alert(error);
            console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);

        }

    });
})();


// For pages display:

document.getElementById("car-button").addEventListener("click", function () {
    document.getElementById("account-page").style.display = "none";
    document.getElementById("port-page").style.display = "none";
    document.getElementById("car-page").style.display = "block";
    document.getElementById("link-car-page").style.color = "white";
    document.getElementById("car-button").style.backgroundColor = "#2856b8";

    document.getElementById("link-port-page").style.color = "#2856b8";
    document.getElementById("port-button").style.backgroundColor = " #F5F8F8"
    document.getElementById("link-account-page").style.color = "#2856b8";
    document.getElementById("account-button").style.backgroundColor = " #F5F8F8";


    const authToken = localStorage.getItem('auth-token');


    $("#add-car-container").html(`
    <label for="make-select">Manufacturer</label>
    <div class="custom-select" id="make-select">
        <select id="car-dropdown" required>
            <option value="0">Select Manufacturer</option>
        </select>
    </div>
    <div class="carlist" id="carlist">
    </div>
    `);

    $('#car-dropdown').change(function() {
        if ($(this).val() != '0') {
            
            jQuery.ajax({
                url: `${apiURL}/cars/getAll`,
                type: "GET",
                data:{
                    make: $(this).val()
                },
                headers: {
                    "Auth-Token": authToken
                },
                dataType: "json",
                success: function(data, textStatus, request) {
                    $("#carlist").html("");

                    data.data.carList.forEach(car => {
                        
                        $("#carlist").append(`<div class="car-item car-select-container" data-id-car="${car.id}">
                        <figure class="carfigures car-select">
                                <img src="${car.imagesData.image_thumbnail.url}">
                                <figcaption>${car.make}</figcaption>
                                <figcaption class="cartext">${car.carModel}</figcaption>
                                <figcaption class="cartext">${car.edition}</figcaption>
                                <figcaption class="cartext">Power: ${car.power}</figcaption>
                        </figure>
                        </div>`);
                    }); 
                    
                    
                    $(".car-select-container").click(function() {
                        $(".clicked-car").toggleClass("clicked-car");
                        $(this).toggleClass("clicked-car");
                    });
                },
                error: function ( xhr, status, error) {
                  alert(xhr.responseText);
                  console.log( " xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: "+error );
                }
                
            });
        }
    });

    let makeList = [];

    jQuery.ajax({
        url: `${apiURL}/cars/getAll`,
        type: "GET",
        headers: {
            "Auth-Token": authToken
        },
        dataType: "json",
        success: function(data, textStatus, request) {
            data.data.carList.forEach(car => {
                if(makeList.length == 0 || car.make != makeList[makeList.length-1]){
                    makeList.push(car.make);
                }
            });

            makeList.forEach(element => {
                $('#car-dropdown').append(new Option(element, element));
            });
            
        },
        error: function ( xhr, status, error) {
          alert(xhr.responseText);
          console.log( " xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: "+error );
        }
        
    });

    
    

});

document.getElementById("port-button").addEventListener("click", function () {
    document.getElementById("account-page").style.display = "none";
    document.getElementById("car-page").style.display = "none";
    document.getElementById("port-page").style.display = "block";
    document.getElementById("link-port-page").style.color = "#fdfdfd";
    document.getElementById("port-button").style.backgroundColor = "#2856b8";

    document.getElementById("link-account-page").style.color = "#2856b8";
    document.getElementById("account-button").style.backgroundColor = " #F5F8F8";
    document.getElementById("link-car-page").style.color = "#2856b8";
    document.getElementById("car-button").style.backgroundColor = " #F5F8F8"
});


document.getElementById("account-button").addEventListener("click", function () {
    document.getElementById("car-page").style.display = "none";
    document.getElementById("port-page").style.display = "none";
    document.getElementById("account-page").style.display = "block";
    document.getElementById("link-account-page").style.color = "#fdfdfd";
    document.getElementById("account-button").style.backgroundColor = "#2856b8";

    document.getElementById("link-car-page").style.color = "#2856b8";
    document.getElementById("car-button").style.backgroundColor = "#F5F8F8"
    document.getElementById("link-port-page").style.color = "#2856b8";
    document.getElementById("port-button").style.backgroundColor = " #F5F8F8"

});

$("#login").click(function () {
    $('#main-content').load('../profile/ip.html');
});
$("#statistics").click(function () {

    $('#main-content').load('../statistics/statistics2.html');
});


$("#login1").click(function () {
    $('#main-content').load('../profile/ip.html');
});
$("#statistics1").click(function () {

    $('#main-content').load('../statistics/statistics2.html');
});

$("#login2").click(function () {
    $('#main-content').load('../profile/ip.html');
});
$("#statistics2").click(function () {

    $('#main-content').load('../statistics/statistics2.html');
});



//Added by the Bear



function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

$("#add-conn-button").click(function(){
    $(`<div class="connector">
    <div class="ocpi">
    <div class="custom-select">
        <select required class="format-select">
            <option value="0">Format</option>
            <option value="1">CABLE</option>
            <option value="2">SOCKET</option>
        </select>
    </div>
    <div class="custom-select">
        <select required class="power-select">
            <option value="0">Power Type</option>
            <option value="1">AC_1_PHASE</option>
            <option value="2">AC_3_PHASE</option>
            <option value="3">DC</option>
        </select>
    </div>
        <div class="custom-select">
            <select required class="standard-select">
                <option value="0">Standard</option>
                <option value="1">CHADEMO</option>
                <option value="2">DOMESTIC_A</option>
                <option value="3">DOMESTIC_B</option>
                <option value="4">DOMESTIC_C</option>
                <option value="5">DOMESTIC_D</option>
                <option value="6">DOMESTIC_E</option>
                <option value="7">DOMESTIC_F</option>
                <option value="8">DOMESTIC_G</option>
                <option value="9">DOMESTIC_H</option>
                <option value="10">DOMESTIC_I</option>
                <option value="11">DOMESTIC_J</option>
                <option value="12">DOMESTIC_K</option>
                <option value="13">DOMESTIC_L</option>
                <option value="14">IEC_60309_2_single_16</option>
                <option value="15">IEC_60309_2_three_16</option>
                <option value="16">IEC_60309_2_three_32</option>
                <option value="17">IEC_60309_2_three_64</option>
                <option value="18">IEC_62196_T1</option>
                <option value="19">IEC_62196_T1_COMBO</option>
                <option value="20">IEC_62196_T2</option>
                <option value="21">IEC_62196_T2_COMBO</option>
                <option value="22">IEC_62196_T3A</option>
                <option value="23">IEC_62196_T3C</option>
                <option value="24">PANTOGRAPH_BOTTOM_UP</option>
                <option value="25">PANTOGRAPH_TOP_DOWN</option>
                <option value="26">TESLA_R</option>
                <option value="27">TESLA_S</option>
            </select>
        </div>
    </div>

    <div class="ocpi">
        <input type="number" name="max_voltage" class="max-voltage number-type" placeholder="Max V" required><br>
        <input type="number" name="max_amperage" class="max-amperage number-type " placeholder="Max A" required><br>
        <input type="number" name="max_electric_power" class="max-electric-power number-type" placeholder="Max W" required><br>
    </div>
</div>`).insertBefore("#add-conn-button");


});


    $('#port-reg').submit(function(e){
        e.preventDefault();
        let problems = false;


        const address = $("#address").val();
        const city = $("#city").val();
        const price = $("#price").val();
        const password = $("#pass").val();
        const latitude = $("#latitude").val();
        const longitude = $("#longitude").val();

        let connectors = [];

        $( ".connector" ).each(function( index ) {
            const conn = {
                standard: $(".standard-select option:selected", this).text(),
                format:  $(".format-select option:selected", this).text(),
                power_type:  $(".power-select option:selected", this).text(),
                max_voltage: Number($(".max-voltage", this).val()),
                max_amperage: Number($(".max-amperage", this).val()),
                max_electric_power: Number($(".max-electric-power", this).val())
            }
            connectors.push(conn);            
        });

        //validare
        if(price > 3){
            alert("Price too high, max = 3");
            problems = true;
        }
        connectors.forEach(element => {
            if(element.format=='Format' || element.power_type=='Power Type' || element.standard == 'Standard'){
                alert("Please select a Format/Power Type/Standard for all connectors you added");
                problems = true;
            }else if(element.max_electric_power < 2000){
                alert("Please Check your Max Electric Power of your connectors. Min approved = 2000 (W)");
                problems = true;
            }
        });

        
        if(!problems){
            const objToBeSendToServer = {
                address : address,
                city: city,
                price: Number(price),
                status: 'AVAILABLE',
                connectors: connectors,
                geolocation: {
                    latitude: latitude,
                    longitude: longitude
                },
                password: password
            }

            console.log(JSON.stringify(objToBeSendToServer));

            const authToken = localStorage.getItem('auth-token');
            
            jQuery.ajax({
                url: `${apiURL}/profile/addStation`,
                type: "POST",
                headers: {
                    "Auth-Token": authToken
                },
                data: objToBeSendToServer,
                dataType: "json",
                success: function(data, textStatus, request) {
                    console.log(data);
                    location.reload();
                },
                error: function ( xhr, status, error) {
                  alert(xhr.responseText);
                  console.log( " xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: "+error );
                }
                
            });

            console.log();
        }
        
    });


    $('#car-reg').submit(function(e){
        e.preventDefault();
        const id = $(".clicked-car").attr("data-id-car");

        if(id){
            const objToBeSendToServer = {
                carId: id
            }

            const authToken = localStorage.getItem('auth-token');
            
            jQuery.ajax({
                url: `${apiURL}/profile/addCar`,
                type: "POST",
                headers: {
                    "Auth-Token": authToken
                },
                data: objToBeSendToServer,
                dataType: "json",
                success: function(data, textStatus, request) {
                    console.log(data);
                    location.reload();
                },
                error: function ( xhr, status, error) {
                  alert(xhr.responseText);
                  console.log( " xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: "+error );
                }
                
            });

        }
    });

function changePsw(){
    const  psw = {
        oldPassword: document.getElementById("old-psw").value,
	    newPassword: document.getElementById("new-psw").value
      }
    
    const authToken=localStorage.getItem('auth-token');
    jQuery.ajax({
        url: `https://uber-electric.herokuapp.com/profile/changePassword`,
        type: "POST",
        headers: {
                "Auth-Token": authToken
        },
        data: psw,

        dataType: "json",
        success: function(data, textStatus, request) {
        console.log(data);
        document.getElementById("old-psw").value="";
        document.getElementById("new-psw").value="";

        },
        error: function ( xhr, status, error) {
        alert(error);
        console.log( " xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: "+error );
        }
    });
    
}


function getProfile(){
    const authToken=localStorage.getItem('auth-token');
    jQuery.ajax({
        url: `https://uber-electric.herokuapp.com/profile`,
        type: "GET",
        headers: {
                "Auth-Token": authToken
        },
        success: function(data, textStatus, request) {
        console.log(data);
        document.getElementById("fname").value=data["user"]["firstName"];
        document.getElementById("lname").value=data["user"]["lastName"];
        document.getElementById("phone").value=data["user"]["phoneNumber"];
        document.getElementById("PayPal-email").value=data["user"]["paypalEmail"];
        },
        error: function ( xhr, status, error) {
        alert(error);
        console.log( " xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: "+error );
        }
    });
}

function saveProfile(){
    const authToken=localStorage.getItem('auth-token');
    const userr={
        firstName: document.getElementById("fname").value,
        lastName:  document.getElementById("lname").value,
        phoneNumber: document.getElementById("phone").value,
        paypalEmail: document.getElementById("PayPal-email").value
    }
    jQuery.ajax({
        url: `https://uber-electric.herokuapp.com/profile/reset`,
        type: "PUT",
        headers: {
                "Auth-Token": authToken
        },
        data: userr,
        dataType: "json",
        success: function(data, textStatus, request) {
        console.log(userr.firstName+' '+userr.lastName);
        document.getElementById("name").innerHTML=userr.firstName+' '+userr.lastName;   
        },
        error: function ( xhr, status, error) {
        alert(error);
        console.log( " xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: "+error );
        }
    });
}