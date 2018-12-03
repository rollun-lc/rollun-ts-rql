import AbstractNode from "../AbstractNode";

export default class AbstractLogicalNode extends AbstractNode {
    readonly queries;

    constructor(name: string, queries: AbstractNode[]) {
        super(name);
        this.queries = queries;
    }
}
