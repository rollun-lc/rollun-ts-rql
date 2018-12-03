import SelectNode from "./Nodes/SelectNode";
import SortNode from "./Nodes/SortNode";
import LimitNode from "./Nodes/LimitNode";
import AbstractNode from "./Nodes/AbstractNode";

export default class Query {
    readonly selectNode;
    readonly sortNode;
    readonly limitNode;
    readonly conditionNode;

    constructor(
        props: {
            select?: SelectNode,
            sort?: SortNode,
            limit?: LimitNode,
            condition?: AbstractNode,
        }) {
        this.selectNode = props.select;
        this.sortNode = props.sort;
        this.limitNode = props.limit;
        this.conditionNode = props.condition;
    }
}
