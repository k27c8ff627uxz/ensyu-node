import { Context, APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";

export function handler(event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) {
    console.log(JSON.stringify(event));
    callback(
        null,
        {
            statusCode: 200,
            body: "Hello, World!"
        }
    )
}
