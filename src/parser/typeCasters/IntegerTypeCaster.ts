import { TypeCasterInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export class IntegerTypeCaster implements TypeCasterInterface {
	typeCast(token: Token) {
		if (token.test(TokenTypeNameMap.T_NULL)) {
			return 0;
		}
		if (token.test(TokenTypeNameMap.T_TRUE)) {
			return 1;
		}
		if (token.test(TokenTypeNameMap.T_FALSE)) {
			return 0;
		}
		if (token.test(TokenTypeNameMap.T_EMPTY)) {
			return 0;
		}
		if (token.test(TokenTypeNameMap.T_DATE)) {
			const date = new Date(token.value);
			const dateMonth = String(date.getMonth()).length === 2 ? 1 + date.getMonth() : ('0' + (1 + date.getMonth()));
			const dateDay = String(date.getDate()).length === 2 ? date.getDate() : ('0' + date.getDate());
			const dateHours = String(date.getUTCHours()).length === 2 ? date.getUTCHours() : ('0' + date.getUTCHours());
			const dateMinutes = String(date.getMinutes()).length === 2 ? date.getMinutes() : ('0' + date.getMinutes());
			const dateSeconds = String(date.getSeconds()).length === 2 ? date.getSeconds() : ('0' + date.getSeconds());
			return parseInt(`${date.getFullYear()}${dateMonth}${dateDay}${dateHours}${dateMinutes}${dateSeconds}`, 10);
		} else {
			const parsedValue = parseInt(token.value, 10);
			return isNaN(parsedValue) ? 0 : parsedValue;
		}
	}
}
