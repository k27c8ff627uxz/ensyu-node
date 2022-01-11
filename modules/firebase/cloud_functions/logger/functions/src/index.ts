import * as express from 'express';
import * as functions from 'firebase-functions';
import { Logging } from '@google-cloud/logging';

// Examples:
//   curl -H "Content-Type: application/json" -d '{"payloadType": "text", "name": "my_log_name", "text": "hello" }' -X POST https://XXXXXXXX
//   curl -H "Content-Type: application/json" -d '{"payloadType": "json", "name": "my_log_name", "json": { "text": "hello"} }' -X POST https://XXXXXXXX

type LogData = {
  payloadType: 'text';
  name: string;
  text: string;
} | {
  payloadType: 'json';
  name: string;
  json: object;
}

const app = express();

app.post<any, any, any, LogData, any>('/', async (req, res) => {
  const logging = new Logging();
  const logData: LogData = req.body;
  const log = logging.log(logData.name);

  const entry = (() => {
    switch(logData.payloadType) {
      case 'text': {
        return log.entry(`${logData.text}`);
      }
      case 'json': {
        return log.entry({
          ...logData.json,
        });
      }
      default: {
        res.sendStatus(400);
        return undefined;
      }
    }
  })();
  await log.info(entry);

  res.send('OK');
});

exports.logTest= functions.https.onRequest(app);
