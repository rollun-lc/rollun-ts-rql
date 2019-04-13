import { SubParserInterface } from '../interfaces';
import { TokenTypeNameMap } from '../Token';
import TokenStream from '../TokenStream';

export default class ArrayParser implements SubParserInterface {

	private itemParser;

	constructor(itemParser: SubParserInterface) {
		this.itemParser = itemParser;
	}

	parse(tokenStream: TokenStream) {
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		const values = [];
		do {
			values.push(this.itemParser.parse(tokenStream));
			if (!tokenStream.nextIf(TokenTypeNameMap.T_COMMA)) {
				break;
			}
		} while (true);
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		return values;
	}
}
