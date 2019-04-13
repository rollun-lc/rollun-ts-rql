import Token, { TokenTypeNameMap } from '../Token';
import { SubLexerInterface } from '../interfaces';

export default class TypeSubLexer implements SubLexerInterface {

	getTokenAt(code, cursor) {
		const matches = code.match(new RegExp('/[a-z]\w*(?=:)/', 'Ai'));
		if (matches) {
			return new Token(
				TokenTypeNameMap.T_TYPE,
				matches[0],
				cursor,
				cursor + matches[0].length);
		} else {
			return null;
		}
	}
}
