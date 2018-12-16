import AbstractNode from "./AbstractNode";

export declare const SORT_ASC = 1;
export declare const SORT_DESC = -1;

export interface SortOptions {
    [fieldName: string]: (1 | -1)
}

export default class Sort extends AbstractNode {
    readonly name = 'sort';
    public sortOptions;

    constructor(sortOptions: SortOptions) {
        super();
        this.sortOptions = sortOptions;
    }
}
