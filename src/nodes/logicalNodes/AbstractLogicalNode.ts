import AbstractQueryNode from "../AbstractQueryNode";
import AbstractNode from "../AbstractNode";

export default abstract class AbstractLogicalNode extends AbstractQueryNode {
    readonly subNodes;

    constructor(subNodes: AbstractNode[]) {
        super();
        this.subNodes = subNodes;
    }
}
