const getCategories = (admin) => async ({ isEmulating }, { auth }) => {
  const db = admin.firestore();
  const categories = [];

  if (isEmulating) {
    db.emulatorOrigin = "http://localhost:8080";
  }

  try {
    await admin
      .firestore()
      .collection("users")
      .doc(auth.uid)
      .collection("categories")
      .get()
      .then((snapshots) => {
        snapshots.forEach((snapshot) => {
          categories.push({ id: snapshot.id, ...snapshot.data() });
        });
      });

    return categories;
  } catch (err) {
    return {
      errors: [{ message: err.message }],
    };
  }
};

const addCategory = (admin) => async ({ isEmulating, ...body }, { auth }) => {
  const db = admin.firestore();
  let resp;

  if (isEmulating) {
    db.emulatorOrigin = "http://localhost:8080";
  }

  await admin
    .firestore()
    .collection("users")
    .doc(auth.uid)
    .collection("categories")
    .doc()
    .set(body)
    .catch((err) => {
      resp = {
        errors: [{ message: err.message }],
      };
    });

  return resp;
};

module.exports = { getCategories, addCategory };
