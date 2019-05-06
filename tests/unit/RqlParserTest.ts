import intern from 'intern';
import Query from '../../src/Query';
import * as lodash from 'lodash';
import RqlParser from '../../src/RqlParser';
import AggregateFunctionNode from '../../src/nodes/aggregateNodes/AggregateFunctionNode';
import Sort from '../../src/nodes/Sort';
import Limit from '../../src/nodes/Limit';
import And from '../../src/nodes/logicalNodes/And';
import Eq from '../../src/nodes/scalarNodes/Eq';
import Ne from '../../src/nodes/scalarNodes/Ne';
import Eqn from '../../src/nodes/binaryNodes/Eqn';
import Ge from '../../src/nodes/scalarNodes/Ge';
import Le from '../../src/nodes/scalarNodes/Le';
import Eqf from '../../src/nodes/binaryNodes/Eqf';
import Eqt from '../../src/nodes/binaryNodes/Eqt';
import AlikeGlob from '../../src/nodes/scalarNodes/AlikeGlob';
import Ie from '../../src/nodes/binaryNodes/Ie';
import Or from '../../src/nodes/logicalNodes/Or';
import Lt from '../../src/nodes/scalarNodes/Lt';
import Gt from '../../src/nodes/scalarNodes/Gt';
import In from '../../src/nodes/arrayNodes/In';
import AggregateSelect from '../../src/nodes/aggregateNodes/AggregateSelect';

const {suite, test} = intern.getPlugin('interface.tdd');
const {assert} = intern.getPlugin('chai');

suite('RQL Parser Test', () => {
	test('Group node that contains group nodes', () => {
		const rqlString = 'and(and(ne(a,3),ne(a,8)),or(ne(b,3),ne(b,8)))';
		const expectedQueryObject = new Query(
			{
				query: new And([
					new And([
						new Ne('a',3),
						new Ne('a',8),
					]),
					new Or([
						new Ne('b',3),
						new Ne('b',8),
					])
				])
			}
		);
		const parser = new RqlParser();
		const actualQueryObject = parser.parse(rqlString);
		assert.isTrue(lodash.isEqual(actualQueryObject, expectedQueryObject), 'query objects are not equal');
	});
	test('Test complex RQL parsing', () => {
			let rqlString = 'and(and(eq(q,null()),ne(q,null()),le(q,r),ge(q,u),eqn(a),eqf(b),eqt(c),alike(d,*abc?),ie(f)),or(lt(q,t),gt(q,y),in(q,(a,s,d,f,g))))';
			rqlString += '&limit(20,30)';
			rqlString += '&sort(-q,+w,e)';
			rqlString += '&select(q,max(q),min(q),count(q))';
			const expectedQueryObject = new Query({
				select: new AggregateSelect([
					'q',
					(new AggregateFunctionNode('max', 'q')),
					(new AggregateFunctionNode('min', 'q')),
					(new AggregateFunctionNode('count', 'q')),
				]),
				sort: new Sort({'q': -1, 'w': 1, 'e': 1}),
				limit: new Limit(20, 30),
				query: new And([
					new And([
						new Eq('q', null),
						new Ne('q', null),
						new Le('q', 'r'),
						new Ge('q', 'u'),
						new Eqn('a'),
						new Eqf('b'),
						new Eqt('c'),
						new AlikeGlob('d', '*abc?'),
						new Ie('f'),
					]),
					new Or([
						new Lt('q', 't'),
						new Gt('q', 'y'),
						new In('q', ['a', 's', 'd', 'f', 'g']),
					]),
				])
			});
			const parser = new RqlParser();
			const actualQueryObject = parser.parse(rqlString);
			assert.isTrue(lodash.isEqual(actualQueryObject, expectedQueryObject), 'query objects are not equal');
		}
	);
});
