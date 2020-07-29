import { Context, Callback, CognitoUserPoolTriggerEvent } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

type Response = CognitoUserPoolTriggerEvent["response"];

export async function handler(event: CognitoUserPoolTriggerEvent, context: Context, callback: Callback) {
    console.log("event: %j", event);
    const response = createResponse(event.request.session);

    console.log({...event, response});
    callback(null, { ...event, response });
}

function createResponse(session: CognitoUserPoolTriggerEvent["request"]["session"]): Response {
    if (session === undefined) { return {}; }
    console.log(`This is ${session.length} times`);
    console.log("%j", session);

    if (session.length === 0) {
        return {
            issueTokens: false,
            failAuthentication: false,
            challengeName: 'CUSTOM_CHALLENGE',
        };
    }

    if (session[session.length - 1].challengeResult) {
        return {
            issueTokens: true,
            failAuthentication: false,
        }
    }

    return {
        issueTokens: false,
        failAuthentication: true,
    }
}
