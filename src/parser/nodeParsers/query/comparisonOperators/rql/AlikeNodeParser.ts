import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';
import Alike from '../../../../../nodes/scalarNodes/Alike';

export default class AlikeNodeParser extends AbstractComparisonRqlNodeParser {
	protected getOperatorName()
	{
		return 'alike';
	}

	protected createNode(field, value)
	{
		return new Alike(field, value);
	}
}
