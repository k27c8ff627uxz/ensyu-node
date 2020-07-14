import { CognitoUserPoolTriggerEvent, Context, Callback } from "aws-lambda";

// If 'false', Signup is failed
const signUpAllow = true;

export function handler(event: CognitoUserPoolTriggerEvent, context: Context, callback: Callback) {
    console.log('%j', event);
    callback(null, signUpAllow ? event : null);
}
