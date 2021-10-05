import AbstractNode from './AbstractNode';

export default class GroupBy extends AbstractNode {
	readonly fields: any[];

	readonly name = 'groupby';

	constructor(fields: any[]) {
		super();
		this.fields = fields;
	}
}
