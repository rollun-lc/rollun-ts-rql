import AbstractQueryNode from '../AbstractQueryNode';

export default class AggregateFunctionNode extends AbstractQueryNode {
	readonly function;
	readonly field;

	constructor(functionName, field) {
		super();
		this.function = functionName;
		this.field = field;
	}
}
