import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest(
  (req, res) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    res.send('Hello, World');
  }
);






















































