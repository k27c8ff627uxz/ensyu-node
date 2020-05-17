import { Context, Callback } from "aws-lambda";

interface Event { }

export function handler(event: Event, context: Context, callback: Callback) {
    callback(new MyError("Error Title"), "An error occurs.");
}

class MyError extends Error {
    constructor(err: string) {
        super(err);
    }
}