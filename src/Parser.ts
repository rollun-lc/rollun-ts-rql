import { NodeParserInterface } from './parser/interfaces';
import SortNodeParser from './parser/nodeParsers/SortNodeParser';
import AndNodeParser from './parser/nodeParsers/query/logicalOperators/AndNodeParser';
import GroupNodeParser from './parser/nodeParsers/query/GroupNodeParser';
import QueryNodeParser from './parser/nodeParsers/QueryNodeParser';
import SelectNodeParser from './parser/nodeParsers/SelectNodeParser';
import NotNodeParser from './parser/nodeParsers/query/logicalOperators/NotNodeParser';
import OrNodeParser from './parser/nodeParsers/query/logicalOperators/OrNodeParser';
import LimitNodeParser from './parser/nodeParsers/LimitNodeParser';
import { TokenTypeNameMap } from './parser/Token';
import IntegerParser from './parser/valueParsers/IntegerParser';
import FieldParser from './parser/valueParsers/FieldParser';
import StringTypeCaster from './parser/typeCasters/StringTypeCaster';
import { IntegerTypeCaster } from './parser/typeCasters/IntegerTypeCaster';
import FloatTypeCaster from './parser/typeCasters/FloatTypeCaster';
import ArrayParser from './parser/valueParsers/ArrayParser';
import GlobParser from './parser/valueParsers/GlobParser ';
import NodeParserChain from './parser/NodeParserChain';
import BooleanTypeCaster from './parser/typeCasters/BooleanTypeCaster';
import ScalarParser from './parser/valueParsers/ScalarParser';
import TokenStream from './parser/TokenStream';

export default class Parser {

	protected nodeParser;

	constructor(nodeParser: NodeParserInterface = null) {
		this.nodeParser = nodeParser ? nodeParser : Parser.createDefaultNodeParser();
	}

	setNodeParser(nodeParser: NodeParserInterface) {
		this.nodeParser = nodeParser;
		return this;
	}

	getNodeParser() {
		return this.nodeParser;
	}

	static createDefaultNodeParser() {
		const scalarParser = (new ScalarParser())
			.registerTypeCaster('string', new StringTypeCaster())
			.registerTypeCaster('integer', new IntegerTypeCaster())
			.registerTypeCaster('float', new FloatTypeCaster())
			.registerTypeCaster('boolean', new BooleanTypeCaster());
		const arrayParser = new ArrayParser(scalarParser);
		const globParser = new GlobParser();
		const fieldParser = new FieldParser();
		const integerParser = new IntegerParser();
		const queryNodeParser = new QueryNodeParser();
		queryNodeParser
			.addNodeParser(new GroupNodeParser(queryNodeParser))
			.addNodeParser(new AndNodeParser(queryNodeParser))
			.addNodeParser(new OrNodeParser(queryNodeParser))
			.addNodeParser(new NotNodeParser(queryNodeParser))
			.addNodeParser(new InNodeParser(fieldParser, arrayParser))
			.addNodeParser(new OutNodeParser(fieldParser, arrayParser))
			.addNodeParser(new EqNodeParser(fieldParser, scalarParser))
			.addNodeParser(new NeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new LtNodeParser(fieldParser, scalarParser))
			.addNodeParser(new GtNodeParser(fieldParser, scalarParser))
			.addNodeParser(new LeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new GeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new LikeNodeParser(fieldParser, globParser))
			.addNodeParser(new InNodeParser(fieldParser, arrayParser))
			.addNodeParser(new OutNodeParser(fieldParser, arrayParser))
			.addNodeParser(new EqNodeParser(fieldParser, scalarParser))
			.addNodeParser(new NeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new LtNodeParser(fieldParser, scalarParser))
			.addNodeParser(new GtNodeParser(fieldParser, scalarParser))
			.addNodeParser(new LeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new GeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new LikeNodeParser(fieldParser, globParser));
		return (new NodeParserChain())
			.addNodeParser(queryNodeParser)
			.addNodeParser(new SelectNodeParser(fieldParser))
			.addNodeParser(new SortNodeParser(fieldParser))
			.addNodeParser(new LimitNodeParser(integerParser));
	}

	parse(tokenStream: TokenStream) {
		const queryBuilder = this.createQueryBuilder();
		while (!tokenStream.isEnd()) {
			queryBuilder.addNode(this.nodeParser.parse(tokenStream));
			tokenStream.nextIf(TokenTypeNameMap.T_AMPERSAND);
		}
		return queryBuilder.getQuery();
	}

	protected createQueryBuilder() {
		return new QueryBuilder();
	}
}
