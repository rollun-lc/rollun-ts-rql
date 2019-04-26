import AbstractNode from './AbstractNode';

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

	get sortOptions(): SortOptions {
		return this._sortOptions;
	}

	set sortOptions(value: SortOptions) {
		this._sortOptions = value;
	}
}
