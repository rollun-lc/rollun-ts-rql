import AbstractNode from "../AbstractNode";

export default abstract class AbstractArrayNode extends AbstractNode {
    readonly field: string;
    readonly values: any[];

    constructor(field: string, values: any[]) {
        super();
        this.field = field;
        this.values = values;
    }
}
