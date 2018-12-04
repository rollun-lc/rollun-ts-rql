import Select from "./nodes/Select";
import Sort from "./nodes/Sort";
import Limit from "./nodes/Limit";
import AbstractQueryNode from "./nodes/AbstractQueryNode";

export default class Query {
    readonly selectNode;
    readonly sortNode;
    readonly limitNode;
    readonly queryNode;

    constructor(
        props: {
            select?: Select,
            sort?: Sort,
            limit?: Limit,
            query?: AbstractQueryNode,
        }) {
        this.selectNode = props.select;
        this.sortNode = props.sort;
        this.limitNode = props.limit;
        this.queryNode = props.query;
    }
}
