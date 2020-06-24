import { Context, Callback, DynamoDBStreamEvent } from "aws-lambda";

export async function handler(event: DynamoDBStreamEvent, context: Context, callback: Callback) {
    console.log(JSON.stringify(event));
    callback(null, "OK");
}
