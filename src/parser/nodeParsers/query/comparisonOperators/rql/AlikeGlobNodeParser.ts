import AlikeGlob from '../../../../../nodes/scalarNodes/AlikeGlob';
import AbstractComparisonRqlNodeParser from './AbstractComparisonRqlNodeParser';

export default class AlikeGlobNodeParser extends AbstractComparisonRqlNodeParser{
	protected getOperatorName()
	{
		return 'alike';
	}

	protected createNode(field, value)
	{
		return new AlikeGlob(field, value);
	}
}
