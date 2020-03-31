import { NodeParserInterface } from './interfaces';
import SortNodeParser from './nodeParsers/SortNodeParser';
import AndNodeParser from './nodeParsers/query/logicalOperators/AndNodeParser';
import QueryNodeParser from './nodeParsers/QueryNodeParser';
import SelectNodeParser from './nodeParsers/SelectNodeParser';
import NotNodeParser from './nodeParsers/query/logicalOperators/NotNodeParser';
import OrNodeParser from './nodeParsers/query/logicalOperators/OrNodeParser';
import LimitNodeParser from './nodeParsers/LimitNodeParser';
import { TokenTypeNameMap } from './Token';
import IntegerParser from './valueParsers/IntegerParser';
import FieldParser from './valueParsers/FieldParser';
import StringTypeCaster from './typeCasters/StringTypeCaster';
import { IntegerTypeCaster } from './typeCasters/IntegerTypeCaster';
import FloatTypeCaster from './typeCasters/FloatTypeCaster';
import ArrayParser from './valueParsers/ArrayParser';
import NodeParserChain from './NodeParserChain';
import BooleanTypeCaster from './typeCasters/BooleanTypeCaster';
import ScalarParser from './valueParsers/ScalarParser';
import TokenStream from './TokenStream';
import InNodeParser from './nodeParsers/query/comparisonOperators/rql/InNodeParser';
import OutNodeParser from './nodeParsers/query/comparisonOperators/rql/OutNodeParser';
import NeNodeParser from './nodeParsers/query/comparisonOperators/rql/NeNodeParser';
import LtNodeParser from './nodeParsers/query/comparisonOperators/rql/LtNodeParser';
import GtNodeParser from './nodeParsers/query/comparisonOperators/rql/GtNodeParser';
import EqNodeParser from './nodeParsers/query/comparisonOperators/rql/EqNodeParser';
import LeNodeParser from './nodeParsers/query/comparisonOperators/rql/LeNodeParser';
import GeNodeParser from './nodeParsers/query/comparisonOperators/rql/GeNodeParser';
import LikeNodeParser from './nodeParsers/query/comparisonOperators/rql/LikeNodeParser';
import FiqlInNodeParser from './nodeParsers/query/comparisonOperators/fiql/FiqlInNodeParser';
import FiqlOutNodeParser from './nodeParsers/query/comparisonOperators/fiql/FiqlOutNodeParser';
import FiqlEqNodeParser from './nodeParsers/query/comparisonOperators/fiql/FiqlEqNodeParser';
import FiqlNeNodeParser   from './nodeParsers/query/comparisonOperators/fiql/FiqlNeNodeParser';
import FiqlLtNodeParser   from './nodeParsers/query/comparisonOperators/fiql/FiqlLtNodeParser';
import FiqlGtNodeParser   from './nodeParsers/query/comparisonOperators/fiql/FiqlGtNodeParser';
import FiqlLeNodeParser   from './nodeParsers/query/comparisonOperators/fiql/FiqlLeNodeParser';
import FiqlLikeNodeParser from './nodeParsers/query/comparisonOperators/fiql/FiqlLikeNodeParser';
import FiqlGeNodeParser   from './nodeParsers/query/comparisonOperators/fiql/FiqlGeNodeParser';
import QueryBuilder       from '../QueryBuilder';
import Query              from '../Query';
import GlobParser         from './valueParsers/GlobParser ';
import GroupbyNodeParser  from './nodeParsers/GroupbyNodeParser';
import GroupNodeParser    from './nodeParsers/query/GroupNodeParser';
import EqnNodeParser      from './nodeParsers/query/binaryOperator/rql/EqnNodeParser';
import EqfNodeParser      from './nodeParsers/query/binaryOperator/rql/EqfNodeParser';
import EqtNodeParser      from './nodeParsers/query/binaryOperator/rql/EqtNodeParser ';
import IeNodeParser       from './nodeParsers/query/binaryOperator/rql/IeNodeParser';

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
			.addNodeParser(new EqnNodeParser())
			.addNodeParser(new EqfNodeParser())
			.addNodeParser(new EqtNodeParser())
			.addNodeParser(new IeNodeParser())
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
			.addNodeParser(new LimitNodeParser(integerParser))
			.addNodeParser(new GroupbyNodeParser());
	}

	parse(tokenStream: TokenStream): Query {
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
