import AbstractBinaryNodeParser from './AbstractBinaryNodeParser';
import Ie from '../../../../../nodes/binaryNodes/Ie';
import TokenStream from '../../../../TokenStream';
import { TokenTypeNameMap } from '../../../../Token';

export default class IeNodeParser extends AbstractBinaryNodeParser {
	protected getOperatorName() {
		return 'ie';
	}

	public createNode(field: string) {
		return new Ie(field);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'ie');
	}
}
