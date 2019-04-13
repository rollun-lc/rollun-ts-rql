import { SubParserInterface, TypeCasterInterface } from '../interfaces';
import TokenStream from '../TokenStream';
import Token, { TokenTypeNameMap } from '../Token';
import { type } from 'os';

export default class ScalarParser implements SubParserInterface {
	/**
	 * @var TypeCasterInterface[]
	 */
	protected typeCasters: TypeCasterInterface[] = [];

	/**
	 * @inheritdoc
	 */
	parse(tokenStream: TokenStream) {
		const typeToken = tokenStream.nextIf(TokenTypeNameMap.T_TYPE);
		let value;
		if (typeToken == null) {
			value = this.getScalarValue(tokenStream.next());
		} else {
			tokenStream.expect(TokenTypeNameMap.T_COLON);
			value = this.getTypeCaster(typeToken.value).typeCast(tokenStream.next());
		}
		return value;
	}

	registerTypeCaster(type, typeCaster: TypeCasterInterface) {
		this.typeCasters[type] = typeCaster;
		return this;
	}

	getTypeCaster(type) {
		if (this.typeCasters[type]) {
			return this.typeCasters[type];

		} else {
			throw new SyntaxError(`Unknown type "${type}"`);
		}

	}

	getScalarValue(token: Token) {
		if (token.test(TokenTypeNameMap.T_FALSE)) {
			return false;
		}
		if (token.test(TokenTypeNameMap.T_TRUE)) {
			return true;
		}
		if (token.test(TokenTypeNameMap.T_NULL)) {
			return null;
		}
		if (token.test(TokenTypeNameMap.T_EMPTY)) {
			return '';
		}
		if (token.test(TokenTypeNameMap.T_DATE)) {
			return new Date(token.value);
		}
		if (token.test(TokenTypeNameMap.T_STRING)) {
			return token.value;
		}
		if (token.test(TokenTypeNameMap.T_INTEGER)) {
			return token.value;
		}
		if (token.test(TokenTypeNameMap.T_FLOAT)) {
			return Number(token.value);
		}
		throw new SyntaxError(
			`Invalid scalar token "${token.value}" (${token.name})`
		);
	}
}
