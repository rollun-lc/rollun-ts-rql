import AbstractNode from "../AbstractNode";

export default abstract class AbstractLogicalNode extends AbstractNode {
    readonly subNodes;

    constructor(subNodes: AbstractNode[]) {
        super();
        this.subNodes = subNodes;
    }
}
