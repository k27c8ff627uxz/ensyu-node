import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

export const helloGETts: HttpFunction = (req, res) => {
  res.send('Hello World!');
};
