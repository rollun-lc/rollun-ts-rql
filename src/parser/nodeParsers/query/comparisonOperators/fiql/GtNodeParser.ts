import Gt from '../../../../../nodes/scalarNodes/Gt';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

class GtNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'gt';
	}

	protected createNode(field, value) {
		return new Gt(field, value);
	}
}
