import Eq from '../../../../../nodes/scalarNodes/Eq';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

class EqNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'eq';
	}

	protected createNode(field, value) {
		return new Eq(field, value);
	}
}
