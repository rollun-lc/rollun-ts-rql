import AbstractQueryNode from "../AbstractQueryNode";

export default abstract class AbstractArrayNode extends AbstractQueryNode {
    readonly field: string;
    readonly values: any[];

    constructor(field: string, values: any[]) {
        super();
        this.field = field;
        this.values = values;
    }
}
