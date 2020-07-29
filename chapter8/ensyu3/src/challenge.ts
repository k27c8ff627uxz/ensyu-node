import { Context, APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

interface Parameter {
    username: string;
}

function parseParameter(body: string | null ): Parameter | undefined {
    let param: any;
    try {
        if (body === null) { return undefined; }
        param = JSON.parse(body);

        if (param.username) {
            return param as Parameter;
        }
        return undefined;
    } catch(e) {
        return undefined
    }
}

export async function handler(event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) {
    const response = await createResponse(event);
    callback(null, response);
}

async function createResponse(event: APIGatewayEvent) {
    const parameter = parseParameter(event.body);
    if (parameter === undefined) {
        return {
            statusCode: 400,
            body: 'Illegal query parameters',
        };
    }

    try {
        const cognito = new CognitoIdentityServiceProvider();
        const response = await cognito.initiateAuth({
            ClientId: process.env['UserPoolClientId'],
            AuthFlow: 'CUSTOM_AUTH',
            AuthParameters: { USERNAME: parameter.username },
        } as CognitoIdentityServiceProvider.Types.InitiateAuthRequest).promise();
        console.log(response);
        return {
            statusCode: 200,
            body: `Question: ${response.ChallengeParameters!.challenge}, SESSION=${response.Session!}`,
        }
    } catch (err) {
        console.log("error: %j", err);
        if (
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
