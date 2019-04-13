import Token, { TokenTypeNameMap } from '../Token';
import { SubLexerInterface } from '../interfaces';

export default class GlobSubLexer implements SubLexerInterface {

	getTokenAt(code, cursor) {
		const matches = code.match(new RegExp('/([a-z0-9\*\?]|\%[0-9a-f]{2})+/', 'Ai'));
		if (!matches) {
			return null;
		}
		if (matches[0].indexOf('?') === -1 && matches[0].indexOf('*') === -1) {
			return null;
		}
		return new Token(
			TokenTypeNameMap.T_GLOB,
			this.decodeGlob(matches[0]),
			cursor,
			cursor + matches[0].length);
	}

	decodeGlob(glob) {
		return glob.replace(new RegExp('/[^\*\?]+/', 'i'),
			(encoded) => {
				return Glob.encode(encodeURIComponent(encoded[0]));
			}
		);
	}
}
