function login(){


    var password = document.getElementById('password').value
    var email = document.getElementById('email').value
    var errorP= document.getElementById("error")

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) =>{

        console.log(res)
        
      if(res.operationType=="signIn"){

        errorP.style.display="block"
        errorP.style.color="green"

        errorP.innerHTML="Login Successful"
        window.location.href="../index.html"
        localStorage.setItem("userId", res.user.uid);

     }

    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage)
        errorP.style.display="block"
        errorP.innerHTML=errorMessage
       
      });





}