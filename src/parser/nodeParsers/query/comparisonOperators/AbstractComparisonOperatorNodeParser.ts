import { NodeParserInterface, SubParserInterface } from '../../../interfaces';
import AbstractNode from '../../../../nodes/AbstractNode';
import TokenStream from '../../../TokenStream';

export default abstract class AbstractComparisonOperatorNodeParser implements NodeParserInterface {

	protected fieldNameParser;

	protected valueParser;

	constructor(fieldNameParser: SubParserInterface, valueParser: SubParserInterface) {
		this.fieldNameParser = fieldNameParser;
		this.valueParser = valueParser;
	}

	protected abstract createNode(field, value);

	abstract parse(tokenStream: TokenStream): AbstractNode;

	abstract supports(tokenStream: TokenStream): boolean;

	protected abstract getOperatorName();
}
