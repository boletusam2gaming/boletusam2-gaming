const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.setAdminRole = functions.https.onCall(async (data, context) => {
  // Check if the request is made by an authenticated user
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }

  // Check if the user making the request is an admin
  const requester = await admin.auth().getUser(context.auth.uid);
  if (!requester.customClaims || requester.customClaims.admin !== true) {
    throw new functions.https.HttpsError('permission-denied', 'The function must be called by an admin.');
  }

  const { uid } = data;

  try {
    // Set custom user claims
    await admin.auth().setCustomUserClaims(uid, { admin: true });

    return { message: `Admin role assigned to user ${uid}` };
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error.message, error);
  }
});