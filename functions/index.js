const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.sendNotification = functions.firestore.document('/rooms/{roomId}/Message/{messageId}')
    .onWrite((event) => {

        console.info("event After >>>", event.after)
        let resieverId = event.after.data().reciverId;
        let senderId = event.after.data().senderId;
        return admin.firestore().collection("Users").doc(senderId).get().then((user) => {

            if (!user.data()) return;

            const snapshot = user.data();
            const payload = {
                notification: {
                    title: `New Message From ${snapshot.name}`,
                    body: event.after.data().message,
                    icon: `../Images/192.png`, 

                }
            }
            return admin.firestore().collection("Users").doc(event.after.data().reciverId)
                .get().then(reciever => {
                    console.info("reciever", reciever)
                    return admin.messaging().sendToDevice(reciever.data().token, payload);
                })


        });
    })