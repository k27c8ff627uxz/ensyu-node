import { Context, Callback } from "aws-lambda";

// Run 'export MYENV=xxx"
interface Event { }

export async function handler(event: Event, context: Context, callback: Callback) {
    const myenv = process.env['MY_ENV'];
    callback(null, `MYENV: ${myenv}`);
}
