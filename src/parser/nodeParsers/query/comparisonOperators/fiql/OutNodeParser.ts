import Out from '../../../../../nodes/arrayNodes/Out';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

class OutNodeParser extends AbstractComparisonFiqlNodeParser {

	protected getOperatorName() {
		return 'out';
	}

	protected createNode(field, value) {
		return new Out(field, value);
	}
}
