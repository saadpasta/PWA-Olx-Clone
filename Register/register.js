
//FIRESTORE 

var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);


//FIRESTORE ENDED


function signUp(){

    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var username=document.getElementById('username').value;
    var errorP= document.getElementById("error");

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res)=>{

        db.collection("Users").doc(res.user.uid).set({
            email:email,
            name:username
            
        })
        .then(function() {
            errorP.style.display="block"
            errorP.style.color="green"
            errorP.innerHTML="Account Has Been Created"
            console.log("Document successfully written!"); 
            window.location.href="../index.html"

            /* Local Storage */

            localStorage.setItem("userId", res.user.uid);


        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
       

        
    })
    
    
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        errorP.style.display="block"
        errorP.innerHTML=errorMessage
      });

 

}
    
    
    
   