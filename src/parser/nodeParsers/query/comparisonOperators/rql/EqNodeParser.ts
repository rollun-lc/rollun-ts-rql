import Eq from '../../../../../nodes/scalarNodes/Eq';
import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';

export default class EqNodeParser extends AbstractComparisonRqlNodeParser {

	protected getOperatorName() {
		return 'eq';
	}

	protected createNode(field, value) {
		return new Eq(field, value);
	}
}
