$("#logo").click(function () {

  $('#main-content').load('../profile/ip.html');
});

$("#profile-content").click(function () {

  $('#main-content').load('../profile/ip.html');
});


$("#invoice-content").click(function () {

  $('#main-content').load('../invoice/invoice.html');
});

$("#statistics-content").click(function () {

  $('#main-content').load('../statistics/statistics2.html');
});

$("#settings-content").click(function () {
  $('#main-content').load('../settings/settings.html');
});
$("#logout").click(function () {

  localStorage.removeItem('auth-token');
  localStorage.removeItem('refresh-token');
  location.reload();

});


