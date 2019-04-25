import Token, { TokenTypeNameMap } from './Token';

export default class TokenStream {
	private tokens: Token[];
	private current: number;

	constructor(tokens: Token[]) {
		this.tokens = tokens;
		this.current = 0;
	}

	count(): number {
		return this.tokens.length;
	}

	get length(): number {
		return this.tokens.length;
	}

	next(): Token {
		this.current += 1;
		if (this.tokens[this.current]) {
			return this.tokens[this.current - 1];
		} else {
			throw new Error('Unexpected end of stream');
		}
	}

	nextIf(type: TokenTypeNameMap, value?: string): Token | null {
		if (this.test(type, value)) {
			return this.next();
		} else {
			return null;
		}
	}

	test(type: TokenTypeNameMap | TokenTypeNameMap[], value?: string): boolean {
		return this.tokens[this.current].test(type, value);
	}

	lookAhead(number: number = 1): Token {
		if (this.tokens[this.current + number]) {
			return this.tokens[this.current + number];
		} else {
			throw new Error('Unexpected end of stream');
		}
	}

	expect(type: TokenTypeNameMap | TokenTypeNameMap[], value?: string) {
		const normalizedType = Array.isArray(type)
			? type
			: [type];
		const normalizedValue = Array.isArray(value)
			? value
			: [value];
		const token = this.getCurrent();
		if (this.test(type, value)) {

		} else {
			const expectedMessage = value
				? `expected ${(normalizedType.map(() => `"${value}"`)).join('|')} (${normalizedType.join('|')})`
				: `expected ${normalizedType.join('|')}`;
			throw new Error(`Unexpected token ${token.value} (${token.name}) (${expectedMessage})`);

		}
		this.next();
		return token;
	}

	getCurrent(): Token {
		return this.tokens[this.current];
	}

	isEnd() {
		return this.tokens[this.current].type === TokenTypeNameMap.T_END;
	}
}
