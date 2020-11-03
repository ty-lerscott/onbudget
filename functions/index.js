const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { onUserCreate } = require("./user/create.js");
const { getCategories, addCategory } = require("./user/categories.js");
const {
  addStatement,
  addTransaction,
  getTransactions,
  getTransactionsByMonth,
} = require("./user/transactions");

admin.initializeApp();

exports.newUserSignup = functions.auth.user().onCreate(onUserCreate(admin));

exports.categories = functions.https.onCall(getCategories(admin));
exports.addCategory = functions.https.onCall(addCategory(admin));

exports.transactions = functions.https.onCall(getTransactions(admin));
exports.addTransaction = functions.https.onCall(addTransaction(admin));
exports.transactionsByMonth = functions.https.onCall(
  getTransactionsByMonth(admin)
);

exports.addStatement = functions.https.onCall(addStatement(admin));

// exports.getStatementByMonth =
