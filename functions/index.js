const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

exports.newUserSignup = functions.auth.user().onCreate((user) => {
  admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .collection("expenses")
    .set({
      description: "",
    });

  admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .collection("categories")
    .set({
      name: "",
    });
});

exports.categories = functions.https.onCall(
  async ({ isEmulating }, { auth }) => {
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
      console.warn("what errors are happening", err.message);
      return {
        errors: [{ message: err.message }],
      };
    }
  }
);

exports.expenses = functions.https.onCall(
  async ({ isEmulating, ...body }, { auth }) => {
    const db = admin.firestore();

    if (isEmulating) {
      db.emulatorOrigin = "http://localhost:8080";
    }

    const statement = [];
    const yearAgo = new Date().setFullYear(new Date().getFullYear() - 1);

    try {
      await admin
        .firestore()
        .collection("users")
        .doc(auth.uid)
        .collection("expenses")
        .where("date", ">=", yearAgo)
        .get()
        .then((snapshots) => {
          snapshots.forEach((snapshot) => {
            statement.push({ id: snapshot.id, ...snapshot.data() });
          });
        });
    } catch (err) {
      return {
        errors: [
          {
            message: err.message,
          },
        ],
      };
    }

    return statement;
  }
);

// exports.getStatementByMonth =
