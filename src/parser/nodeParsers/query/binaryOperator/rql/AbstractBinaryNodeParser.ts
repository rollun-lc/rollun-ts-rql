import { TokenTypeNameMap } from '../../../../Token';
import TokenStream from '../../../../TokenStream';
import { NodeParserInterface } from '../../../../interfaces';

export default abstract class AbstractBinaryNodeParser implements NodeParserInterface  {
	protected abstract createNode(field: string);
	protected abstract getOperatorName();
	public abstract supports(tokenStream: TokenStream)
	public parse(tokenStream: TokenStream)
{
	tokenStream.expect(TokenTypeNameMap.T_OPERATOR, this.getOperatorName());
	tokenStream.expect(TokenTypeNameMap.T_OPEN_PARENTHESIS);
	const field = tokenStream.expect(TokenTypeNameMap.T_STRING).value;
	tokenStream.expect(TokenTypeNameMap.T_CLOSE_PARENTHESIS);
	return this.createNode(field);
}
}
