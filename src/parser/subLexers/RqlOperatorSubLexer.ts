import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class RqlOperatorSubLexer implements SubLexerInterface {
	getTokenAt(code, cursor) {
		const matches = code.slice(cursor).match(new RegExp('^[a-z]\\w*(?=\\()', 'i'));
		if (matches) {
			return new Token(
				TokenTypeNameMap.T_OPERATOR,
				matches[0],
				cursor,
				cursor + matches[0].length);
		}
		return null;
	}
}
