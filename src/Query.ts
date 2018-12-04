import Select from "./nodes/Select";
import Sort from "./nodes/Sort";
import Limit from "./nodes/Limit";
import AbstractNode from "./nodes/AbstractNode";

export default class Query {
    readonly selectNode;
    readonly sortNode;
    readonly limitNode;
    readonly conditionNode;

    constructor(
        props: {
            select?: Select,
            sort?: Sort,
            limit?: Limit,
            condition?: AbstractNode,
        }) {
        this.selectNode = props.select;
        this.sortNode = props.sort;
        this.limitNode = props.limit;
        this.conditionNode = props.condition;
    }
}
