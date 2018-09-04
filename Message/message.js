//FIRESTORE 

var db = firebase.firestore();
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);


//FIRESTORE ENDED
if (localStorage.getItem("userId") === null) {
    window.location.href="../Login/login.html"
    alert("Please Login First")
    }
    else{
    
    }
/* Loader */
/* function showAndDismissAlert(type, message) {
    var htmlAlert = '<div class="alert alert-' + type + '">' + message + '</div>';
    $$(".alert-messages").prepend(htmlAlert);
    $(".alert-messages .alert").first().hide().fadeIn(1000).delay(1000).fadeOut(1000, function () { $(this).remove(); });
} */
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

  window.addEventListener('load', function(e) {
    if (navigator.onLine) {
      console.log('We\'re online!');
    } else {
        var offline=document.getElementById("offlineMessage").style.display="block"

        hideLoader()
        showAndDismissAlert('danger',"You Are Offline" )
    }
  }, false);
  
  window.addEventListener('online', function(e) {
    var offline=document.getElementById("offlineMessage").style.display="none"

    showAndDismissAlert('success',"You Are Online" )
  }, false);
  
  window.addEventListener('offline', function(e) {
    var offline=document.getElementById("offlineMessage").style.display="block"

        hideLoader()
        showAndDismissAlert('danger',"You Are Offline" )
  }, false);

  
/* Offline Showing Ads */

  /* PopUP Message */
    
                var userId=localStorage.getItem("userId");
                var reciverId=localStorage.getItem("reciverId");
                 var AdId=localStorage.getItem("AdId");

