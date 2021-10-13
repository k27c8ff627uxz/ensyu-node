import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const database = admin.database();

function dataPath(uid: string) {
  return `k27c8data/${uid}/add_list_by_email`;
}

export const getListOnCall = functions.https.onCall(
  async ({}, context) => {
    const auth = context.auth;
    if(auth === undefined) {
      throw new functions.https.HttpsError('unauthenticated', 'Auth Error');
    }

    const uid = auth.uid;
    const dbref = database.ref(dataPath(uid));
    const dbSnapshot = await dbref.get();
    const response = dbSnapshot.val() ?? [];

    functions.logger.info(`response: ${response}`);
    return {
      response,
    }
  }
);

export const addListOnCall = functions.https.onCall(
  async(params: {value: string}, context) => {
    const auth = context.auth;
    if(auth === undefined) {
      throw new functions.https.HttpsError('unauthenticated', 'Auth Error');
    }
    const uid = auth.uid;
    const dbref = database.ref(dataPath(uid));

    const dbSnapshot = await dbref.get();
    const data = dbSnapshot.val() ?? [];
    const newData = [...data, params.value];
    dbref.set(newData)

    return {data: newData}
  }
)

export const deleteListOnCall = functions.https.onCall(
  async(params: {index: number}, context) => {
    const auth = context.auth;
    if(auth === undefined) {
      throw new functions.https.HttpsError('unauthenticated', 'Auth Error');
    }
    const uid = auth.uid;
    const dbref = database.ref(dataPath(uid));

    const dbSnapshot = await dbref.get();
    const data = dbSnapshot.val() ?? [];
    const newData = data.filter((value, i) => i !== params.index);
    dbref.set(newData)

    return {data: newData}
  }
)
