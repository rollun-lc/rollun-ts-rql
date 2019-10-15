import { NodeParserInterface } from '../interfaces';
import TokenStream             from '../TokenStream';
import { TokenTypeNameMap }    from '../Token';
import GroupBy                 from '../../nodes/GroupBy';

export default class GroupbyNodeParser implements NodeParserInterface {
	parse(tokenStream: TokenStream) {
		const fields = [];
		tokenStream.expect(TokenTypeNameMap.T_OPERATOR, 'groupby');
		tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
		do {
			fields.push(tokenStream.expect(TokenTypeNameMap.T_STRING).value);
			if (!tokenStream.nextIf(TokenTypeNameMap.T_COMMA)) {
				break;
			}
		} while (true);
		tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
		return new GroupBy(fields);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'groupby');
	}
}
