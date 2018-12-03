import SelectNode from "./Nodes/SelectNode";
import SortNode from "./Nodes/SortNode";
import LimitNode from "./Nodes/LimitNode";
import AbstractNode from "./Nodes/AbstractNode";

export default class Query {
    protected selectNode;
    protected sortNode;
    protected limitNode;
    protected conditionsNode;

    public setSelectNode(node: SelectNode) {
        this.selectNode = node;
        return this;
    };

    public setSortNode(node: SortNode) {
        this.sortNode = node;
        return this;
    };

    public setLimitNode(node: LimitNode) {
        this.limitNode = node;
        return this;
    };

    public setConditionsNode(node: AbstractNode) {
        this.conditionsNode = node;
        return this;
    };

    public getSelectNode(): SelectNode {
        return this.selectNode;
    };

    public getSortNode(): SortNode {
        return this.sortNode;
    };

    public getLimitNode(): LimitNode {
        return this.limitNode;
    };

    public getConditionsNode(): AbstractNode {
        return this.conditionsNode;
    };
}