/* PopUP Message */
            /*  

                var reciveMessage =document.getElementById("reciveMessage");
               var Main= document.getElementById("Main")

                var userId=localStorage.getItem("userId");
                var AdUserId=localStorage.getItem("AdUserId");
                var AdId=localStorage.getItem("AdId");


                var messageRef = db.collection('rooms').add
               
                ({
         
                           createdAt: Date.now(),
                           users:{


                           [userId]:true,[AdUserId]:true
                           
                           },
                           ad_id: AdId
       
  
  
               }) .then(function(docRef) {
   
                var RoomId=localStorage.setItem("RoomId",docRef.id)
                   db.collection('rooms').doc(docRef.id)
                   .collection('Message').add({
                     message:"Hello Jee",
                     senderId:userId,
                     reciverId:AdUserId,
                     Time:currentTime
                       
  })
})
 */

    function getdata(){

            
                
                db.collection('rooms').where("ad_id", "==", AdId)
                .get().then(function(querySnapshot) {
                if (querySnapshot.size > 0) {
                    // Contents of first document
                    console.log(querySnapshot.docs[0].data());
                } else {
                    console.log("No such document!");
                }
                })
                .catch(function(error) {
                console.log("Error getting document: ", error);
                });



    }

                

    function gettingMessages(){


                        var roomId=localStorage.getItem("RoomId");
                        var reciverName=localStorage.getItem("reciverId")   
                        var MessageBox= document.getElementById("MessageBox")



                        var docRef = db.collection("Users").doc(reciverName);

                        docRef.get().then(function(doc) {
                            if (doc.exists) {
                                console.log("Document data:", doc.data());
                                MessageBox.innerHTML+=`
                                
                                <div class="container">
                   
                              <div class="chatRoom">
                             <img src="../Images/user.png" width="80px" height="80px;" id="Pic">
                             <h1>${doc.data().name}</h1>
                             </div>
                    
                            </div>
                                `;

                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                        });
                        
                        
                        

                        showLoader()
                            db.collection('rooms').doc(roomId).collection('Message').orderBy("Time", "asc")
                            
                                .onSnapshot(function(snapshot) {
                                snapshot.docChanges().forEach(function(change) {
                                    showLoader()
                                    if (change.type === "added") {
                                        if(change.doc.data().senderId==userId){ 
                                            
                                        Main.innerHTML+=`<div class="span1">
                                        <p id="sendMessage">${change.doc.data().message}
                                        <br>
                                        ${change.doc.data().Time}
                                        </p>
                                       </div>`;
                                       hideLoader()
                                    }
                                    else{

                                        Main.innerHTML+=`<div class="span1">
                                        <p id="reciveMessage">${change.doc.data().message}
                                        <br>
                                        ${change.doc.data().Time}
                                        </p>
                                       </div>`;
                                       hideLoader()
                                        
                                    }
                                       
                                         var objDiv = document.getElementById("Main");
                                        objDiv.scrollTop = objDiv.scrollHeight;
                                    }   
                                  
                                });
                                hideLoader()
                            })
                        
                           
                
                            



            
            }
               
               

                function sendMessage(){

                    var DateNew = new Date();
                    var currentTime = DateNew.toLocaleTimeString();

                    var RoomId1=localStorage.getItem("RoomId");

                    var messageText= document.getElementById("messageText").value;

                   db.collection('rooms').doc(RoomId1).collection('Message').add({


                    message:messageText,
                    senderId:userId,
                    reciverId:reciverId,
                    Time:currentTime

                   })



                   var messageText= document.getElementById("messageText").value=""

                }








                function  gettingRooms(){
                  var messages=  document.getElementById("ChatMain")
                    db.collection("rooms").where(`users.${userId}`,"==",true)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            showLoader()

                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            let roomId=doc.id

                            var users1=Object.keys(doc.data().users)
                            
                            if(users1[0]==userId){
                                var reciverId=users1[1]
                              

                                var docRef = db.collection("Users").doc(reciverId);
                                docRef.get().then(function(doc) {
                                  
                                         var userName=doc.data().name

                                        

                                         messages.innerHTML+=`
                                         
             
                                         <a onclick="gotoRoom(this)" roomId="${roomId}" reciverId="${reciverId}" >
                                         <div class="chatRoom">
                                         <img src="../Images/user.png" width="80px" height="80px;" id="Pic">
                                         <h1>${userName}</h1>
                                         <h1 id="rightArrow">></h1>	
                                         </div>
                                     </a>
                                         
                                         
                                         
                                         `;
                                        hideLoader()
    
                                  
                                })


                               

                                
                            }
                            else{
                                var reciverId= users1[0]
                    
                               
                                var docRef = db.collection("Users").doc(reciverId);
                                docRef.get().then(function(doc) {
                                  
                                         var userName=doc.data().name

                                         

                                         messages.innerHTML+=`
                                         
             
                                         <a onclick="gotoRoom(this)" roomId="${roomId}" reciverId="${reciverId}" >
                                         <div class="chatRoom">
                                         <img src="../Images/user.png" width="80px" height="80px;" id="Pic">
                                         <h1>${userName}</h1>
                                         <h1 id="rightArrow">></h1>	
                                         </div>
                                     </a>
                                         
                                         
                                         
                                         `;
                                         
                                    hideLoader()
                                  
                                })
                               
                            }


                            
                            

                          

                         

                            

                        });
                    })
                  
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });

                    hideLoader()
                }




                function gotoRoom(a){


                     var RoomId = a.getAttribute('roomId')
                     var reciverId=a.getAttribute('reciverId')
                    

                     var roomId=localStorage.setItem("RoomId",RoomId);
                     var reciverId=localStorage.setItem("reciverId",reciverId);

                  window.location.href="message.html" 
 
                }







                            /*   /* Message */
       /*  function messageRoom(){
                              var adUserId = 1424412
                             var adId=14245
                            var user2=21421

                             var messageRef = db.collection('rooms').add
               
                             ({
                      
                                        createdAt: Date.now(),
                                        users:{


                                        [adUserId]:true,[user2]:true
                                        
                                        },
                                        ad_id: adId
                    
               
               
                            }) .then(function(docRef) {
                
                                  currentRoom = docRef.id;
                                 console.log("current Room " + currentRoom)
                                  db.collection('rooms').doc(docRef.id)
                                .collection('Message').add({
                                  message:"Heelo",
                                  senderId:"23",
                                  reciverId:"32"
                                    
               })


          
                  console.log("Your Work Has Been Done Succesfully");
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              }); 
        



            }

             */



        /* getting Rooms */



           /*    db.collection('rooms').where('users.'+id,'==',true).get()
              .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                    
                  });
              })
              .catch(function(error) {
                  console.log("Error getting documents: ", error);
              });
 
             Getting Rooms 



               getting Rooms Messgaes 

               db.collection('rooms').doc(doc.id).collection('Message').get()
               .then(function(querySnapshot) {
                   querySnapshot.forEach(function(doc) {
                       // doc.data() is never undefined for query doc snapshots
                       console.log(doc.id, " => ", doc.data());
                   });
               })
               .catch(function(error) {
                   console.log("Error getting documents: ", error);
               }); 
 */
              
 
               /* Getting Rooms */


