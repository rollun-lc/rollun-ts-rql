import AbstractNode from "./AbstractNode";

export default class Select extends AbstractNode {
    readonly name = 'select';
    public fields: string[];

    constructor(fields: string[]) {
        super();
        this.fields = fields;
    }
}
