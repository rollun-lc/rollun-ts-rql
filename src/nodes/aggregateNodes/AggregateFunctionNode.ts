import AbstractQueryNode from '../AbstractQueryNode';

export default class AggregateFunctionNode extends AbstractQueryNode {

	protected _function;
	protected _field;
	readonly name;

	constructor(functionName, field) {
		super();
		this._function = functionName;
		this._field = field;
		this.name = functionName;
	}

	get function() {
		return this._function;
	}

	get field() {
		return this._field;
	}
}
