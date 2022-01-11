import { Context, Callback } from "aws-lambda";

interface Event { }

export function handler(event: Event, context: Context, callback: Callback) {
    throw new MyError("Error Title");
}

class MyError extends Error {
    constructor(err: string) {
        super(err);
    }
}