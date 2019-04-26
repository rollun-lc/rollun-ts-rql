import Ie from '../../../../../nodes/binaryNodes/Ie';
import AbstractFiqlBinaryNodeParser from './AbstractFiqlBinaryNodeParser';
import TokenStream from '../../../../TokenStream';
import { TokenTypeNameMap } from '../../../../Token';

export default class FiqlIeNodeParser extends AbstractFiqlBinaryNodeParser {
	protected getOperatorNames() {
		return 'ie';
	}

	public createNode(field: string) {
		return new Ie(field);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'ie');
	}
}
