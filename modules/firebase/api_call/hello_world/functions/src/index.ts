import * as functions from 'firebase-functions';

export const helloOnRequest = functions.https.onRequest(
  (req, res) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    const resData = {
      header: req.header,
      headers: req.headers,
      params: req.params,
    }
    res.send(JSON.stringify(resData));
  }
);

export const helloOnCall = functions.https.onCall(
  (data, context) => {
    const message2 = `Your input is ${JSON.stringify(data)}`;
    const auth = context.auth;
    if(auth === undefined) {
      return {
        message2,
        message1: 'Not Authenticated!',
      }
    }
    const email = auth.token.email;
    const uid = auth.uid;
    return {
      message1: `Hello, ${email}(${uid})`,
      message2: `Your input is ${data}`,
    }
  }
);
