import { Context, Callback } from "aws-lambda";

interface Event { }

export function handler(event: Event, context: Context, callback: Callback) {
    new Promise((resolve, reject) => {
        throw new MyError("Error occurs");
    }).then();

    console.log("Lambda is finished");
    callback(null, true);
}

class MyError extends Error {
    constructor(err: string) {
        super(err);
    }
}