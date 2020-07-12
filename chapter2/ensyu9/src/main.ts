import { Context, Callback } from "aws-lambda";
import { Lambda } from "aws-sdk";
import { Result as Response } from "./invokedLambdaEvnet";
interface Event { }

export async function handler(event: Event, context: Context, callback: Callback) {
    const lambda = new Lambda();
    const response = await lambda.invoke({
        FunctionName: process.env['invokedLambdaName'],
        Payload: "{ \"value\": 3 }",
        InvocationType: "RequestResponse",
    }).promise();
    const result: Response = JSON.parse(response?.Payload)!;

    callback(null, `${result.message}(${result.resultValue})`);
}
