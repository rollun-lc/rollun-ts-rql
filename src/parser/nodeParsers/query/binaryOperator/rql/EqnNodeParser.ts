import Eqn from '../../../../../nodes/binaryNodes/Eqn';
import AbstractBinaryNodeParser from './AbstractBinaryNodeParser';
import TokenStream from '../../../../TokenStream';
import { TokenTypeNameMap } from '../../../../Token';

export default class EqnNodeParser extends AbstractBinaryNodeParser {
	protected getOperatorName() {
		return 'eqn';
	}

	protected createNode(field: string) {
		return new Eqn(field);
	}
	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'eqn');
	}
}
