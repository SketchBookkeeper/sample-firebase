const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.firestore
	.document('products/{productId}')
	.onCreate((snap, context) => {
		const data = snap.data();
		const documentId = context.params.productId;
		const productRef = admin.firestore().collection('products').doc(documentId);

		return productRef.update({ message: `${data.name} is so cool` });
	});
