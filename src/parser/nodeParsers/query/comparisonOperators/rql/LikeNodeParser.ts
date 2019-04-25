import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';
import Like from '../../../../../nodes/scalarNodes/Like';

class LikeNodeParser extends AbstractComparisonRqlNodeParser {

	protected getOperatorName() {
		return 'like';
	}

	protected createNode(field, value) {
		return new Like(field, value);
	}
}
