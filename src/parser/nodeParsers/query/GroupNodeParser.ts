import { NodeParserInterface, SubParserInterface } from '../../interfaces';
import { TokenTypeNameMap } from '../../Token';
import TokenStream from '../../TokenStream';
import Or from '../../../nodes/logicalNodes/Or';
import And from '../../../nodes/logicalNodes/And';

export default class GroupNodeParser implements NodeParserInterface {

	protected conditionParser;

	constructor(conditionParser: SubParserInterface) {
		this.conditionParser = conditionParser;
	}

	parse(tokenStream: TokenStream) {
		let operator = null;
		const queries = [];
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		do {
			queries.push(this.conditionParser.parse(tokenStream));
			if (tokenStream.nextIf(TokenTypeNameMap.T_AMPERSAND)) {
				if (operator === null) {
					operator = TokenTypeNameMap.T_AMPERSAND;
				}
				if (operator !== TokenTypeNameMap.T_AMPERSAND) {
					throw new SyntaxError('Cannot mix "&" and "|" within a group');
				}
			} else {
				if (tokenStream.nextIf(TokenTypeNameMap.T_VERTICAL_BAR)) {
					if (operator === null) {
						operator = TokenTypeNameMap.T_VERTICAL_BAR;
					}
					if (operator !== TokenTypeNameMap.T_VERTICAL_BAR) {
						throw new SyntaxError('Cannot mix "&" and "|" within a group');
					}
				} else {
					break;
				}
			}
		} while (true);
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		if (operator === TokenTypeNameMap.T_VERTICAL_BAR) {
			return new Or(queries);
		}
		if (operator === TokenTypeNameMap.T_AMPERSAND) {
			return new And(queries);
		} else {
			return queries[0];
		}
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPEN_PARENTHESIS);
	}
}
