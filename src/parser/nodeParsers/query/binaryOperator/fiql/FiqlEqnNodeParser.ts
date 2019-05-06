import Eqn from '../../../../../nodes/binaryNodes/Eqn';
import AbstractFiqlBinaryNodeParser from './AbstractFiqlBinaryNodeParser';
import TokenStream from '../../../../TokenStream';
import { TokenTypeNameMap } from '../../../../Token';

export default class FiqlEqnNodeParser extends AbstractFiqlBinaryNodeParser {
	protected getOperatorNames() {
		return ['eqn'];
	}

	protected createNode(field: string) {
		return new Eqn(field);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'eqf');
	}
}
