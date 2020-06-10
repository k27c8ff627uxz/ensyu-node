import { Context, Callback } from "aws-lambda";
import { Exp } from "./exp";

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
            case "number":
                return exp.value;
            case "add":
                return parseExp(exp.arg1) + parseExp(exp.arg2);
            case "minus":
                return -parseExp(exp.arg);
            case "mult":
                return parseExp(exp.arg1) * parseExp(exp.arg2);
            case "div":
                return 1 / parseExp(exp.arg);
        }
    }
}
