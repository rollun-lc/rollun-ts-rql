import Like from '../../../../../nodes/scalarNodes/Like';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

class LikeNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'like';
	}

	protected createNode(field, value) {
		return new Like(field, value);
	}
}
