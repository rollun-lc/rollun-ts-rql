import { TypeCasterInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class StringTypeCaster implements TypeCasterInterface {
	typeCast(token: Token) {
		if (token.test(TokenTypeNameMap.T_NULL)) {
			return 'null';
		}
		if (token.test(TokenTypeNameMap.T_TRUE)) {
			return 'true';
		}
		if (token.test(TokenTypeNameMap.T_FALSE)) {
			return 'false';
		}
		if (token.test(TokenTypeNameMap.T_EMPTY)) {
			return '';
		}
		if (token.test(TokenTypeNameMap.T_GLOB)) {
			return encodeURIComponent(token.value);
		} else {
			// enforce string type.
			return `${token.value}`;
		}
	}
}
