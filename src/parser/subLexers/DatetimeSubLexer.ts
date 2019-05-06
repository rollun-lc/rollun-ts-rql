import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class DatetimeSubLexer implements SubLexerInterface {

	getTokenAt(code, cursor) {
		const regExp = new RegExp(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/);
		const matches = decodeURIComponent(code.slice(cursor)).match(regExp);
		if (!matches) {
			return null;
		}
		if (
			Number(matches[1]) < 32767 // years
			&& Number(matches[2]) < 12 // months
			&& Number(matches[3]) < 32 // days
			&& Number(matches[4]) < 24 // hours
			&& Number(matches[5]) < 60 // minutes
			&& Number(matches[6]) < 60 // seconds
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
