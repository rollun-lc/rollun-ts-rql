import { SubParserInterface } from '../interfaces';
import TokenStream from '../TokenStream';
import { TokenTypeNameMap } from '../Token';

export default class FieldParser implements SubParserInterface {

	parse(tokenStream: TokenStream) {
		return tokenStream.expect(TokenTypeNameMap.T_STRING).value;
	}
}
