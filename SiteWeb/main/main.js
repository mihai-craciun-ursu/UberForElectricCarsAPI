var initInvoice = false;

$('#sidenav').load('../sidenav/sidenav.html');
$('#main-content').load('../profile/ip.html');


async function getAnotherToken() {
  const refreshToken = localStorage.getItem('refresh-token');
  await jQuery.ajax({
    url: `${apiURL}/auth/refreshToken`,
    headers: {
      "Refresh-Token": refreshToken
    },
    success: function (data, textStatus, request) {
      const authToken = request.getResponseHeader('auth-token');
      localStorage.removeItem('auth-token');
      localStorage.setItem('auth-token', authToken);
      location.reload();
    },
    error: function (xhr, status, error) {
      alert(error);
      console.log(" xhr.responseText: " + xhr.responseText + " //status: " + status + " //Error: " + error);
    }
  });
}
