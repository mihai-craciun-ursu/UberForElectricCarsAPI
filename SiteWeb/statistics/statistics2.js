var paymentsArray_received = [];
var paymentsArray_spend = [];

var getPayments_profit = () => {
    const authToken = localStorage.getItem('auth-token');
    jQuery.ajax({
        async: false,
        url: `${apiURL}/payment/payouts`,
        headers: {
            "Auth-Token": authToken
        },
        success: function (data, textStatus, request) {
            paymentsArray_received = data.payments;
        },
        error: function (xhr, status, error) {
            getAnotherToken();
            console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
        }
    })
};

var getPayments_spend = () => {
    const authToken = localStorage.getItem('auth-token');
    jQuery.ajax({
        async: false,
        url: `${apiURL}/payment/payments`,
        headers: {
            "Auth-Token": authToken
        },
        success: function (data, textStatus, request) {
            paymentsArray_spend = data.payments;
            console.log(paymentsArray_spend);
        },
        error: function (xhr, status, error) {
            getAnotherToken();
            console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
        }
    })
};

getPayments_profit();
getPayments_spend();
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
            document.getElementById("firstName").innerHTML = firstName;
        },
        error: function (xhr, status, error) {
            alert(error);
            console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
        }
    });
})();
// pentru luna anului returnez numarul de zile din luna, folosim la statistica lunara
function daysInCurrentMonth() {
    var currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
}

function filterByCurrentWeekPayments(paymentsArray) {
    var weekly_data = [];
    currentDate = moment();
    for (var i = 0; i < paymentsArray.length; ++i) {
        var currentPaymentWeekDate = moment(paymentsArray[i].createdDate);
        if (currentDate.isoWeek() == currentPaymentWeekDate.isoWeek()) {
            weekly_data.push(paymentsArray[i].totalPrice);
        }
    }
    return weekly_data;
}

function filterByCurrentMonthPayments(paymentsArray) {
    var noOfDays = daysInCurrentMonth();
    var monthly_data = Array(daysInCurrentMonth());
    for (var i = 0; i < noOfDays; ++i) {
        monthly_data[i] = 0;
    }
    var noOfDaysOfCurrentMonth = daysInCurrentMonth();
    var currentMonth = new Date().getMonth() + 1;
    console.log("current month: " + currentMonth);
    for (var j = 0; j < paymentsArray.length; ++j) {
        var currentPaymentDate = paymentsArray[j].createdDate;
        var currentPaymentMonth = parseInt(currentPaymentDate.split("-")[1]);
        if (currentPaymentMonth == currentMonth) {
            var currentPaymentDay = currentPaymentDate.split("T")[0].split("-")[2];
            currentPaymentDay = parseInt(currentPaymentDay);
            monthly_data[currentPaymentDay - 1] += paymentsArray[j].totalPrice;
        }
    }
    return monthly_data;
}

function filterByCurrentYearPayments(paymentsArray) {
    var currentYear = new Date().getFullYear();
    var annual_data = Array(12);
    for (var i = 0; i < 12; ++i) {
        annual_data[i] = 0;
    }
    for (var i = 0; i < paymentsArray.length; ++i) {
        var currentPaymentDate = paymentsArray[i].createdDate;
        var currentPaymentYear = parseInt(currentPaymentDate.split("-")[0]);
        if (currentYear == currentPaymentYear) {
            var currentPaymentMonth = parseInt(currentPaymentDate.split("-")[1]);
            annual_data[currentPaymentMonth - 1] += paymentsArray[i].totalPrice;
        }
    }
    return annual_data;
}


var weekly_profit_data_received = filterByCurrentWeekPayments(paymentsArray_received);
var monthly_profit_data_received = filterByCurrentMonthPayments(paymentsArray_received);
var annual_profit_data_received = filterByCurrentYearPayments(paymentsArray_received);

var weekly_profit_data_spend = filterByCurrentWeekPayments(paymentsArray_spend);
var monthly_profit_data_spend = filterByCurrentMonthPayments(paymentsArray_spend);
var annual_profit_data_spend = filterByCurrentYearPayments(paymentsArray_spend);

