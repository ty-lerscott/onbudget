const requestAccess = (admin) => async ({ isEmulating, ...body }, { auth }) => {
  if (!body.firstName.trim() || !body.lastName.trim() || !body.email.trim()) {
    return {
      errors: [{ message: "First name, last name and email are required" }],
    };
  }

  const db = admin.firestore();

  if (isEmulating) {
    db.emulatorOrigin = "http://localhost:8080";
  }

  try {
    await admin.firestore().collection("requestAccess").add(body);

    return;
  } catch (err) {
    return {
      errors: [{ message: err.message }],
    };
  }
};

module.exports = { requestAccess };
