import AbstractNode from "./AbstractNode";

export default class Limit extends AbstractNode {
    readonly name = 'limit';
    readonly limit: number;
    readonly offset: number;

    constructor(limit: number, offset: number = 0) {
        super();
        this.limit = limit;
        this.offset = offset;
    }
}
