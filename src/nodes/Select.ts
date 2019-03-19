import AbstractNode from './AbstractNode';
import AggregateFunctionNode from './aggregateNodes/AggregateFunctionNode';

export default class Select extends AbstractNode {

	readonly name = 'select';
	private _fields: (string | AggregateFunctionNode)[];

	constructor(fields: (string | AggregateFunctionNode)[]) {
		super();
		this._fields = fields;
	}

	get fields(): (string | AggregateFunctionNode)[] {
		return this._fields;
	}

	set fields(value: (string | AggregateFunctionNode)[]) {
		this._fields = value;
	}
}
