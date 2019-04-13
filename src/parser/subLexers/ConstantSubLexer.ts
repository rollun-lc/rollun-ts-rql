import Token, { TokenTypeNameMap } from '../Token';
import { SubLexerInterface } from '../interfaces';

export default class ConstantSubLexer implements SubLexerInterface {

	getTokenAt(code, cursor) {
		const test7 = code.slice(cursor, 7);
		if (test7 === 'empty()') {
			return new Token(TokenTypeNameMap.T_EMPTY, test7, cursor, cursor + 7);
		} else {
			if (test7 === 'false()') {
				return new Token(TokenTypeNameMap.T_FALSE, test7, cursor, cursor + 7);
			}
		}
		const test6 = code.slice(cursor, 6);
		if (test6 === 'null()') {
			return new Token(TokenTypeNameMap.T_NULL, test6, cursor, cursor + 6);
		} else {
			if (test6 === 'true()') {
				return new Token(TokenTypeNameMap.T_TRUE, test6, cursor, cursor + 6);
			}
		}
		return null;
	}
}
