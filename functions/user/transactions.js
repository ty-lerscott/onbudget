const { chunkify } = require('../utils/array.js')
const { addMonths, startOfMonth, endOfMonth } = require('date-fns')

const getTransactions = admin => async (
  { isEmulating, limit, startAt, ...body },
  { auth }
) => {
  const db = admin.firestore()

  if (isEmulating) {
    db.emulatorOrigin = 'http://localhost:8080'
  }

  const statement = []
  const today = new Date()

  const yearAgo = startOfMonth(addMonths(today, -11)).getTime()

  const transactionsRef = admin
    .firestore()
    .collection('users')
    .doc(auth.uid)
    .collection('transactions')

  const query = !!limit
    ? transactionsRef
        .orderBy('date', 'desc')
        .startAt(startAt ? startAt + 1 : today.getTime())
        .limit(limit)
    : transactionsRef.where('date', '>=', yearAgo).orderBy('date')

  try {
    await query.get().then(snapshots => {
      snapshots.forEach(snapshot => {
        statement.push({ id: snapshot.id, ...snapshot.data() })
      })
    })
  } catch (err) {
    return {
      errors: [
        {
          message: err.message
        }
      ]
    }
  }
  return statement
}

const getTransactionsByMonth = admin => async (
  { isEmulating, body },
  { auth }
) => {
  const db = admin.firestore()

  if (isEmulating) {
    db.emulatorOrigin = 'http://localhost:8080'
  }

  const statement = []
  const date = new Date(body)

  try {
    await admin
      .firestore()
      .collection('users')
      .doc(auth.uid)
      .collection('transactions')
      .where('date', '>=', startOfMonth(date).getTime())
      .where('date', '<=', endOfMonth(date).getTime())
      .get()
      .then(snapshots => {
        snapshots.forEach(snapshot => {
          statement.push({ id: snapshot.id, ...snapshot.data() })
        })
      })
  } catch (err) {
    return {
      errors: [
        {
          message: err.message
        }
      ]
    }
  }

  return statement
}

const addTransaction = admin => async ({ isEmulating, ...body }, { auth }) => {
  const db = admin.firestore()
  let resp

  if (isEmulating) {
    db.emulatorOrigin = 'http://localhost:8080'
  }

  const userRef = admin.firestore().collection('users').doc(auth.uid)

  await userRef
    .collection('transactions')
    .doc()
    .set(body)
    .catch(err => {
      resp = {
        errors: [{ message: err.message }]
      }
    })

  return resp
}

const editTransaction = admin => async (
  { isEmulating, id, ...transaction },
  { auth }
) => {
  const db = admin.firestore()
  let resp

  if (isEmulating) {
    db.emulatorOrigin = 'http://localhost:8080'
  }

  await admin
    .firestore()
    .collection('users')
    .doc(auth.uid)
    .collection('transactions')
    .doc(id)
    .update(transaction)
    .then(() => {
      resp = {}
    })
    .catch(err => {
      resp = {
        errors: [{ message: err.message }]
      }
    })

  return resp
}

const deleteTransaction = admin => async (
  { isEmulating, transactionId, ...body },
  { auth }
) => {
  const db = admin.firestore()
  let resp

  if (isEmulating) {
    db.emulatorOrigin = 'http://localhost:8080'
  }
  await admin
    .firestore()
    .collection('users')
    .doc(auth.uid)
    .collection('transactions')
    .doc(transactionId)
    .delete()
    .catch(function (err) {
      resp = { errors: [err.message] }
    })

  return resp
}

const normalizeEntry = ({ entry, fallbackCategoryId, categories }) => ({
  ...entry,
  categoryId:
    (
      categories.find(
        ({ name }) => name.toLowerCase() === entry.category.toLowerCase()
      ) || {}
    ).id ||
    fallbackCategoryId ||
    ''
})

const importStatement = admin => async (
  { isEmulating, body, ...rest },
  { auth }
) => {
  const db = admin.firestore()

  if (isEmulating) {
    db.emulatorOrigin = 'http://localhost:8080'
  }

  const categories = []

  const userRef = admin.firestore().collection('users').doc(auth.uid)

  try {
    await userRef
      .collection('categories')
      .get()
      .then(snapshots => {
        snapshots.forEach(snapshot => {
          categories.push({ id: snapshot.id, ...snapshot.data() })
        })
      })
  } catch (err) {
    return {
      errors: [{ message: err.message }]
    }
  }

  const { id: fallbackCategoryId } =
    categories.find(({ name }) => name.toLowerCase() === 'other') || {}

  // firebase has a hard limit of 500 writes per batch
  const chunks = chunkify(body, 450)

  // For each chunk, batch
  const userTransactionsCollection = userRef.collection('transactions')

  console.warn(`Num of Chunks ${chunks.length}`)

  const batchCommit = () =>
    new Promise(resolve => {
      chunks.forEach((chunk, index) => {
        const batch = db.batch()
        chunk.forEach(entry => {
          batch.set(
            userTransactionsCollection.doc(),
            normalizeEntry({
              entry,
              categories,
              fallbackCategoryId
            })
          )
        })
        batch.commit().then((...args) => {
          console.warn(`Chunk Index: ${index}`)
          resolve(200)
        })
      })
    })

  const status = await batchCommit()

  return status
}

module.exports = {
  addTransaction,
  editTransaction,
  getTransactions,
  importStatement,
  deleteTransaction,
  getTransactionsByMonth
}
