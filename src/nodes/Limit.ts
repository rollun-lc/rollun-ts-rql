import AbstractNode from './AbstractNode';

export default class Limit extends AbstractNode {

	readonly name = 'limit';
	private _limit: number;
	private _offset: number;

	constructor(limit: number, offset: number = 0) {
		super();
		this._limit = limit;
		this._offset = offset;
	}

	get limit(): number {
		return this._limit;
	}

	set limit(value: number) {
		this._limit = value;
	}

	get offset(): number {
		return this._offset;
	}

	set offset(value: number) {
		this._offset = value;
	}

	next() {
		this._offset += this._limit;
		return this;
	}
}
