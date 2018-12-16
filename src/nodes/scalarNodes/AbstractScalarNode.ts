import AbstractQueryNode from "../AbstractQueryNode";

export default abstract class AbstractScalarNode  extends AbstractQueryNode {
    public field;
    public value;

    public constructor(field: string, value: any) {
        super();
        this.field = field;
        this.value = value;
    }
}
