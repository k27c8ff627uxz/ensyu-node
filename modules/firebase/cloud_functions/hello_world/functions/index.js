const functions = require('firebase-functions')

exports.helloWorld = functions.https.onRequest(
  (req, res) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    res.send('Hello, World');
  }
)































































