import { Context, APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";
import { CognitoIdentityServiceProvider } from 'aws-sdk';

interface Parameter {
    email: string;
    code: string;
}

function parseParameter(body: string | null ): Parameter | undefined {
    let param: any;
    try {
        if (body === null) { return undefined; }
        param = JSON.parse(body);

        if (param.email && param.code) {
            return param as Parameter;
        }
        return undefined;
    } catch(e) {
        return undefined
    }
}

export function handler(event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) {
    const param = parseParameter(event.body);
    if (param === undefined) {
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid body', code: 'BadRequest' }),
        });
        return;
    }
    
    const cognito = new CognitoIdentityServiceProvider();
    cognito.confirmSignUp({
        ClientId: process.env['UserPoolClientId'],
        Username: param.email,
        ConfirmationCode: param.code,
    } as CognitoIdentityServiceProvider.Types.ConfirmSignUpRequest).promise()
    .then((res) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(res),
        });
    }).catch((err) => {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify(err),
        });
    });
}
