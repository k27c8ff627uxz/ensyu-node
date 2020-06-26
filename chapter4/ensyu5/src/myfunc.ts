import { Context, APIGatewayEvent, APIGatewayProxyCallback } from "aws-lambda";

export function handler(event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) {
    console.log("API is called");
    callback(
        null,
        {
            statusCode: 200,
            headers: {
                 "content-type": "text/html",
            },
            body: "OK"
        }
    )
}
