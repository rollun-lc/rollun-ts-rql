import TokenStream from '../../TokenStream';
import Token, { TokenTypeNameMap } from '../../Token';
import { NodeParserInterface } from '../../interfaces';
import AggregateFunctionNode from '../../../nodes/aggregateNodes/AggregateFunctionNode';
import AggregateSelect from '../../../nodes/aggregateNodes/AggregateSelect';

export default class AggregateSelectNodeParser implements NodeParserInterface {
	private allowedFunctions: string[];

	constructor(allowedFunctions: string[]) {
		this.allowedFunctions = allowedFunctions;
	}

	parse(tokenStream: TokenStream) {
		const fields = [];
		tokenStream.expect(TokenTypeNameMap.T_OPERATOR, 'select');
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		do {
			const aggregate = tokenStream.nextIf(TokenTypeNameMap.T_OPERATOR, this.allowedFunctions);
			if (aggregate !== null) {
				tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS, '(');
				fields.push(new AggregateFunctionNode(
					aggregate.value,
					tokenStream.expect(TokenTypeNameMap.T_STRING).value)
				);
				tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS, ')');
			} else {
				fields.push(tokenStream.expect(TokenTypeNameMap.T_STRING).value);
			}
			if (!tokenStream.nextIf(TokenTypeNameMap.T_COMMA)) {
				break;
			}
		} while (true);
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		return new AggregateSelect(fields);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'select');
	}
}
