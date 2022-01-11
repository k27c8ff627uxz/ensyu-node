import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

// run 'curl XXXX -H "Authorization: bearer $(gcloud auth print-identity-token)"
export const helloGETAuth: HttpFunction = (req, res) => {
  res.send('Hello World!');
};
