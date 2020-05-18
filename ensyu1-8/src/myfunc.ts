import { Context, Callback } from "aws-lambda";
import { Exp, Operation } from "./exp";

export function main(exp: Exp, context: Context, callback: Callback) {
    try {
        const result = parseExp(exp);
        callback(null, result);
    } catch(e) {
        callback(e);
    }
}

function parseExp(exp: Exp): number {
    if (typeof exp === "number") {
        return exp
    } else {
        switch (exp.op) {
            case Operation.add:
                return parseExp(exp.arg1) + parseExp(exp.arg2);
            case Operation.minus:
                return -parseExp(exp.arg);
            case Operation.mult:
                return parseExp(exp.arg1) * parseExp(exp.arg2);
            case Operation.div:
                return 1 / parseExp(exp.arg);
        }
    }
}
