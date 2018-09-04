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

  /* Offline */
  var userFav=document.getElementById("userFav")

  window.addEventListener("load", function(event) {
    if (!navigator.onLine) {
        hideLoader()
        showAndDismissAlert('danger',"You Are Offline" )
        var Ads = JSON.parse(localStorage.getItem("Fav"));
        console.log(Ads) 
        for (var i=0 ; i<=Ads.length ; i++){

            console.log(Ads[i].AdTitle)

            userFav.innerHTML+=`
            <div class="card" style="width: 25rem";"border-radius: 15px" >
              <img class="card-img-top" src='${Ads[i].img}'/>
           <div class="card-body">
            <h3 class="card-title" id="card-title">${Ads[i].AdTitle}</h3>
           <h4 class="card-text" id="card-text"><span class="glyphicon glyphicon-map-marker"></span>Location:${Ads[i].city}</h4>
           <h3 class="card-text" id="card-price">Rs ${Ads[i].price}</h3>
           <button  class="btn btn-primary"  data-toggle="modal" data-target="#product_view"  onclick="adOffline('${[i]}')">BUY</button>

            </div>
            </div>
  `;
        } 

      return false;
    }
  });

  function adOffline(a){
      
    var Ads = JSON.parse(localStorage.getItem("Fav"));

    
                     ModalMain.innerHTML=`
                     
                 <div class="modal-header">
                 <a href="#" data-dismiss="modal" class="class pull-left"><span class="glyphicon glyphicon-remove"></span></a>
                     <h3 class="modal-title">${Ads[a].Category}</h3>
                 </div>
                 <div class="modal-body">
                     <div class="row">
                         <div class="col-md-6 product_img">
                             <img src="${Ads[a].img}" class="img-responsive">
                         </div>
                         <div class="col-md-6 product_content">
                             <h2 id="Adtitle">${Ads[a].AdTitle}</h2>
                             <h4 id="name">Name: ${Ads[a].Name}</h4>
                             <p id="AdDescriptiion">${Ads[a].AdDescription}</p>
                             <h3 id="city"><span class="glyphicon glyphicon-map-marker"></span>${Ads[a].city}</h3>
                             <h3 id="Number"><span class="glyphicon glyphicon-earphone"></span>${Ads[a].number}</h3>
                             <h3 id="price"> RS ${Ads[a].price}</h3>


                             <div class="space-ten"></div>
                             <div class="btn-ground">
                                
                             </div>
                         </div>
                     </div>
                 </div>
                      `;

     
                 




 }

  /* Offline */
var userId=localStorage.getItem("userId");
var  WelcomeName=document.getElementById("welcomeName")


if (localStorage.getItem("userId") === null) {
window.location.href="../Login/login.html"
alert("Please Login First")
}
else{

}
/* popup */
function showAndDismissAlert(type, message) {
    var htmlAlert = '<div class="alert alert-' + type + '">' + message + '</div>';
    $(".alert-messages").prepend(htmlAlert);
    $(".alert-messages .alert").first().hide().fadeIn(1000).delay(1000).fadeOut(1000, function () { $(this).remove(); });
}

/* popup end */
/* Getting User Data */
var CheckUser = db.collection("Users").doc(userId);
showLoader()

console.log(CheckUser);

var docRef = db.collection("Users").doc(userId);
docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        var name=doc.data().name
        WelcomeName.style.display="block"
        WelcomeName.innerHTML="Welcome ,"+name.toUpperCase();
        hideLoader()

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


//Get From Database
///var userAds = db.collection("Ads");
//console.log(userAds)
// Create a query against the collection.
//var query = userAds.where("userId", "==", userId );

//console.log("Data"+query)


    /* Showing Data On Card */

//var cardTitle=document.getElementById("card-title")
///var cardText= document.getElementById("card-text")