console.log(weekly_profit_data_spend);

var weekly_profit_labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
var monthly_profit_labels = new Array(daysInCurrentMonth());
var annual_profit_labels = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

for (var i = 0; i < monthly_profit_labels.length; ++i) {
    monthly_profit_labels[i] = i + 1;
}
// construim graficul pe baza ctx si config
var profit_chart_ctx = document.getElementById('chart_profit').getContext('2d');
var chart_spend_ctx = document.getElementById('chart_spend').getContext('2d');
var profit_chart_config = {
    type: 'line',
    data: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [{
            label: 'Money received',
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: '#b388ff',
            borderColor: '#6200ea',
            borderWidth: 2
        }]
    },
};

var spend_chart_config = {
    type: 'line',
    data: {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [{
            label: 'Money spend',
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: '#b388ff',
            borderColor: '#6200ea',
            borderWidth: 2
        }]
    },
};

function updateChart(chart, profit_chart_config, newLabel, newData, newBackgroundColor, newBorderColor) {
    profit_chart_config.data.labels = newLabel;
    profit_chart_config.data.datasets[0].data = newData;
    profit_chart_config.data.datasets[0].backgroundColor = newBackgroundColor;
    profit_chart_config.data.datasets[0].borderColor = newBorderColor;
    chart.update();
}

var profit_chart = new Chart(profit_chart_ctx, profit_chart_config);
var spend_chart = new Chart(chart_spend_ctx, spend_chart_config); // aceleasi grafic, alte date
updateChart(profit_chart, profit_chart_config, weekly_profit_labels, weekly_profit_data_received, '#b388ff', '#6200ea');

$("#weekly_profit_btn").click(function () {
    updateChart(profit_chart, profit_chart_config, weekly_profit_labels, weekly_profit_data_received, '#b388ff', '#6200ea');
});

$("#monthly_profit_btn").click(function () {
    updateChart(profit_chart, profit_chart_config, monthly_profit_labels, monthly_profit_data_received, '#b9f6ca', '#69f0ae')
});

$("#annual_profit_btn").click(function () {
    updateChart(profit_chart, profit_chart_config, annual_profit_labels, annual_profit_data_received, '#ffccbc', '#ff5722');
});


updateChart(spend_chart, spend_chart_config, weekly_profit_labels, weekly_profit_data_spend, '#b388ff', '#6200ea');
$("#weekly_profit_btn_s").click(function () {
    console.log(1);
    updateChart(spend_chart, spend_chart_config, weekly_profit_labels, weekly_profit_data_spend, '#b388ff', '#6200ea');
});

$("#monthly_profit_btn_s").click(function () {
    console.log(2);
    updateChart(spend_chart, spend_chart_config, monthly_profit_labels, monthly_profit_data_spend, '#b9f6ca', '#69f0ae')
});

$("#annual_profit_btn_s").click(function () {
    console.log(3);
    updateChart(spend_chart, spend_chart_config, annual_profit_labels, annual_profit_data_spend, '#ffccbc', '#ff5722');
});


function removeListeners() {
    // weekly_profit_btn.removeEventListener('click', updateChart(weekly_profit_labels, weekly_profit_data, '#b388ff', '#6200ea'));
    // monthly_profit_btn.removeEventListener('click', updateChart(monthly_profit_labels, monthly_profit_data, '#b9f6ca', '#69f0ae'));
    // annual_profit_btn.removeEventListener('click', updateChart(annual_profit_labels, annual_profit_data, '#ffccbc', '#ff5722'));
}

$("#money_received_area").css('display', 'block');
$("#money_spend_area").css('display', 'none');
$("#profit_stats").click(function () {
    $("#money_received_area").css('display', 'block');
    $("#money_spend_area").css('display', 'none');
});

$("#send_stats").click(function () {
    $("#money_received_area").css('display', 'none');
    $("#money_spend_area").css('display', 'block');
});