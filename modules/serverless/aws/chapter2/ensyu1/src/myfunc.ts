import { Context, Callback } from "aws-lambda";

interface Event { }

export async function handler(event: Event, context: Context, callback: Callback) {
    const env = process.env['MY_ENV'];
    callback(null, `env is ${env}`);
}
