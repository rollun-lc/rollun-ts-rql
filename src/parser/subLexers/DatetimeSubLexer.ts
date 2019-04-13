import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class DatetimeSubLexer implements SubLexerInterface {

	getTokenAt(code, cursor) {
		const regExp = new RegExp('/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})T(?<h>\d{2}):(?<i>\d{2}):(?<s>\d{2})Z/', 'A');
		const matches = code.match(regExp);
		if (!matches) {
			return null;
		}
		if (
			matches['m'] < 12
			&& matches['d'] < 31
			&& matches['y'] < 32767
			&& matches['h'] < 24
			&& matches['i'] < 60
			&& matches['s'] < 60
		) {
			return new Token(
				TokenTypeNameMap.T_DATE,
				matches[0],
				cursor,
				cursor + matches[0].length
			);
		}
		throw new SyntaxError(`Invalid datetime value "${matches[0]}`);

	}
}
