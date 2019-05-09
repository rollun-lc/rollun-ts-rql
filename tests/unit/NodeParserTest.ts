import intern from 'intern';
import Lexer from '../../src/parser/Lexer';
import Parser from '../../src/parser/Parser';
import * as lodash from 'lodash';
import Query from '../../src/Query';
import QueryBuilder from '../../src/QueryBuilder';
import Eq from '../../src/nodes/scalarNodes/Eq';
import Ne from '../../src/nodes/scalarNodes/Ne';
import Lt from '../../src/nodes/scalarNodes/Lt';
import Gt from '../../src/nodes/scalarNodes/Gt';
import Le from '../../src/nodes/scalarNodes/Le';
import Ge from '../../src/nodes/scalarNodes/Ge';
import Like from '../../src/nodes/scalarNodes/Like';
import Glob from '../../src/parser/Glob';
import In from '../../src/nodes/arrayNodes/In';
import Out from '../../src/nodes/arrayNodes/Out';
import And from '../../src/nodes/logicalNodes/And';
import Sort from '../../src/nodes/Sort';
import Select from '../../src/nodes/Select';
import Limit from '../../src/nodes/Limit';
import Or from '../../src/nodes/logicalNodes/Or';
import Not from '../../src/nodes/logicalNodes/Not';

const {suite, test} = intern.getPlugin('interface.tdd');
const {assert} = intern.getPlugin('chai');

