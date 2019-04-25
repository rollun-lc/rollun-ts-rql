import Ne from '../../../../../nodes/scalarNodes/Ne';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

class NeNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'ne';
	}

	protected createNode(field, value) {
		return new Ne(field, value);
	}
}
