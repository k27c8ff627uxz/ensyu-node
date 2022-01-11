import { Context, APIGatewayEvent, APIGatewayProxyCallback, APIGatewayProxyResult } from "aws-lambda";
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
    console.log("event: %j", event);
    const param = parseParameter(event.body);
    if (param === undefined) {
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid body', code: 'BadRequest' }),
        });
        return;
    }

    const response = await createResponse(param.username, param.password);
    callback(null, response);
}

async function createResponse(username: string, password: string): Promise<APIGatewayProxyResult> {
    const cognito = new CognitoIdentityServiceProvider();

    try {
        const response = await cognito.initiateAuth({
            ClientId: process.env['UserPoolClientId'],
            AuthFlow: 'USER_PASSWORD_AUTH',
            AuthParameters: { USERNAME: username, PASSWORD: password },
        } as CognitoIdentityServiceProvider.Types.InitiateAuthRequest).promise();
        if  (response.AuthenticationResult === undefined) {
            return {
                statusCode: 400,
                body: `This account cannot be used in this sample: ${JSON.stringify(response)}`,
            };
        }
        console.log(JSON.stringify(response));
        return {
            statusCode: 200,
            body: `TOKEN=${response.AuthenticationResult.IdToken!}`,
        };
    } catch(err) {
        console.log("error: %j", err);
        if (
            err?.code === 'NotAuthorizedException' ||
            err?.code === 'UserNotConfirmedException'||
            err?.code === 'UserNotFoundException'
        ) {
            return {
                statusCode: 400,
                body: JSON.stringify(err),
            }
        }
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        };
    }
}

