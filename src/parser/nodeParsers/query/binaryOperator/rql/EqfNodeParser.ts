import AbstractBinaryNodeParser from './AbstractBinaryNodeParser';
import Eqf from '../../../../../nodes/binaryNodes/Eqf';
import TokenStream from '../../../../TokenStream';
import { TokenTypeNameMap } from '../../../../Token';

export default class EqfNodeParser extends AbstractBinaryNodeParser {

	protected getOperatorName() {
		return 'eqf';
	}

	protected createNode(field: string) {
		return new Eqf(field);
	}
	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'eqf');
	}
}
