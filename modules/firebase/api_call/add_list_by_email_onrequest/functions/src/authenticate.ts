import * as functions from 'firebase-functions';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const publicKeyUrl = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

async function getPublicKey(kid: string): Promise<string | undefined> {
  try {
    const result = await axios.get<{[kid: string]: string}>(publicKeyUrl);
    return result.data[kid];
  } catch {
    return undefined;
  }
}

function getKID(token: string): string | undefined {
  try {
    const [header64, payload64, signature64] = token.split('.');
    const header = Buffer.from(header64, 'base64').toString();
    const headerData = JSON.parse(header);
    return headerData['kid'];
  } catch {
    return undefined;
  }
}

export default async function authenticate(req: Request<any>, res: Response<any>, next: NextFunction) {
  functions.logger.info('get authorization header');
  const authorization = req.headers.authorization
  if (authorization === undefined) {
    res.status(401).send({error: 'Unauthorization: No Authorization Header'});
    return;
  }

  functions.logger.info('verify token');
  const regResult = authorization.match(/bearer[\s]+([\w\.\-]+)/);
  if (regResult === null) {
    res.status(401).send({error: 'Unauthorization: Invalid Authoriation Header'});
    return;
  }

  const token = regResult[1];
  functions.logger.info(`token: ${token}`);

  const kid = getKID(token);
  if(kid === undefined) {
    res.status(401).send({error: 'Unauthorization: Invalid token'});
    return;
  }
  functions.logger.info(`kid: ${kid}`);

  const pubKey = await getPublicKey(kid);
  if (pubKey === undefined) {
    res.status(401).send({error: 'Unauthorization: Invalid kid'});
    return;
  }
  functions.logger.info(`pub key: ${pubKey}`);

  try {
    const payload = jwt.verify(token, pubKey);
    functions.logger.info(`payload: ${payload}`);
    req.headers['uid'] = payload['user_id'];
    next();
  } catch(e) {
    functions.logger.info(e);
    res.status(401).send({error: 'Unauthorization: Invalid JWT'});
    return;
  }
};
