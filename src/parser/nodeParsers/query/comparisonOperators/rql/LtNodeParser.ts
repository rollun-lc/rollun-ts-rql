import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';
import Lt from '../../../../../nodes/scalarNodes/Lt';

export default class LtNodeParser extends AbstractComparisonRqlNodeParser {

	protected getOperatorName() {
		return 'lt';
	}

	protected createNode(field, value) {
		return new Lt(field, value);
	}
}
