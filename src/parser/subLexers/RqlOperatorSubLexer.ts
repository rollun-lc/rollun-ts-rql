import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class RqlOperatorSubLexer implements SubLexerInterface {
	getTokenAt(code, cursor) {
		const matches = code.match(new RegExp('/[a-z]\w*(?=\()/', 'Ai'));
		if (matches) {
			new Token(
				TokenTypeNameMap.T_OPERATOR,
				matches[0],
				cursor,
				cursor + matches[0].length);
		}
		return null;
	}
}
