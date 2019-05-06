import { TokenTypeNameMap } from '../../../Token';
import TokenStream from '../../../TokenStream';
import { NodeParserInterface, SubParserInterface } from '../../../interfaces';

export default abstract class AbstractLogicalOperatorNodeParser implements NodeParserInterface {

	protected conditionParser;

	constructor(conditionParser: SubParserInterface) {
		this.conditionParser = conditionParser;
	}

	protected abstract createNode(queries: any[]);

	protected abstract getOperatorName();

	parse(tokenStream: TokenStream) {
		tokenStream.expect(TokenTypeNameMap.T_OPERATOR, this.getOperatorName());
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		let queries = [];
		do {
			queries.push(this.conditionParser.parse(tokenStream));
		} while (tokenStream.nextIf(TokenTypeNameMap.T_COMMA) !== null);
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		return this.createNode(queries);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, this.getOperatorName());
	}
}
