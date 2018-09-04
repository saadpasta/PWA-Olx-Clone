//FIRESTORE 

var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);


//FIRESTORE ENDED
/* Loader */
var loader=document.getElementById("loader")
// Hide the loader from DOM
function hideLoader() {
    loader.style.display = "none";
  }
  
  // Show the loader on DOM
  function showLoader() {
    loader.style.display = "block";
  }
  /* Loader End */

var userId=localStorage.getItem("userId");
var  WelcomeName=document.getElementById("welcomeName")


if (localStorage.getItem("userId") === null) {
window.location.href="../Login/login.html"
alert("Please Login First")
}
else{

}

/* Getting User Data */
var CheckUser = db.collection("Users").doc(userId);
console.log(CheckUser);

var docRef = db.collection("Users").doc(userId);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        var name=doc.data().name
        WelcomeName.style.display="block"
        WelcomeName.innerHTML="Welcome :"+name.toUpperCase();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);

});


function submitAd(){


    
    /* Get Element */
    var AdTitle= document.getElementById("adTitle").value;
    var Category= document.getElementById("Category").value
    var AdDescription= document.getElementById("AdDescription").value;
    var Image= document.getElementById("UploadImage")
    var Name= document.getElementById("Name").value;
    var number= document.getElementById("Number").value;
    var city= document.getElementById("city").value
    var error =document.getElementById("error")
    var price=document.getElementById("price").value
    error.innerHTML="Please Fill All Feilds"

    /* Get Element End  */


    /* Error On Html */
        error.innerHTML=""

        if(AdTitle=="" || AdDescription=="" || number=="" || Category==""|| city==""||price=="" ){

            error.style.display="block"
            error.innerHTML="Please Fill All Feilds"
        }


        /* Image File Valdiation */
    

        
        /* Image File Valdiation End  */

        /* Save File On Firebase */

        /* Offline */
       /*  user = {
            a: a,
            b: b,
            c: c,
          id: Date.now()
        }    
  
     user = {
            a: "a",
            b: "s",
            c: "d",
          id: Date.now()
        }    
    
    array.push(user)
    
    
    array.push(user)
    
    
    localStorage.setItem("users", JSON.stringify(user));
    
    undefined
    localStorage.setItem("users", JSON.stringify(array));
    
   
    localStorage.setItem("users", JSON.stringify(array));
    
    
    users = JSON.parse(localStorage.getItem("users") || "[]");  

    users[1]
    users[1].a
    users[1].b */
        /*  Offline*/
        var file=Image.files[0]
        var reader=new FileReader();
        reader.onloadend=function(){
         var img=reader.result;
        
        db.collection("Ads").add({
            AdTitle,
            Category,
            AdDescription,
            Name,
            number,
            city,
            img,
            userId,
            price


        })
        .then(function(docRef) {
            showLoader()
            error.style.color="green"
            error.style.display="block"
            error.innerHTML="Your Ad Has Been Posted"
            console.log("Document written with ID: ", docRef.id);
            window.location.href="../My account/account.html"
            
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

}
reader.readAsDataURL(file)

}


function logout(){


    localStorage.clear();
    window.location.href="../index.html"


}