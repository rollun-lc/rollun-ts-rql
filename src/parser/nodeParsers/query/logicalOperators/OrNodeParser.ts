import AbstractLogicalOperatorNodeParser from './AbstractLogicalOperatorNodeParser';
import Or from '../../../../nodes/logicalNodes/Or';

export default class OrNodeParser extends AbstractLogicalOperatorNodeParser {

	protected getOperatorName() {
		return 'or';
	}

	protected createNode(queries: any[]) {
		if (queries.length < 2) {
			throw new SyntaxError(
				`"${this.getOperatorName()}" operator expects at least 2 parameters, ${queries.length} given`,
			);
		}
		return new Or(queries);
	}
}
