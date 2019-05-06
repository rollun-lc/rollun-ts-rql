import AbstractComparisonOperatorNodeParser from '../AbstractComparisonOperatorNodeParser';
import TokenStream from '../../../../TokenStream';
import { TokenTypeNameMap } from '../../../../Token';

export default abstract class AbstractComparisonRqlNodeParser extends AbstractComparisonOperatorNodeParser {

	parse(tokenStream: TokenStream) {
		tokenStream.expect(TokenTypeNameMap.T_OPERATOR, this.getOperatorName());
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		const field = this.fieldNameParser.parse(tokenStream);
		tokenStream.expect(TokenTypeNameMap.T_COMMA);
		const value = this.valueParser.parse(tokenStream);
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		return this.createNode(field, value);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, this.getOperatorName());
	}
}
