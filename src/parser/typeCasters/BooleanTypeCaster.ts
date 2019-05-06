import { TypeCasterInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export default class BooleanTypeCaster implements TypeCasterInterface {

	typeCast(token: Token) {
		if (token.test(TokenTypeNameMap.T_NULL)) {
			return false;
		}
		if (token.test(TokenTypeNameMap.T_TRUE)) {
			return true;
		}
		if (token.test(TokenTypeNameMap.T_FALSE)) {
			return false;
		}
		if (token.test(TokenTypeNameMap.T_EMPTY)) {
			return false;
		}
		if (token.test(TokenTypeNameMap.T_DATE)) {
			return token.value !== '0000-00-00T00:00:00Z';
		} else {
			return token.value !== '0' && Boolean(token.value);
		}
	}
}
