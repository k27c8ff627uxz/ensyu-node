import { Context, APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";

export function handler(event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) {
    const query = event.queryStringParameters === null ? undefined : event.queryStringParameters;
    const requestBody = event.body === null ? undefined : event.body;
    const response = {
        path1: event.pathParameters.path1,
        path2: event.pathParameters.path2,
        query,
        body: requestBody,
    }
    console.log(JSON.stringify(event));
    callback(
        null,
        {
            statusCode: 200,
            body: JSON.stringify(response),
        }
    )
}
