import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class NumberSubLexer implements SubLexerInterface {
	getTokenAt(code, cursor) {
		const matches = code.slice(cursor).match('/[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/A',);
		if (matches) {
			return new Token(
				Math.round(matches[0]) === matches[0]
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
