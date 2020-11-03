const { getCategories } = require("./categories.js");
const { chunkify } = require("../utils/array.js");
const { addMonths, startOfMonth, endOfMonth } = require("date-fns");

const getTransactions = (admin) => async (
  { isEmulating, ...body },
  { auth }
) => {
  const db = admin.firestore();

  if (isEmulating) {
    db.emulatorOrigin = "http://localhost:8080";
  }

  const statement = [];
  const today = new Date();

  const yearAgo = startOfMonth(addMonths(today, -12)).getTime();

  try {
    await admin
      .firestore()
      .collection("users")
      .doc(auth.uid)
      .collection("transactions")
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
};

const getTransactionsByMonth = (admin) => async (
  { isEmulating, body },
  { auth }
) => {
  const db = admin.firestore();

  if (isEmulating) {
    db.emulatorOrigin = "http://localhost:8080";
  }

  const statement = [];
  const date = new Date(body);

  try {
    await admin
      .firestore()
      .collection("users")
      .doc(auth.uid)
      .collection("transactions")
      .where("date", ">=", startOfMonth(date).getTime())
      .where("date", "<=", endOfMonth(date).getTime())
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
};

const addTransaction = (admin) => async (
  { isEmulating, ...body },
  { auth }
) => {
  const db = admin.firestore();
  let resp;

  if (isEmulating) {
    db.emulatorOrigin = "http://localhost:8080";
  }

  await admin
    .firestore()
    .collection("users")
    .doc(auth.uid)
    .collection("transactions")
    .doc()
    .set(body)
    .catch((err) => {
      resp = {
        errors: [{ message: err.message }],
      };
    });

  return resp;
};

const normalizeEntry = ({ entry, fallbackCategoryId, categories }) => ({
  ...entry,
  categoryId:
    (
      categories.find(
        ({ name }) => name.toLowerCase() === entry.category.toLowerCase()
      ) || {}
    ).id ||
    fallbackCategoryId ||
    "",
});

const addStatement = (admin) => async (
  { isEmulating, csv, ...rest },
  { auth }
) => {
  const db = admin.firestore();

  //   let resp;

  if (isEmulating) {
    db.emulatorOrigin = "http://localhost:8080";
  }

  const categories = await getCategories(admin)({ isEmulating }, { auth });

  const { id: fallbackCategoryId } =
    categories.find(({ name }) => name.toLowerCase() === "other") || {};

  // firebase has a hard limit of 500 writes per batch
  const chunks = chunkify(csv, 450);

  // For each chunk, batch
  const userTransactionsCollection = db
    .collection("users")
    .doc(auth.uid)
    .collection("transactions");

  console.warn(`Num of Chunks ${chunks.length}`);

  const batchCommit = () =>
    new Promise((resolve) => {
      chunks.forEach((chunk, index) => {
        const batch = db.batch();
        chunk.forEach((entry) => {
          batch.set(
            userTransactionsCollection.doc(),
            normalizeEntry({ entry, categories, fallbackCategoryId })
          );
        });
        batch.commit().then((...args) => {
          console.warn(`Chunk Index: ${index}`);
          resolve(200);
        });
      });
    });

  const status = await batchCommit();

  return status;
};

module.exports = {
  addStatement,
  addTransaction,
  getTransactions,
  getTransactionsByMonth,
};
