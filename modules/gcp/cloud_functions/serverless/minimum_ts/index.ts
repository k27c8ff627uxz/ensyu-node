import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

export const helloSlsGETts: HttpFunction = (req, res) => {
  res.send('Hello World!');
};
