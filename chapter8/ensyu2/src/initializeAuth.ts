import { Context, APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";
import { CognitoIdentityServiceProvider } from "aws-sdk";

interface Parameter {
    username: string;
    password: string;
}

function parseParameter(body: string | null ): Parameter | undefined {
    let param: any;
    try {
        if (body === null) { return undefined; }
        param = JSON.parse(body);

        if (param.username && param.password) {
            return param as Parameter;
        }
        return undefined;
    } catch(e) {
        return undefined;
    }
}

export async function handler(event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) {
    const param = parseParameter(event.body);
    if (param === undefined) {
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid body', code: 'BadRequest' }),
        });
        return;
    }

    const cognito = new CognitoIdentityServiceProvider();
    try {
        const response = await cognito.initiateAuth({
            ClientId: process.env['UserPoolClientId'],
            AuthFlow: 'USER_PASSWORD_AUTH',
            AuthParameters: { USERNAME: param.username, PASSWORD: param.password },
        } as CognitoIdentityServiceProvider.Types.InitiateAuthRequest).promise();
        if  (response.AuthenticationResult === undefined) {
                callback(null, {
                    statusCode: 400,
                    body: `This account cannot be used in this sample: ${JSON.stringify(response)}`,
                });
                return;
            }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(response.AuthenticationResult),
        });
    } catch(err) {
        callback(null, {
            statusCode: 400,
            body: JSON.stringify(err),
        });
    }
}
