import { Context, Callback, CognitoUserPoolTriggerEvent } from "aws-lambda";

type Response = CognitoUserPoolTriggerEvent["response"];

export async function handler(event: CognitoUserPoolTriggerEvent, context: Context, callback: Callback) {
    console.log("%j", event);

    const response = createResponse(event);

    callback(null, { ...event, response });
}

function createResponse(event: CognitoUserPoolTriggerEvent): Response {
    if (event.request.challengeName === 'CUSTOM_CHALLENGE') {
        const num = Math.floor( Math.random() * 10 );
    
        return {
            publicChallengeParameters: { challenge: `Answer the value of square of ${num}` },
            privateChallengeParameters: { question: `${num}`},
            challengeMetadata: `${process.env['ChallengeMetaData']}-${event.request.session!.length}`,
        };
    }

    return {};
}
