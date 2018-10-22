var config = {
  apiKey: "AIzaSyChtcCn7StadcGrq7MOREeS4gDCoWlqLE8",
  authDomain: "truffle2-proto.firebaseapp.com",
  databaseURL: "https://truffle2-proto.firebaseio.com",
  projectId: "truffle2-proto",
  storageBucket: "truffle2-proto.appspot.com",
  messagingSenderId: "675686693236",
};

firebase.initializeApp(config);


var provider = new firebase.auth.FacebookAuthProvider();

// Initialize
var service = {};
service.db = firebase.firestore();
service.providers = {
  facebook: new firebase.auth.FacebookAuthProvider()
};

var session = {};


// ログイン
var loginWithFacebook = function() {
  var provider = service.providers.facebook;
  firebase.auth().signInWithRedirect(provider);
}

// ページ（index.html）が読み込まれた時に発火
// ログインボタンを押して認証した時用
firebase.auth().getRedirectResult().then(function(result) {

  console.log('Redirect Handler', result);

  if (result.credential) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    session.token = token;

    //window.location.href = '/#user-list';
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;

  console.log('error', error);
});

// ページが読み込まれた時など、認証状態の変化時のステータス管理
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('under sign in', user, {status: 'normal'});
    
    session.userFireauth = user;
    loginHandler(user);

    // window.location.href = '/#user-list';
  } else {
    // No user is signed in.
    console.log('under sign out');
  }
  // TO DO: もしかしたらここでローディングをフェードアウトさせたら認証後のロード画面が実現できるかも！
});


var loginHandler = async (user) => {

  var userExist = await service.db.collection("users").doc(user.uid).get();
  
  // userが存在しなかったら
  if(!(userExist.exists)){
    var userObj = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      lastSignInTime: user.metadata.lastSignInTime,
      creationTime: user.metadata.creationTime,
      groups: ['Appsocially'],
    };

    await service.db.collection("users")
      .doc(user.uid)
      .set(userObj)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });

    session.userIsNew = true;
  }else{
    session.userIsNew = false;
    session.user = userExist.data();
  }

  window.location.href = './#user-list';
}


var logout = function() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('Sign Out');
    window.location.href = './#login';
  }).catch(function(error) {
    // An error happened.
    window.location.href = './#login';
  });
}




