const onUserCreate = admin => async user => {
	try {
		await admin.firestore().collection('users').doc(user.uid).set({})
	} catch (err) {
		console.log('!!!!!!!! adding user doc !!!!!!!!!!!!')
		console.log(err.message)
		console.log('!!!!!!!!!!!!!!!!!!!!')
	}

	// try {
	//   await admin
	//     .firestore()
	//     .collection("users")
	//     .doc(user.uid)
	//     .collection("transactions")
	//     .add({});
	// } catch (err) {
	//   console.log("!!!!!!!! adding user transactions !!!!!!!!!!!!");
	//   console.log(err.message);
	//   console.log("!!!!!!!!!!!!!!!!!!!!");
	// }

	try {
		await admin
			.firestore()
			.collection('users')
			.doc(user.uid)
			.collection('categories')
			.add({
				name: 'Other',
				color: '#cccccc',
				isBill: false,
				isDeposit: false
			})
	} catch (err) {
		console.log('!!!!!!!! adding user categories !!!!!!!!!!!!')
		console.log(err.message)
		console.log('!!!!!!!!!!!!!!!!!!!!')
	}
}

module.exports = { onUserCreate }
