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
			return parseInt(`${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`, 10);
		} else {
			return parseInt(token.value, 10);
		}
	}
}
