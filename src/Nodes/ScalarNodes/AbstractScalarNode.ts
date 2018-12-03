import AbstractNode from "../AbstractNode";

export default abstract class AbstractScalarNode  extends AbstractNode {
    readonly field;
    readonly value;

    public constructor(field: string, value: any) {
        super();
        this.field = field;
        this.value = value;
    }
}
