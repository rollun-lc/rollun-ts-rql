import AbstractBinaryNodeParser from './AbstractBinaryNodeParser';
import Eqt from '../../../../../nodes/binaryNodes/Eqt';
import TokenStream from '../../../../TokenStream';
import { TokenTypeNameMap } from '../../../../Token';

export default class EqtNodeParser extends AbstractBinaryNodeParser {
	protected getOperatorName() {
		return 'eqt';
	}

	protected createNode(field: string) {
		return new Eqt(field);
	}
	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'eqt');
	}
}
