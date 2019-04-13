import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class StringSubLexer implements SubLexerInterface {
	getTokenAt(code, cursor) {
		const matches = code.match(new RegExp('/([a-z0-9]|\%[0-9a-f]{2})+/', 'Ai'));
		if (!matches || isNaN(matches[0])) {
			return null;
		}
		return new Token(
			TokenTypeNameMap.T_STRING,
			decodeURIComponent(matches[0]),
			cursor,
			cursor + matches[0].length
		);
	}
}
