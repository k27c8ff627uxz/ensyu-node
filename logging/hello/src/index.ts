import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import { Request } from 'express';
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

export const helloLog: HttpFunction = async (req: Request<any, any, LogData, any, any>, res) => {
  const logging = new Logging();
  const logData = req.body;
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
      default: throw new Error('Invalid body');
    }
  })();
  await log.info(entry);

  res.send('OK');
};
