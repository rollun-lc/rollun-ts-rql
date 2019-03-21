import AbstractQueryNode from '../AbstractQueryNode';

export default class AggregateFunctionNode extends AbstractQueryNode {

	protected _function: string;
	protected _field: string;
	readonly name;

	constructor(functionName: string, field: string) {
		super();
		this._function = functionName;
		this._field = field;
		this.name = functionName;
	}

	get function(): string {
		return this._function;
	}

	get field(): string {
		return this._field;
	}
}
