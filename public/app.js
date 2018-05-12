
document.addEventListener('DOMContentLoaded', e => {
	const app = firebase.app();

	const db = firebase.firestore();
	const settings = {
		timestampsInSnapshots: true,
	};
	db.settings(settings);

	const myPost = db.collection('posts').doc('firstpost');

	// Reading Data
	// uses a promise
	myPost.get()
	.then(doc => {
		const data = doc.data();
		//console.log(data);
	});

	// callback function
	myPost.onSnapshot(doc => {
		const data = doc.data();
		console.log(data);
	});

	// Query Products
	const productRef = db.collection('products');
	const query = productRef.orderBy('price', 'desc');

	query.get()
	.then(products => {
		products.forEach(doc => {
			const data = doc.data()
			console.log(`${data.name}, ${data.price}`);
		})
	})
});

// Writing Data
function updatePost(e) {
	const db = firebase.firestore();
	const settings = {
		timestampsInSnapshots: true,
	};
	db.settings(settings);

	const myPost = db.collection('posts').doc('firstpost');
	myPost.update({ title: e.target.value });
}

const input = document.querySelector('[data-update-post]');
input.addEventListener('change', updatePost);

// Auth
function googleLogin() {
	const provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider)
	.then(result => {
		const user = result.user;
		console.log(user);

	});
}
