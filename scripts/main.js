function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function lobbySetup(){
	getFBData();
	document.getElementById("whodat").innerHTML = "You:";
	document.getElementById("FBprofileImage").setAttribute("src", profilePicSrc);
	document.getElementById("FBname").innerHTML = FBname;
	document.getElementById("gameButton").innerHTML = "Join Game";
	document.getElementById("gameButton").value = "join";
}

function lobbyAdminSetup(){
	getFBData();
	document.getElementById("whodat").innerHTML = "You:";
	document.getElementById("FBprofileImage").setAttribute("src", profilePicSrc);
	document.getElementById("FBname").innerHTML = FBname;
	document.getElementById("gameButton").innerHTML = "Start Game";
	document.getElementById("gameButton").value = "start";
}

function lobbyIngameSetup(){
	getFBData();
	document.getElementById("whodat").innerHTML = "Target:";
	document.getElementById("FBprofileImage").setAttribute("src", targetPicSrc);
	document.getElementById("FBname").innerHTML = targetName;
	document.getElementById("gameButton").innerHTML = "I was killed";
	document.getElementById("gameButton").value = "dead";
}