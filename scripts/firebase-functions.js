// Initialize Firebase
var config = {
	apiKey: "AIzaSyB-0OfscYervcQ4JhN5oIQxgsiE4ZYi0UQ",
	authDomain: "word-assasin-8620e.firebaseapp.com",
	databaseURL: "https://word-assasin-8620e.firebaseio.com",
	projectId: "word-assasin-8620e",
	storageBucket: "word-assasin-8620e.appspot.com",
	messagingSenderId: "749033695281"
};

firebase.initializeApp(config);

const db = firebase.firestore();

function createGame(admin, lang){
	var id = makeid(4);
	
	db.collection("games").doc(id).set({
		language: lang,
		admin: admin,
		players: [admin]
	})
	.then(function() {
		console.log("Document successfully written!");
		post("lobby.html",{room: id}, "get");
		return false;
	})
	.catch(function(error) {
		console.error("Error writing document: ", error);
		return false;
	});

}

function joinGame(code, userId){
	var gameRef = db.collection("games").doc(code);
	var players = [];
	
	gameRef.get().then(function(doc) {
		if (doc.exists) {
			players = doc.data().players;
			if(!players.includes(userId)){
				players.push(userId);
				gameRef.update({
					players: players
				});
			}
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		}).catch(function(error) {
			console.log("Error getting document:", error);
	});
}

function leaveGame(code){
	var gameRef = db.collection("games").doc(code);
	var players = [];
	
	gameRef.get().then(function(doc) {
		if (doc.exists) {
			players = doc.data().players;
			if(players.includes(userId)){
				players = players.filter(function(value, index, arr){
					return value !== userId;
				});
				
				gameRef.update({
					players: players
				});
			}
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		}).catch(function(error) {
			console.log("Error getting document:", error);
	});
}

function startGame(code){
	
}

function makeid(length) {
  var id = "";
  var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

  for (var i = 0; i < length; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
}

 /**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

