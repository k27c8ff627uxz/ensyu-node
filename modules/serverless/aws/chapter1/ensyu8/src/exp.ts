
// export interface Exp {
//     op: "number" | "add" | "minus" | "mult" | "div";
// }

export type Exp = ExpNum | ExpAdd | ExpMinus | ExpMult | ExpDiv;

export interface ExpNum {
    op: "number";
    value: number;
}

export interface ExpAdd {
    op: "add";
    arg1: Exp;
    arg2: Exp;
}

export interface ExpMinus {
    op: "minus";
    arg: Exp;
}

export interface ExpMult {
    op: "mult";
    arg1: Exp;
    arg2: Exp;
}

export interface ExpDiv {
    op: "div";
    arg: Exp;
}
