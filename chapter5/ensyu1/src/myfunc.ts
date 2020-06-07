import { Context, Callback, S3Event, S3EventRecord } from "aws-lambda";

interface Event { }

export function handler(event: S3Event, context: Context, callback: Callback) {
    console.log(JSON.stringify(event));
}
