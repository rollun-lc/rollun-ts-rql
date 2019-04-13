import { SubParserInterface } from '../interfaces';
import { TokenTypeNameMap } from '../Token';
import TokenStream from '../TokenStream';

export default class IntegerParser implements SubParserInterface {
	parse(tokenStream: TokenStream) {
		return parseInt(tokenStream.expect(TokenTypeNameMap.T_INTEGER).value, 10);
	}
}
