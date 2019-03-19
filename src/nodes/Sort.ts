import AbstractNode from './AbstractNode';

export declare const SORT_ASC = 1;
export declare const SORT_DESC = -1;

export interface SortOptions {
	[fieldName: string]: (1 | -1);
}

export default class Sort extends AbstractNode {

	readonly name = 'sort';
	private _sortOptions;

	constructor(sortOptions: SortOptions) {
		super();
		this._sortOptions = sortOptions;
	}

	get sortOptions() {
		return this._sortOptions;
	}

	set sortOptions(value) {
		this._sortOptions = value;
	}
}
