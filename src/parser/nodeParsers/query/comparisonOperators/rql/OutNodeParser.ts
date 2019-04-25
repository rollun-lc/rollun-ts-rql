import Out from '../../../../../nodes/arrayNodes/Out';
import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';

class OutNodeParser extends AbstractComparisonRqlNodeParser {

	protected getOperatorName() {
		return 'out';
	}

	protected createNode(field, value) {
		return new Out(field, value);
	}
}
