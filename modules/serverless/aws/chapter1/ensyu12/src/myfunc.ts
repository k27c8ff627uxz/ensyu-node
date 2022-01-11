import { Context, Callback } from "aws-lambda";

interface Event { }

export function handler(event: Event, context: Context, callback: Callback) {
    new Promise((resolve, reject) => {
        resolve("Unsynchronize");
    }).then(res => {
        console.log(res);
    });

    console.log("Lambda is finished");
    callback(null, true);
}