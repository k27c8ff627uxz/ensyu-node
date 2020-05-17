import { Context, Callback } from "aws-lambda";

interface Event { }

export function handler(event: Event, context: Context, callback: Callback) {
    console.log(context);
    callback(null, "Hello, world!!");
}