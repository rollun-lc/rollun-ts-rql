import AbstractNode from "./AbstractNode";

export declare const SORT_ASC = 1;
export declare const SORT_DESC = -1;

export interface SortOptions {
    [fieldName: string]: (1 | -1)
}

export default class SortNode extends AbstractNode {
    readonly name = 'sort';
    readonly sortOptions;

    constructor(sortOptions: SortOptions) {
        super();
        this.sortOptions = sortOptions;
    }
}
