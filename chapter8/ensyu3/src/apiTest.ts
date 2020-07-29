import { Context, APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";

export function handler(event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) {
    callback(
        null,
        {
            statusCode: 200,
            body: JSON.stringify(event.requestContext.authorizer.claims),
        }
    )
}
