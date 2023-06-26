import Query from './Query';
import NodeParserChain from './parser/NodeParserChain';
import GroupNodeParser from './parser/nodeParsers/query/GroupNodeParser';
import ScalarParser from './parser/valueParsers/ScalarParser';
import StringTypeCaster from './parser/typeCasters/StringTypeCaster';
import { IntegerTypeCaster } from './parser/typeCasters/IntegerTypeCaster';
import FloatTypeCaster from './parser/typeCasters/FloatTypeCaster';
import BooleanTypeCaster from './parser/typeCasters/BooleanTypeCaster';
import ArrayParser from './parser/valueParsers/ArrayParser';
import FieldParser from './parser/valueParsers/FieldParser';
import IntegerParser from './parser/valueParsers/IntegerParser';
import GlobParser from './parser/valueParsers/GlobParser ';
import AndNodeParser from './parser/nodeParsers/query/logicalOperators/AndNodeParser';
import OrNodeParser from './parser/nodeParsers/query/logicalOperators/OrNodeParser';
import NotNodeParser from './parser/nodeParsers/query/logicalOperators/NotNodeParser';
import InNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/InNodeParser';
import OutNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/OutNodeParser';
import EqNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/EqNodeParser';
import NeNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/NeNodeParser';
import LtNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/LtNodeParser';
import GtNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/GtNodeParser';
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
import FiqlGeNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlGeNodeParser';
import FiqlLikeNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlLikeNodeParser';
import SortNodeParser from './parser/nodeParsers/SortNodeParser';
import LimitNodeParser from './parser/nodeParsers/LimitNodeParser';
import Lexer from './parser/Lexer';
import Parser from './parser/Parser';
import AggregateSelectNodeParser from './parser/nodeParsers/query/AggregateSelectNodeParser';
import FiqlLikeGlobNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlLikeGlobNodeParser';
import AlikeGlobNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/AlikeGlobNodeParser';
import ContainsNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/ContainsNodeParser';
import EqtNodeParser from './parser/nodeParsers/query/binaryOperator/rql/EqtNodeParser ';
import EqnNodeParser from './parser/nodeParsers/query/binaryOperator/rql/EqnNodeParser';
import EqfNodeParser from './parser/nodeParsers/query/binaryOperator/rql/EqfNodeParser';
import IeNodeParser from './parser/nodeParsers/query/binaryOperator/rql/IeNodeParser';
import MatchNodeParser from './parser/nodeParsers/query/comparisonOperators/rql/MatchNodeParser';
import FiqlEqnNodeParser from './parser/nodeParsers/query/binaryOperator/fiql/FiqlEqnNodeParser';
import FiqlEqfNodeParser from './parser/nodeParsers/query/binaryOperator/fiql/FiqlEqfNodeParser';
import FiqlIeNodeParser from './parser/nodeParsers/query/binaryOperator/fiql/FiqlIeNodeParser';
import FiqlMatchNodeParser     from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlMatchNodeParser';
import FiqlEqtNodeParser       from './parser/nodeParsers/query/binaryOperator/fiql/FiqlEqtNodeParser';
import FiqlAlikeGlobNodeParser from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlAlikeGlobNodeParser';
import FiqlContainsNodeParser  from './parser/nodeParsers/query/comparisonOperators/fiql/FiqlContainsNodeParser';
import LikeGlobNodeParser      from './parser/nodeParsers/query/comparisonOperators/rql/LikeGlobNodeParser';
import GroupbyNodeParser       from './parser/nodeParsers/GroupbyNodeParser';

export default class RqlParser {
	constructor(private allowedAggregateFunctions: string[] = ['count', 'max', 'min', 'sum', 'avg']) {

	}

	static staticParse(rql: string, allowedAggregateFunctions: string[] = ['count', 'max', 'min', 'sum', 'avg']): Query {
		return (new RqlParser(allowedAggregateFunctions).parse(rql));
	}

	parse(rql: string): Query {
		const processedRql = this.prepareRqlString(rql);
		const parser = this.createParser();
		const lexer = new Lexer();
		const tokens = lexer.tokenize(processedRql);
		return parser.parse(tokens);
	}

	protected prepareRqlString(rql: string): string {
		const fixedRql = rql
			.replace('_', '%5F')
			.replace(' ', '%20');
		const sortNodeRegexp = /sort\(([^()&]+)\)/;
		const matches = fixedRql.match(sortNodeRegexp);
		if (matches) {
			let sortNodeString = 'sort(';
			const sortFields = matches[1].split(',');
			sortFields.forEach((sortField: string) => {
				let finalSortField = sortField;
				if (!sortField.match(/^[+|-]([\W\w])/)) {
					finalSortField = '+' + sortField;
				}
				sortNodeString += finalSortField + ',';
			});
			sortNodeString = sortNodeString.slice(0, sortNodeString.length - 1) + ')';
			return fixedRql.replace(sortNodeRegexp, sortNodeString);
		}
		return fixedRql;
	}

	protected createParser(): Parser {
		const scalarParser = (new ScalarParser())
			.registerTypeCaster('string', new StringTypeCaster())
			.registerTypeCaster('integer', new IntegerTypeCaster())
			.registerTypeCaster('float', new FloatTypeCaster())
			.registerTypeCaster('boolean', new BooleanTypeCaster());
		const arrayParser = new ArrayParser(scalarParser);
		const globParser = new GlobParser();
		const fieldParser = new FieldParser();
		const integerParser = new IntegerParser();
		const queryNodeParser = new NodeParserChain();
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
			.addNodeParser(new LikeGlobNodeParser(fieldParser, globParser))
			.addNodeParser(new AlikeGlobNodeParser(fieldParser, globParser))
			.addNodeParser(new ContainsNodeParser(fieldParser, globParser))
			.addNodeParser(new EqtNodeParser())
			.addNodeParser(new EqnNodeParser())
			.addNodeParser(new EqfNodeParser())
			.addNodeParser(new IeNodeParser())
			.addNodeParser(new MatchNodeParser(fieldParser, globParser))
			.addNodeParser(new FiqlInNodeParser(fieldParser, arrayParser))
			.addNodeParser(new FiqlOutNodeParser(fieldParser, arrayParser))
			.addNodeParser(new FiqlEqNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlNeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlLtNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlGtNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlLeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlGeNodeParser(fieldParser, scalarParser))
			.addNodeParser(new FiqlLikeNodeParser(fieldParser, globParser))
			.addNodeParser(new FiqlLikeGlobNodeParser(fieldParser, globParser))
			.addNodeParser(new FiqlAlikeGlobNodeParser(fieldParser, globParser))
			.addNodeParser(new FiqlEqtNodeParser())
			.addNodeParser(new FiqlEqnNodeParser())
			.addNodeParser(new FiqlEqfNodeParser())
			.addNodeParser(new FiqlIeNodeParser())
			.addNodeParser(new FiqlMatchNodeParser(fieldParser, globParser))
			.addNodeParser(new FiqlContainsNodeParser(fieldParser, globParser));
		return new Parser(
			(new NodeParserChain())
				.addNodeParser(queryNodeParser)
				.addNodeParser(new AggregateSelectNodeParser(this.allowedAggregateFunctions))
				.addNodeParser(new SortNodeParser(fieldParser))
				.addNodeParser(new LimitNodeParser(integerParser))
				.addNodeParser(new GroupbyNodeParser())
		);
	}

	protected createLexer(): Lexer {
		return new Lexer();
	}
}
