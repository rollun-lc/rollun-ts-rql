import AbstractQueryNode from '../AbstractQueryNode';

export default abstract class AbstractArrayNode extends AbstractQueryNode {

	protected _field: string;
	protected _values: any[];

	constructor(field: string, values: any[]) {
		super();
		this._field = field;
		this._values = values;
	}

	get field(): string {
		return this._field;
	}

	set field(value: string) {
		this._field = value;
	}

	get values(): any[] {
		return this._values;
	}

	set values(value: any[]) {
		this._values = value;
	}

	addValue(value: any) {
		this._values.push(value);
	}

	removeValue(index: number) {
		this._values.splice(index, 1);
	}
}
