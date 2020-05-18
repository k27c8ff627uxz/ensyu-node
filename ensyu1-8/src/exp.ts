
export type Exp = number | {
    op: Operation;
    arg?: Exp;
    arg1?: Exp;
    arg2?: Exp;
}

export enum Operation {
    add = "add",
    minus = "minus",
    mult = "mult",
    div = "div"
}
