import { NodeParserInterface } from './interfaces';
import TokenStream from './TokenStream';

export default class NodeParserChain implements NodeParserInterface {
	protected nodeParsers;

	addNodeParser(nodeParser: NodeParserInterface) {
		this.nodeParsers.push(nodeParser);
		return this;
	}

	parse(tokenStream: TokenStream) {
		for (const nodeParser of this.nodeParsers) {
			if (nodeParser.supports(tokenStream)) {
				return nodeParser.parse(tokenStream);
			}
		}
		throw new SyntaxError(
			`Unexpected token "${tokenStream.getCurrent().value}" (${tokenStream.getCurrent().name}) at position ${tokenStream.getCurrent().start}`
		);
	}

	supports(tokenStream: TokenStream) {
		for (const nodeParser of this.nodeParsers) {
			if (nodeParser.supports(tokenStream)) {
				return true;
			}
		}
		return false;
	}
}
