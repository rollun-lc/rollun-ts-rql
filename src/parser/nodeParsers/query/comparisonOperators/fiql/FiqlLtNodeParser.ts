import Lt from '../../../../../nodes/scalarNodes/Lt';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

export default class FiqlLtNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'lt';
	}

	protected createNode(field, value) {
		return new Lt(field, value);
	}
}
