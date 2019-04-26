import Alike from '../../../../../nodes/scalarNodes/Alike';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

export default class FiqlAlikeNodeParser extends AbstractComparisonFiqlNodeParser {
	protected getOperatorName()
	{
		return 'alike';
	}

	protected createNode(field, value)
	{
		return new Alike(field, value);
	}
}
