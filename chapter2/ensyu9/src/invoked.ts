import { Context, Callback } from "aws-lambda";
import { Event, Result } from "./invokedLambdaEvnet";

export async function handler(event: Event, context: Context, callback: Callback<Result>) {
    const res: Result = {
        message: "Lambda is Invoked!!!",
        resultValue: 2 * event.value,
    };
    callback(null, res);
}