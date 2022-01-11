import { Context, Callback } from "aws-lambda";

interface Event {
    value: number;
}

export function main(event: Event, context: Context, callback: Callback) {
    const result = isPrime(Math.floor(event.value));

    callback(null, result);    
}

function isPrime(n: number) {
    if (n < 2) return false;
    else if (n === 2) return true;
    else if (n%2 === 0) return false;

    const sqrtNum = Math.sqrt(n);
    for (let i = 3; i <= sqrtNum; i += 2)
    {
        if (n % i == 0)
        {
            return false;
        }
    }
    return true;
}