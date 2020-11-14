const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { onUserCreate } = require("./user/create.js");
const {
  addCategory,
  editCategory,
  getCategories,
} = require("./user/categories.js");
const {
  addTransaction,
  getTransactions,
  importStatement,
  getTransactionsByMonth,
} = require("./user/transactions");

const { requestAccess } = require("./user/requestAccess.js");

admin.initializeApp({
  apiKey: "AIzaSyBBUtULZb9dSNyz-0FAgKS8k3Tx90uxVRs",
  authDomain: "on-budget-app.firebaseapp.com",
  databaseURL: "https://on-budget-app.firebaseio.com",
  projectId: "on-budget-app",
  storageBucket: "on-budget-app.appspot.com",
  messagingSenderId: "273430886391",
  appId: "1:273430886391:web:3bf8aeef8c75f15baf60f2",
  measurementId: "G-PJWK48EWV2",
});

exports.requestAccess = functions.https.onCall(requestAccess(admin));
exports.newUserSignup = functions.auth.user().onCreate(onUserCreate(admin));

exports.categories = functions.https.onCall(getCategories(admin));
exports.addCategory = functions.https.onCall(addCategory(admin));
exports.editCategory = functions.https.onCall(editCategory(admin));

exports.transactions = functions.https.onCall(getTransactions(admin));
exports.addTransaction = functions.https.onCall(addTransaction(admin));

exports.transactionsByMonth = functions.https.onCall(
  getTransactionsByMonth(admin)
);

exports.importStatement = functions.https.onCall(importStatement(admin));
