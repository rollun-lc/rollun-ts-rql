import { NodeParserInterface, SubParserInterface } from '../interfaces';
import TokenStream from '../TokenStream';
import { TokenTypeNameMap } from '../Token';
import Limit from '../../nodes/Limit';

export default class LimitNodeParser implements NodeParserInterface {

	protected valueParser;

	constructor(valueParser: SubParserInterface) {
		this.valueParser = valueParser;
	}

	parse(tokenStream: TokenStream) {
		let limit = null;
		let offset = null;
		tokenStream.expect(TokenTypeNameMap.T_OPERATOR, 'limit');
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		limit = this.valueParser.parse(tokenStream);
		if (tokenStream.nextIf(TokenTypeNameMap.T_COMMA)) {
			offset = this.valueParser.parse(tokenStream);
		}
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		return new Limit(limit, offset);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'limit');
	}
}
