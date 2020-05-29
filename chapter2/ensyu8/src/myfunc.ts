import { Context, Callback } from "aws-lambda";

// Run 'sls deploy [ --myopt hoge ]"
interface Event { }

export async function handler(event: Event, context: Context, callback: Callback) {
    const message = process.env['message'];
    callback(null, message);
}
