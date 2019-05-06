import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';
import LikeGlob from '../../../../../nodes/scalarNodes/LikeGlob';

export default class LikeGlobNodeParser extends AbstractComparisonRqlNodeParser {
	protected getOperatorName()
	{
		return 'like';
	}

	protected createNode(field, value)
	{
		return new LikeGlob(field, value);
	}
}
