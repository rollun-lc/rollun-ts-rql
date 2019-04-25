import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class NumberSubLexer implements SubLexerInterface {
	getTokenAt(code, cursor) {
		const matches = code.slice(cursor).match(new RegExp('^[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?'), 'i');
		if (matches) {
			return new Token(
				Math.round(Number(matches[0])) === Number(matches[0]) && !matches[0].match(/\./)
					? TokenTypeNameMap.T_INTEGER
					: TokenTypeNameMap.T_FLOAT,
				matches[0],
				cursor,
				cursor + matches[0].length
			);
		} else {
			return null;
		}
	}
}
