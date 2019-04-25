import { NodeParserInterface, SubParserInterface } from '../interfaces';
import TokenStream from '../TokenStream';
import { TokenTypeNameMap } from '../Token';
import Select from '../../nodes/Select';

export default class SelectNodeParser implements NodeParserInterface {

	protected fieldNameParser;

	constructor(fieldNameParser: SubParserInterface) {
		this.fieldNameParser = fieldNameParser;
	}

	parse(tokenStream: TokenStream) {
		const fields = [];
		tokenStream.expect(TokenTypeNameMap.T_OPERATOR, 'select');
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		do {
			fields.push(this.fieldNameParser.parse(tokenStream));
			if (!tokenStream.nextIf(TokenTypeNameMap.T_COMMA)) {
				break;
			}
		} while (true);
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		return new Select(fields);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'select');
	}
}
