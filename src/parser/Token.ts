export enum TokenTypeNameMap {
	T_END = 'T_END',
	T_INTEGER = 'T_INTEGER',
	T_FLOAT = 'T_FLOAT',
	T_STRING = 'T_STRING',
	T_DATE = 'T_DATE',
	T_GLOB = 'T_GLOB',
	T_CLOSE_PARENTHESIS = 'T_CLOSE_PARENTHESIS',
	T_OPEN_PARENTHESIS = 'T_OPEN_PARENTHESIS',
	T_COMMA = 'T_COMMA',
	T_AMPERSAND = 'T_AMPERSAND',
	T_VERTICAL_BAR = 'T_VERTICAL_BAR',
	T_PLUS = 'T_PLUS',
	T_MINUS = 'T_MINUS',
	T_COLON = 'T_COLON',
	T_TYPE = 'T_TYPE',
	T_OPERATOR = 'T_OPERATOR',
	T_NULL = 'T_NULL',
	T_EMPTY = 'T_EMPTY',
	T_TRUE = 'T_TRUE',
	T_FALSE = 'T_FALSE',
}

export default class Token {
	readonly type: TokenTypeNameMap;
	readonly value: string;
	readonly start: number;
	readonly end: number;

	constructor(type: TokenTypeNameMap, value: string, start: number, end: number) {
		this.type = type;
		this.value = value;
		this.start = start;
		this.end = end;
	}

	test(type: TokenTypeNameMap | TokenTypeNameMap[], value?: string | string[]): boolean {
		const normalizedType = Array.isArray(type)
			? type
			: [type];
		const normalizedValue = Array.isArray(value)
			? value
			: [value];
		if (normalizedType.indexOf(this.type) === -1) {
			return false;
		}
		if (value) {
			return normalizedValue.indexOf(this.value) !== -1;
		}
		return true;
	}

	get name(): string {
		return TokenTypeNameMap[this.type];
	}

	toString() {
		return `${this.name}(${this.value})`;
	}
}
