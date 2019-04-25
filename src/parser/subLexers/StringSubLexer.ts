import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';
import * as locutus from 'locutus';

export default class StringSubLexer implements SubLexerInterface {
	getTokenAt(code, cursor) {
		const matches = code.slice(cursor).match(new RegExp(/^([a-z0-9]|%[0-9a-f]{2})+/, 'i'));
		if (!matches || locutus.php.ctype.ctype_digit(matches[0])) {
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
