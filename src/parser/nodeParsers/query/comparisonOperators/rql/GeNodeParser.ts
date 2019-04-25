import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';
import Ge from '../../../../../nodes/scalarNodes/Ge';

export default class GeNodeParser extends AbstractComparisonRqlNodeParser {

	protected getOperatorName() {
		return 'ge';
	}

	protected createNode(field, value) {
		return new Ge(field, value);
	}
}
