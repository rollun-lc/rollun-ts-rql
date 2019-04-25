import Le from '../../../../../nodes/scalarNodes/Le';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

class LeNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'le';
	}

	protected createNode(field, value) {
		return new Le(field, value);
	}
}
