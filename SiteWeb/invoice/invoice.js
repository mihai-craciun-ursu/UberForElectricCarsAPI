


// let init = false;



(function () {
    const authToken = localStorage.getItem('auth-token');
    jQuery.ajax({
        url: `${apiURL}/payment/payouts`,
        headers: {
            "Auth-Token": authToken
        },
        success: function (data, textStatus, request) {
            console.log(data, textStatus, request.status);
            //localStorage.setItem('auth-token', authToken);
            idPayment = data["payments"][0]["id"];
            status = data["payments"][0]["status"];
            provider = data["payments"][0]["provider"];
            providerEmail = data["payments"][0]["providerEmail"];
            consumer = data["payments"][0]["consumer"];
            createdDate = data["payments"][0]["createdDate"];
            totalChargedkW = data["payments"][0]["kwCharged"];
            pricePerKw = data["payments"][0]["pricePerKwCharged"];
            totalPrice = data["payments"][0]["totalPrice"];
            mapInvoiceTable(data["payments"]);
        },
        error: function (xhr, status, error) {
            alert(error);
            console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
        }
    });
})();

(function () {
    const authToken = localStorage.getItem('auth-token');
    jQuery.ajax({
        url: `${apiURL}/profile`,
        headers: {
            "Auth-Token": authToken
        },
        success: function (data, textStatus, request) {
            console.log(data, textStatus, request.status);
            //localStorage.setItem('auth-token', authToken);
            let firstName = data["user"]['firstName'];
            let lastName = data["user"]['lastName'];
            let email = data['user']['email'];
            document.getElementById("name").innerHTML = `${firstName} ${lastName}`;
            document.getElementById("email").innerHTML = email;
            document.getElementById("firstName").innerHTML = firstName;
        },
        error: function (xhr, status, error) {
            alert(error);
            console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
        }
    });
})();

{/* <tr id="view_more_row">
<td><a id="view_more_link" href="#">View more!</a></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr> */}