var accountMain=document.getElementById("userAds")
//var FullpageAccount= document.getElementById("FullpageAccount")
//var body=document.getElementById("body")
var adTitle= document.getElementById("adTitle")
db.collection("Ads").where("userId", "==", userId)
    .get()
    .then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            accountMain.innerHTML+=`
                     <div class="card" style="width: 25rem";"border-radius: 15px" >
                       <img class="card-img-top" src='${doc.data().img}'/>
                    <div class="card-body">
                     <h3 class="card-title" id="card-title">${doc.data().AdTitle}</h3>
                    <h4 class="card-text" id="card-text"><span class="glyphicon glyphicon-map-marker"></span>Location:${doc.data().city}</h4>
                    <h3 class="card-text" id="card-price">Rs ${doc.data().price}</h3>
                     <button  class="btn btn-primary"  data-toggle="modal" data-target="#product_view"  onclick="DisplayAddMain('${doc.id}')">Open Add</button>
                     <button  class="btn btn-danger"    onclick="deleteAdd('${doc.id}',this)">Delete Add</button>


                     </div>
                     </div>
           `;

            hideLoader()
         });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


    /* Deleting Add */


    function deleteAdd(id,a){


        /* db.collection("Ads").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
         */

        var result = confirm("Are you sure to delete this item?");
        if (result) {
            db.collection("Ads").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            a.parentNode.parentNode.style.display="none"
             showAndDismissAlert('danger',"Your Add Has Been Deleted" )
        }



         
        
    }



             /* Showing Fav Data On Card */


            var userFav= document.getElementById("userFav")

             db.collection("Favorites").where("FavPersonID", "==", userId)
             .get()
             .then(function(querySnapshot) {
                
                 querySnapshot.forEach(function(doc) {

                     // doc.data() is never undefined for query doc snapshots
                     console.log(doc.id, " => ", doc.data());

                     userFav.innerHTML+=`
                     <div class="card" style="width: 25rem";"border-radius: 15px" >
                     <img class="card-img-top" src='${doc.data().img}'/>
                    <div class="card-body">
                     <h3 class="card-title" id="card-title">${doc.data().AdTitle}</h3>
                    <h4 class="card-text" id="card-text"><span class="glyphicon glyphicon-map-marker"></span>Location:${doc.data().city}</h4>
                    <h3 class="card-text" id="card-price">Rs ${doc.data().price}</h3>
                     <button  class="btn btn-primary"  data-toggle="modal" data-target="#product_view"  onclick="DisplayAdd('${doc.id}')">BUY</button>
                     <button type="button" class="btn btn-danger" onclick="removeFavorite('${doc.id}','${doc.data().AdId}')"><span class="glyphicon glyphicon-heart"></span>Remove Favorite</button>

                     </div>
                     </div>
                    `;
                    hideLoader()
                 });
             })
             .catch(function(error) {
                 console.log("Error getting documents: ", error);
             });






             var ModalMain =document.getElementById("ModalMain")

             function DisplayAdd(id){
                
                var docRef = db.collection("Favorites").doc(id);
         
                         docRef.get().then(function(doc) {
                             if (doc.exists) {
                                 console.log("Document data:", doc.data());
                                 ModalMain.innerHTML=`
                                 
                             <div class="modal-header">
                             <a href="#" data-dismiss="modal" class="class pull-left"><span class="glyphicon glyphicon-remove"></span></a>
                                 <h3 class="modal-title">${doc.data().Category}</h3>
                             </div>
                             <div class="modal-body">
                                 <div class="row">
                                     <div class="col-md-6 product_img">
                                         <img src="${doc.data().img}" class="img-responsive">
                                     </div>
                                     <div class="col-md-6 product_content">
                                         <h2 id="Adtitle">${doc.data().AdTitle}</h2>
                                         <h4 id="name">Name: ${doc.data().Name}</h4>
                                         <p id="AdDescriptiion">${doc.data().AdDescription}</p>
                                         <h3 id="city"><span class="glyphicon glyphicon-map-marker"></span>${doc.data().city}</h3>
                                         <h3 id="Number"><span class="glyphicon glyphicon-earphone"></span>${doc.data().number}</h3>
                                         <h3 id="price"> RS ${doc.data().price}</h3>
                                         
                                         <div class="space-ten"></div>
                                         <div class="btn-ground">
                                             <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-envelope"></span> Message</button>
                                             <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-heart-empty"></span> Remove Favorite</button>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                                  `;
         
                 
                             }
                         }).catch(function(error) {
                             console.log("Error getting document:", error);
                         });
         
         
                        
         
         
         
         
         
         
         
         
         
             }

             var ModalMain =document.getElementById("ModalMain")

             function DisplayAddMain(id){
                
                var docRef = db.collection("Ads").doc(id);
         
                         docRef.get().then(function(doc) {
                             if (doc.exists) {
                                 console.log("Document data:", doc.data());
                                 ModalMain.innerHTML=`
                                 
                             <div class="modal-header">
                             <a href="#" data-dismiss="modal" class="class pull-left"><span class="glyphicon glyphicon-remove"></span></a>
                                 <h3 class="modal-title">${doc.data().Category}</h3>
                             </div>
                             <div class="modal-body">
                                 <div class="row">
                                     <div class="col-md-6 product_img">
                                         <img src="${doc.data().img}" class="img-responsive">
                                     </div>
                                     <div class="col-md-6 product_content">
                                         <h2 id="Adtitle">${doc.data().AdTitle}</h2>
                                         <h4 id="name">Name: ${doc.data().Name}</h4>
                                         <p id="AdDescriptiion">${doc.data().AdDescription}</p>
                                         <h3 id="city"><span class="glyphicon glyphicon-map-marker"></span>${doc.data().city}</h3>
                                         <h3 id="Number"><span class="glyphicon glyphicon-earphone"></span>${doc.data().number}</h3>
                                         <h3 id="price"> RS ${doc.data().price}</h3>
                                          <button  class="btn btn-danger"  onclick="DisplayAddMain('${doc.id}')">Delete Add</button>


                                         <div class="space-ten"></div>
                                         <div class="btn-ground">
                                            
                                         </div>
                                     </div>
                                 </div>
                             </div>
                                  `;
         
                 
                             }
                         }).catch(function(error) {
                             console.log("Error getting document:", error);
                         });
         
         
                        
         
         
         
         
         
         
         
         
         
             }




             /* Removing Favorite */

           function  removeFavorite(id,AdId){
               
            var Ads = JSON.parse(localStorage.getItem("Fav"));
            for(var i=0 ; i<Ads.length ; i++){

                if(Ads[i].AdId==AdId){

                     var users=Ads.splice([i],1); 
                    localStorage.setItem("Fav", JSON.stringify(Ads));


                }

            }

               console.log(id)
               db.collection("Favorites").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
               

               /* PopUp  */
               
                showAndDismissAlert('danger',"Removed From Favorite!" )
              /* PopUp  */

               //window.location.href="account.html"

            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
           }





    

            function logout(){


                localStorage.clear();
                window.location.href="../index.html"
            
            
            }


