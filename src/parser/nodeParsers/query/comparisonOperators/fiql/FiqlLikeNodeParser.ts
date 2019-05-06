import Like from '../../../../../nodes/scalarNodes/Like';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

export default class FiqlLikeNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'like';
	}

	protected createNode(field, value) {
		return new Like(field, value);
	}
}
