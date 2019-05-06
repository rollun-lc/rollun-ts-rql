import LikeGlob from '../../../../../nodes/scalarNodes/LikeGlob';
import AbstractComparisonFiqlNodeParser from './AbstractComparisonFiqlNodeParser';

export default class FiqlLikeGlobNodeParser extends AbstractComparisonFiqlNodeParser {
	protected getOperatorName()
	{
		return 'like';
	}

	protected createNode(field, value)
	{
		return new LikeGlob(field, value);
	}
}
