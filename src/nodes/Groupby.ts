import AbstractNode from './AbstractNode';

export default class Groupby extends AbstractNode {
	readonly fields: any[];

	constructor(fields: any[]) {
		super();
		this.fields = fields;
	}
}
