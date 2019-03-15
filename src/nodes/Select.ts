import AbstractNode from './AbstractNode';
import AggregateFunctionNode from './aggregateNodes/AggregateFunctionNode';

export default class Select extends AbstractNode {
	readonly name = 'select';
	public fields: (string | AggregateFunctionNode)[];

	constructor(fields: (string | AggregateFunctionNode)[]) {
		super();
		this.fields = fields;
	}
}
