import { Context, Callback } from "aws-lambda";

interface Event { }

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

export async function handler(event: Event, context: Context, callback: Callback) {
    await sleep(15000);
    callback(null, "A lambda is finished.");
}
