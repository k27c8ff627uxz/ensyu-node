import { Context, Callback } from "aws-lambda";

// Run 'sls deploy --myopt hoge"
interface Event { }

export async function handler(event: Event, context: Context, callback: Callback) {
    const myopt = process.env['MY_OPT'];
    callback(null, `myopt: ${myopt}`);
}
