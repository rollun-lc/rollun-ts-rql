import And from '../../../../nodes/logicalNodes/And';
import  AbstractLogicalOperatorNodeParser  from './AbstractLogicalOperatorNodeParser';

export default class AndNodeParser extends AbstractLogicalOperatorNodeParser {

	protected getOperatorName() {
		return 'and';
	}

	protected createNode(queries: any[]) {
		if (queries.length < 2) {
			throw new SyntaxError(
				`"${this.getOperatorName()}" operator expects at least 2 parameters, ${queries.length} given`,
			);
		}
		return new And(queries);
	}
}
