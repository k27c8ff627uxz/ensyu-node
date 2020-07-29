import { Context, APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

interface Parameter {
    username: string;
    answer: string;
    session: string;
}

function parseParameter(body: string | null ): Parameter | undefined {
    let param: any;
    try {
        if (body === null) { return undefined; }
        param = JSON.parse(body);

        if (param.username || param.answer || param.session) {
            return param as Parameter;
        }
        return undefined;
    } catch(e) {
        return undefined
    }
}

export async function handler(event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) {
    const response = await createResponse(event);
    return callback(null, response)
}

async function createResponse(event: APIGatewayEvent) {
    const param = parseParameter(event.body);
    if (param === undefined) {
        return {
            statusCode: 400,
            body: 'Illegal query parameters',
        };
    }

    try {
        const cognito = new CognitoIdentityServiceProvider();
        const response = await cognito.respondToAuthChallenge({
            ClientId: process.env['UserPoolClientId'],
            ChallengeName: 'CUSTOM_CHALLENGE',
            ChallengeResponses: {
                USERNAME: param.username,
                ANSWER: param.answer,
            },
            Session: param.session,
        } as CognitoIdentityServiceProvider.Types.RespondToAuthChallengeRequest).promise();
        console.log("response: %j", response);
        return {
            statusCode: 200,
            body: `TOKEN=${response.AuthenticationResult!.IdToken!}`,
        };
    } catch(err) {
        console.log("error: %j", err);
        if (
            err?.code === 'CodeMismatchException' ||
            err?.code === 'NotAuthorizedException' ||
            err?.code === 'UserNotConfirmedException' ||
            err?.code === 'UserNotFoundException'
        ) {
            return {
                statusCode: 500,
                body: JSON.stringify(err),
            }
        }
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }
}
