import AbstractNode from "./AbstractNode";

export default class Select extends AbstractNode {
    readonly name = 'select';
    readonly fields: string[];

    constructor(fields: string[]) {
        super();
        this.fields = fields;
    }
}
