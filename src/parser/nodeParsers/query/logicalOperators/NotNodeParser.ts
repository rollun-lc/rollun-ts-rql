import Not from '../../../../nodes/logicalNodes/Not';
import AbstractLogicalOperatorNodeParser from './AbstractLogicalOperatorNodeParser';

export default class NotNodeParser extends AbstractLogicalOperatorNodeParser {

	protected getOperatorName() {
		return 'not';
	}

	protected createNode(queries: any[]) {
		if (queries.length !== 1) {
			throw new SyntaxError(
				`"${this.getOperatorName()}" operator expects 1 parameter, ${queries.length} given`,
			);
		}
		return new Not(queries);
	}
}
