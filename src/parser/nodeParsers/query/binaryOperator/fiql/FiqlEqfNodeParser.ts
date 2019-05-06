import Eqf from '../../../../../nodes/binaryNodes/Eqf';
import AbstractFiqlBinaryNodeParser from './AbstractFiqlBinaryNodeParser';
import TokenStream from '../../../../TokenStream';
import { TokenTypeNameMap } from '../../../../Token';

export default class FiqlEqfNodeParser extends AbstractFiqlBinaryNodeParser {

	protected getOperatorNames() {
		return ['eqf'];
	}

	protected createNode(field: string) {
		return new Eqf(field);
	}

	supports(tokenStream: TokenStream) {
		return tokenStream.test(TokenTypeNameMap.T_OPERATOR, 'eqf');
	}
}
