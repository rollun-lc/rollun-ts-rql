import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';
import Ge from '../../../../../nodes/scalarNodes/Ge';

export default class FiqlGeNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'ge';
	}

	protected createNode(field, value) {
		return new Ge(field, value);
	}
}
