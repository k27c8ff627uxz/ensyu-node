import { Context, Callback } from "aws-lambda";

interface Event { }

export async function handler(event: Event, context: Context, callback: Callback) {
    const region = process.env['REGION'];
    const stage = process.env['STAGE'];
    callback(null, `region: ${region}, stage: ${stage}`);
}
