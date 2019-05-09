import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';
import Contains from '../../../../../nodes/scalarNodes/Contains';

export default class ContainsNodeParser extends AbstractComparisonRqlNodeParser {

	protected getOperatorName() {
		return 'contains';
	}

	protected createNode(field, value) {
		return new Contains(field, value);
	}
}
