var FBuserId = 0;
var FBname = "";
var profilePicSrc = "";
var FBLoadStatus = false;

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response, roomCode) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status !== 'connected') {
		window.location.href = "login.html";
	} else {
		updateFBDisplay();
	}
}

function checkLoginState(roomCode) {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

function getFBData () {
	FB.api('/me', function(response) {
	  FBuserId = response.id;
	  FBname = response.name;
	  profilePicSrc = "http://graph.facebook.com/" + response.id + "/picture?type=normal";
	  FBLoadStatus = true;
	});
}

function updateFBDisplay() {
	FB.api('/me', function(response) {
	  FBuserId = response.id;
	  FBname = response.name;
	  profilePicSrc = "http://graph.facebook.com/" + response.id + "/picture?type=normal";
	  FBLoadStatus = true;
	  document.getElementById("FBprofileImage").setAttribute("src", profilePicSrc);
	  document.getElementById("FBname").innerHTML = FBname;
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '692596701156775',
		cookie     : true,
		xfbml      : true,
		version    : 'v3.2'
	});
	
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};
  


// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));