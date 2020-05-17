import { Context, Callback } from "aws-lambda";

interface Event { }

export function handler(event: Event, context: Context, callback: Callback) {
    callback("Error Title", "An error occurs");
}
