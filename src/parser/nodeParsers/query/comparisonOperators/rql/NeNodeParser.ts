import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';
import Ne from '../../../../../nodes/scalarNodes/Ne';

class NeNodeParser extends AbstractComparisonRqlNodeParser {

	protected getOperatorName() {
		return 'ne';
	}

	protected createNode(field, value) {
		return new Ne(field, value);
	}
}
