import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';
import Gt from '../../../../../nodes/scalarNodes/Gt';

export default class GtNodeParser extends AbstractComparisonRqlNodeParser {

	protected getOperatorName() {
		return 'gt';
	}

	protected createNode(field, value) {
		return new Gt(field, value);
	}
}
