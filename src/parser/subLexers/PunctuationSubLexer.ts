import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class PunctuationSubLexer implements SubLexerInterface {
	getTokenAt(code, cursor) {
		const test = code.slice(cursor, 1);
		if (test === '&') {
			return new Token(TokenTypeNameMap.T_AMPERSAND, test, cursor, cursor + 1);
		}
		if (test === '|') {
			return new Token(TokenTypeNameMap.T_VERTICAL_BAR, test, cursor, cursor + 1);
		}
		if (test === ',') {
			return new Token(TokenTypeNameMap.T_COMMA, test, cursor, cursor + 1);
		}
		if (test === '(') {
			return new Token(TokenTypeNameMap.T_OPEN_PARENTHESIS, test, cursor, cursor + 1);
		}
		if (test === ')') {
			return new Token(TokenTypeNameMap.T_CLOSE_PARENTHESIS, test, cursor, cursor + 1);
		}
		if (test === ':') {
			return new Token(TokenTypeNameMap.T_COLON, test, cursor, cursor + 1);
		} else {
			return null;
		}
	}
}