function mapInvoiceTable(invoiceList) {
    let table = document.getElementById("invoice-table");
    for (let index = 0; index < invoiceList.length; index++) {
        let tableRow = document.createElement("tr");
        tableRow.className = "row invoice-row";
        tableRow.tabindex = "0";
        let id = document.createElement("td");
        id.innerHTML = invoiceList[index]['id'];
        let receiver = document.createElement("td");
        receiver.innerHTML = invoiceList[index]['provider'];
        let sender = document.createElement("td");
        sender.innerHTML = invoiceList[index]['consumer'];
        let status = document.createElement("td");
        status.innerHTML = invoiceList[index]['status'];
        if (status.innerHTML === "pending") {
            status.style.color = "cornflowerblue";
        }
        let price = document.createElement("td");
        let priceValue = parseInt(invoiceList[index]['totalPrice']).toFixed(2);
        price.innerHTML = priceValue.toString();
        let date = invoiceList[index]['createdDate'];
        let currentDate = document.createElement("td");
        currentDate.innerHTML = formatDate(date);



        tableRow.appendChild(id);
        tableRow.appendChild(receiver);
        tableRow.appendChild(sender);
        tableRow.appendChild(status);
        tableRow.appendChild(price);
        tableRow.appendChild(currentDate);

        tableRow.setAttribute("x-data-provider", invoiceList[index]['provider']);
        tableRow.setAttribute("x-data-provider-email", invoiceList[index]['providerEmail']);
        tableRow.setAttribute("x-data-consumer", invoiceList[index]['consumer']);
        tableRow.setAttribute("x-data-consumer-email", invoiceList[index]['consumerEmail']);
        tableRow.setAttribute("x-data-pricePerKwCharged", invoiceList[index]['pricePerKwCharged']);
        tableRow.setAttribute("x-data-totalPrice", invoiceList[index]['totalPrice']);
        tableRow.setAttribute("x-data-kwCharged", invoiceList[index]['kwCharged']);
        tableRow.setAttribute("x-data-createdDate", invoiceList[index]['createdDate']);



        table.appendChild(tableRow);


    }

    let viewLess = document.createElement("tr");
    viewLess.id = "view_less_row";
    let viewLessTd = document.createElement("td");
    let viewLessAnchor = document.createElement("a");
    viewLessAnchor.id = "view_less_link";
    viewLessAnchor.href = "#";
    viewLessAnchor.innerHTML = "View less!";

    viewLessTd.appendChild(viewLessAnchor);
    viewLess.appendChild(viewLessTd);
    table.appendChild(viewLess);

    $(".invoice-row").click(function () {
        $(".selected-row-invoice").toggleClass("selected-row-invoice");
        $(this).toggleClass("selected-row-invoice");
    });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

$("#bill_submit").click(function () {
    if ($(".selected-row-invoice")[0]) {
        var doc = new jsPDF();
        doc.setFontType('bold');
        doc.text(10, 20, 'LOGO');
        doc.setFontType('normal');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = 'Bill released on : ' + dd + '/' + mm + '/' + yyyy;

        console.log($(".selected-row-invoice").attr("x-data-consumer"))

        const invoiceData = {
            provider: $(".selected-row-invoice").attr("x-data-provider"),
            providerEmail: $(".selected-row-invoice").attr("x-data-provider-email"),
            consumer: $(".selected-row-invoice").attr("x-data-consumer"),
            consumerEmail: $(".selected-row-invoice").attr("x-data-consumer-email"),
            pricePerKwCharged: $(".selected-row-invoice").attr("x-data-pricePerKwCharged"),
            totalPrice: $(".selected-row-invoice").attr("x-data-totalPrice"),
            kwCharged: $(".selected-row-invoice").attr("x-data-kwCharged"),
            createdDate: $(".selected-row-invoice").attr("x-data-createdDate")
        }




        var myImage = 'data:image/jpeg;base64,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'
        var doc = new jsPDF();
        doc.addImage(myImage, 'JPEG', 10, 10, 20, 20);
        doc.setFontType('bold');
        doc.setFontSize(28);
        doc.setTextColor(123, 104, 238)
        doc.text(10, 45, 'ElecTrip');
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0)
        // doc.text(10, 20, 'LOGO');
        doc.setFontType('normal');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = 'Bill released on : ' + dd + '/' + mm + '/' + yyyy;
        doc.text(19.5, 55, today);
        doc.setFontType('bold');
        doc.text(19.5, 68, 'Provider: ');
        doc.setFontType('normal');
        doc.text(45.5, 68, invoiceData.provider);
        doc.setFontType('bold');
        doc.text(18, 75, ' Provider Email: ');
        doc.setFontType('normal');
        doc.text(62, 75, invoiceData.providerEmail);
        doc.setFontType('bold');
        doc.text(19.5, 91, 'Consumer: ');
        doc.setFontType('normal');
        doc.text(50.5, 91, invoiceData.consumer);
        doc.setFontType('bold');
        doc.text(18, 98, ' Consumer Email: ');
        doc.setFontType('normal');
        doc.text(68, 98, invoiceData.consumerEmail);
        doc.setDrawColor(0, 0, 0);
        doc.line(19.5, 102, 100, 102);
        doc.setDrawColor(0, 0, 0);
        doc.line(19.5, 104, 100, 104);
        doc.setFontType('bold');
        doc.text(19.5, 84, 'Created at: ');
        doc.setFontType('normal');
        doc.text(49.5, 84, invoiceData.createdDate);
        doc.setFontType('bold');
        doc.text(10, 114, 'Total Kw charged  ');
        doc.setFontType('normal');
        doc.text(60, 114, invoiceData.kwCharged.toString());
        doc.setFontType('bold');
        doc.text(10.5, 121, 'Price per Kw ');
        doc.setFontType('normal');
        doc.text(48, 121, invoiceData.pricePerKwCharged.toString());
        doc.setFontType('bold');
        doc.text(10, 128, 'Total Price ');
        doc.setFontType('normal');
        doc.text(42, 128, invoiceData.totalPrice.toString());
        doc.save('bill.pdf');
    }

});

// viewMoreBtn = document.getElementById("view_more_link");
// viewLessBtn = document.getElementById("view_less_link");

// hiddenItems = document.getElementsByClassName("hidden");


// viewMoreBtn.addEventListener('click', viewMore());

function viewMore() {
    maximizerRow = document.getElementById("view_more_row");
    minimizerRow = document.getElementById("view_less_row");
    for (let i = 0; i < hiddenItems.length; ++i) {
        hiddenItems[i].style.display = "table-row";
    }
    maximizerRow.style.display = "none";
    minimizerRow.style.display = "table-row";
}

// viewLessBtn.addEventListener('click', function () {
//     for (let i = 0; i < hiddenItems.length; ++i) {
//         hiddenItems[i].style.display = "none";
//     }
//     maximizerRow.style.display = "table-row";
//     minimizerRow.style.display = "none";
// });

function searchByReceiver() {
    let filter = document.getElementById('search-input').value.toUpperCase();

    let myTable = document.getElementById('invoice-table');

    let tr = myTable.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[2];

        if (td) {
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
                console.log(textValue);
            }
        }
    }

}

//added by the Bear


