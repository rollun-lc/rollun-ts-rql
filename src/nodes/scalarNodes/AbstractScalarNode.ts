import AbstractQueryNode from '../AbstractQueryNode';

export default abstract class AbstractScalarNode extends AbstractQueryNode {
	protected _field;
	protected _value;

	public constructor(field: string, value: any) {
		super();
		this._field = field;
		this._value = value;
	}

	get field() {
		return this._field;
	}

	set field(value) {
		this._field = value;
	}

	get value() {
		return this._value === null ? 'null()' : this._value;
	}

	set value(value) {
		this._value = value;
	}
}
