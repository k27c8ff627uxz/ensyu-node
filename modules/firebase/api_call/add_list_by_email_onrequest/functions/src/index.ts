import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import authenticate from './authenticate';

admin.initializeApp();
const database = admin.database();

function dataPath(uid: string) {
  return `k27c8data/${uid}/add_list_by_email`;
}

interface ResponseData {
  response: string[];
}

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get<any, any, ResponseData>('/list', authenticate, async (req, res) => {
  functions.logger.info('API GET /list');
  const uid = req.header('uid');
  
  functions.logger.info(`uid: ${uid}`);
  const dbref = database.ref(dataPath(uid));
  const dbSnapshot = await dbref.get();
  const response = dbSnapshot.val() ?? [];

  functions.logger.info(`response: ${response}`);
  res.send({
    response
  })
});

app.post<any, any, ResponseData, {value: string}>('/list', authenticate, async (req, res) => {
  functions.logger.info('API POST /list');
  const uid = req.header('uid');

  functions.logger.info(`uid: ${uid}`);
  const dbref = database.ref(dataPath(uid));

  const dbSnapshot = await dbref.get();
  const data = dbSnapshot.val() ?? [];
  const newData = [...data, req.body.value];
  dbref.set(newData)

  res.send({
    response: newData,
  });
});

app.delete<any, {index: string}, ResponseData>('/list/:index', authenticate, async (req, res) => {
  const uid = req.header('uid');

  functions.logger.info(`uid: ${uid}`);
  const dbref = database.ref(dataPath(uid));

  const dbSnapshot = await dbref.get();
  const data: string[] = dbSnapshot.val() ?? [];
  const newData = data.filter((_, i) => i !== Number(req.params.index));
  dbref.set(newData);

  res.send({
    response: newData,
  })
});

exports.add_list_by_email_onrequest = functions.https.onRequest(app);