function encodeString(value: string) {
	return encodeURIComponent(value).replace(new RegExp(/[-_.~'()*]/, 'g'), (value: string) => {
		const encodingMap = {
			'-': '%2D',
			'_': '%5F',
			'.': '%2E',
			'~': '%7E',
			'(': '%28',
			')': '%29',
			'*': '%2A'
		};
		return encodingMap[value];
	});
}

function testParsing(rql: string, expected: Query, testNumber: number) {
	const lexer = new Lexer();
	const parser = new Parser();
	const parsingResult = parser.parse(lexer.tokenize(rql));
	assert.isTrue(
		lodash.isEqual(parsingResult, expected), `parsing failure, test #${testNumber}`
	);
}

function testSyntaxError(rql: string, errorMessage: string) {
	try {
		const lexer = new Lexer();
		const parser = new Parser();
		parser.parse(lexer.tokenize(rql));
	} catch (error) {
		assert.equal(error.message, errorMessage);
	}
}

// @ts-ignore
const dataForParsingTest = {
	'simple eq': [
		'eq(name,value)',
		(new QueryBuilder())
			.addQuery(new Eq('name', 'value'))
			.getQuery(),
	],
	'scalar operators': [
		'eq(a,1)&ne(b,2)&lt(c,3)&gt(d,4)&le(e,5)&ge(f,6)&like(g,*abc?)',
		(new QueryBuilder())
			.addQuery(new Eq('a', 1))
			.addQuery(new Ne('b', 2))
			.addQuery(new Lt('c', 3))
			.addQuery(new Gt('d', 4))
			.addQuery(new Le('e', 5))
			.addQuery(new Ge('f', 6))
			.addQuery(new Like('g', new Glob('*abc?')))
			.getQuery(),
	],
	'array operators': [
		'in(a,(1,b))&out(c,(2,d))',
		(new QueryBuilder())
			.addQuery(new In('a', [1, 'b']))
			.addQuery(new Out('c', [2, 'd']))
			.getQuery(),
	],
	'multiple query operators': [
		'eq(a,b)&lt(c,d)',
		(new QueryBuilder())
			.addQuery(new Eq('a', 'b'))
			.addQuery(new Lt('c', 'd'))
			.getQuery(),
	],
	'logic operators': [
		'and(eq(a,b),lt(c,d),or(in(a,(1,f)),gt(g,2)))&not(ne(h,3))',
		(new QueryBuilder())
			.addQuery(new And([
				new Eq('a', 'b'),
				new Lt('c', 'd'),
				new Or([
					new In('a', [1, 'f']),
					new Gt('g', 2),
				])
			]))
			.addQuery(new Not([
				new Ne('h', 3),
			]))
			.getQuery(),
	],
	'select, sort and limit operators': [
		'select(a,b,c)&sort(+a,-b)&limit(1,2)',
		(new QueryBuilder())
			.addSelect(new Select(['a', 'b', 'c']))
			.addSort(new Sort({
				'a': 1,
				'b': -1,
			}))
			.addLimit(new Limit(1, 2))
			.getQuery(),
	],
	'string typecast': [
		'ne(x,string:*)&' +
		'eq(a,string:3)&' +
		'in(b,(string:true(),string:false(),string:null(),string:empty()))&' +
		'out(c,(string:-1,string:+.5e10))',
		(new QueryBuilder())
			.addQuery(new Ne('x', '*'))
			.addQuery(new Eq('a', '3'))
			.addQuery(new In('b', [
				'true',
				'false',
				'null',
				'',
			]))
			.addQuery(new Out('c', [
				'-1',
				'+.5e10'
			]))
			.getQuery(),
	],
	'integer typecast': [
		'eq(a,integer:0)&' +
		'eq(b,integer:1.5)&' +
		'eq(c,integer:null())&' +
		'eq(d,integer:true())&' +
		'eq(e,integer:a)&' +
		'eq(f,integer:empty())' +
		'eq(g,integer:false())&' +
		'eq(h,integer:2016-07-01T09:48:55Z)',
		(new QueryBuilder())
			.addQuery(new Eq('a', 0))
			.addQuery(new Eq('b', 1))
			.addQuery(new Eq('c', 0))
			.addQuery(new Eq('d', 1))
			.addQuery(new Eq('e', 0))
			.addQuery(new Eq('f', 0))
			.addQuery(new Eq('g', 0))
			.addQuery(new Eq('h', 20160701094855))
			.getQuery(),
	],
	'float typecast': [
		'eq(a,float:0)&' +
		'eq(b,float:1.5)&' +
		'eq(c,float:null())&' +
		'eq(d,float:true())&' +
		'eq(e,float:a)&' +
		'eq(f,float:empty())&' +
		'eq(g,float:false())&' +
		'eq(h,float:2016-07-01T09:48:55Z)',
		(new QueryBuilder())
			.addQuery(new Eq('a', 0.))
			.addQuery(new Eq('b', 1.5))
			.addQuery(new Eq('c', 0.))
			.addQuery(new Eq('d', 1.))
			.addQuery(new Eq('e', 0.))
			.addQuery(new Eq('f', 0.))
			.addQuery(new Eq('g', 0.))
			.addQuery(new Eq('h', 20160701094855.))
			.getQuery(),
	],
	'boolean typecast': [
		'eq(a,boolean:0)&' +
		'eq(b,boolean:1.5)&' +
		'eq(c,boolean:null())&' +
		'eq(d,boolean:true())&' +
		'eq(e,boolean:a)&' +
		'eq(f,boolean:empty())&' +
		'eq(g,boolean:false())&' +
		'eq(h,boolean:2016-07-01T09:48:55Z)',
		(new QueryBuilder())
			.addQuery(new Eq('a', false))
			.addQuery(new Eq('b', true))
			.addQuery(new Eq('c', false))
			.addQuery(new Eq('d', true))
			.addQuery(new Eq('e', true))
			.addQuery(new Eq('f', false))
			.addQuery(new Eq('g', false))
			.addQuery(new Eq('h', true))
			.getQuery(),
	],
	'glob typecast': [
		'like(a,glob:0)&' +
		'like(b,glob:1.5)&' +
		'like(c,glob:a)&' +
		'like(d,glob:2016-07-01T09:48:55Z)',
		(new QueryBuilder())
			.addQuery(new Like('a', new Glob('0')))
			.addQuery(new Like('b', new Glob('1.5')))
			.addQuery(new Like('c', new Glob('a')))
			.addQuery(new Like('d', new Glob('2016-07-01T09:48:55Z')))
			.getQuery(),
	],
	'constants': [
		'in(a,(null(),true(),false(),empty()))',
		(new QueryBuilder())
			.addQuery(new In('a', [
				null,
				true,
				false,
				'',
			]))
			.getQuery(),
	],
	'fiql operators': [
		'a=eq=1&b=ne=2&c=lt=3&d=gt=4&e=le=5&f=ge=6&g=in=(7,8)&h=out=(9,10)&i=like=*abc?',
		(new QueryBuilder())
			.addQuery(new Eq('a', 1))
			.addQuery(new Ne('b', 2))
			.addQuery(new Lt('c', 3))
			.addQuery(new Gt('d', 4))
			.addQuery(new Le('e', 5))
			.addQuery(new Ge('f', 6))
			.addQuery(new In('g', [7, 8]))
			.addQuery(new Out('h', [9, 10]))
			.addQuery(new Like('i', new Glob('*abc?')))
			.getQuery(),
	],
	'fiql operators (json compatible)': [
		'a=1&b==2&c<>3&d!=4&e<5&f>6&g<=7&h>=8',
		(new QueryBuilder())
			.addQuery(new Eq('a', 1))
			.addQuery(new Eq('b', 2))
			.addQuery(new Ne('c', 3))
			.addQuery(new Ne('d', 4))
			.addQuery(new Lt('e', 5))
			.addQuery(new Gt('f', 6))
			.addQuery(new Le('g', 7))
			.addQuery(new Ge('h', 8))
			.getQuery(),
	],
	'group with one operator': [
		'(eq(a,b))',
		(new QueryBuilder())
			.addQuery(new Eq('a', 'b'))
			.getQuery(),
	],
	'simple groups': [
		'(eq(a,b)&lt(c,d))&(ne(e,f)|gt(g,h))',
		(new QueryBuilder())
			.addQuery(new And([
				new Eq('a', 'b'),
				new Lt('c', 'd'),
			]))
			.addQuery(new Or([
				new Ne('e', 'f'),
				new Gt('g', 'h'),
			]))
			.getQuery(),
	],
	'deep groups & mix groups with operators': [
		'(eq(a,b)|lt(c,d)|and(gt(e,f),(ne(g,h)|ge(i,j)|in(k,(l,m,n))|(o<>p&q=le=r))))',
		(new QueryBuilder())
			.addQuery(new Or([
				new Eq('a', 'b'),
				new Lt('c', 'd'),
				new And([
					new Gt('e', 'f'),
					new Or([
						new Ne('g', 'h'),
						new Ge('i', 'j'),
						new In('k', ['l', 'm', 'n']),
						new And([
							new Ne('o', 'p'),
							new Le('q', 'r'),
						]),
					]),
				]),
			]))
			.getQuery(),
	],
	'datetime support': [
		'in(a,(2015-04-16T17:40:32Z,2012-02-29T17:40:32Z))',
		(new QueryBuilder())
			.addQuery(new In('a', [
				new Date('2015-04-16T17:40:32Z'),
				new Date('2012-02-29T17:40:32Z'),
			]))
			.getQuery(),
	],
	'string encoding': [
		`in(a,(${encodeString('+a-b:c')},null(),${encodeString('null()')},2015-04-19T21:00:00Z,${encodeString('2015-04-19T21:00:00Z')},1.1e+3,${encodeString('1.1e+3')}))&like(b,${'*abc?'})&eq(c,${encodeString('*abc?')})`,
		(new QueryBuilder())
			.addQuery(new In('a', [
				'+a-b:c',
				null,
				'null()',
				new Date('2015-04-19T21:00:00Z'),
				'2015-04-19T21:00:00Z',
				1.1e+3,
				'1.1e+3',
			]))
			.addQuery(new Like('b', new Glob('*abc?')))
			.addQuery(new Eq('c', '*abc?'))
			.getQuery(),
	],
	'long integers': [
		`in(a,(9223372036854775806,-9223372036854775807,9223372036854775807,-9223372036854775808,9223372036854775808,-9223372036854775809,9223372036854775809,-9223372036854775810))`,

		(new QueryBuilder())
			.addQuery(new In('a', [
				9223372036854775806,
				-9223372036854775807,
				9223372036854775807,
				-9223372036854775808,
				9223372036854775808,
				-9223372036854775809,
				9223372036854775809,
				-9223372036854775810,
			]))
			.getQuery(),
	],
};
suite('Parser Test', () => {
	test('Test parsing', () => {
			const testQty = Object.keys(dataForParsingTest).length;
			Object.values(dataForParsingTest).forEach((testData: any[], index) => {
					console.log(`Parsing test ${index + 1} of ${testQty}`);
					const [rql, result] = testData;
					testParsing(rql, result, index + 1);
				}
			);
		}
	);
});
