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
import InNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/InNodeParser';
import OutNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/OutNodeParser';
import NeNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/NeNodeParser';
import LtNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/LtNodeParser';
import GtNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/GtNodeParser';
import EqNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/EqNodeParser';
import LeNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/LeNodeParser';
import GeNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/GeNodeParser';
import LikeNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/LikeNodeParser';
import FiqlInNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlInNodeParser';
import FiqlOutNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlOutNodeParser';
import FiqlEqNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlEqNodeParser';
import FiqlNeNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlNeNodeParser';
import FiqlLtNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlLtNodeParser';
import FiqlGtNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlGtNodeParser';
import FiqlLeNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlLeNodeParser';
import FiqlLikeNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlLikeNodeParser';
import FiqlGeNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlGeNodeParser';
import QueryBuilder from './QueryBuilder';

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
			.addNodeParser(new FiqlInNodeParser(fieldParser, arrayParser))
			.addNodeParser(new FiqlOutNodeParser(fieldParser, arrayParser))
			.addNodeParser(new FiqlEqNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlNeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlLtNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlGtNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlLeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlGeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlLikeNodeParser(fieldParser, globParser));
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
