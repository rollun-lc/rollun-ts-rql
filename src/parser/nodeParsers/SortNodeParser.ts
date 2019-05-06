import { TokenTypeNameMap } from '../Token';
import TokenStream from '../TokenStream';
import { NodeParserInterface, SubParserInterface } from '../interfaces';
import Sort, { SortOptions } from '../../nodes/Sort';

export default class SortNodeParser implements NodeParserInterface {

	protected fieldNameParser;

	constructor(fieldNameParser: SubParserInterface) {
		this.fieldNameParser = fieldNameParser;
	}

	parse(tokenStream: TokenStream) {
		const fields = <SortOptions>{};
		tokenStream.expect(TokenTypeNameMap.T_OPERATOR, 'sort');
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		do {
			const direction = tokenStream.expect([TokenTypeNameMap.T_PLUS, TokenTypeNameMap.T_MINUS]);
			fields[this.fieldNameParser.parse(tokenStream)] = direction.test(TokenTypeNameMap.T_PLUS) ?
				1 :
				-1;
			if (!tokenStream.nextIf(TokenTypeNameMap.T_COMMA)) {
				break;
			}
		} while (true);
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		return new Sort(fields);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'sort');
	}
}
