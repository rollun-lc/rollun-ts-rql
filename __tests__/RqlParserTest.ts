import Query                 from '../dist/Query';
import * as lodash           from 'lodash';
import RqlParser             from '../dist/RqlParser';
import AggregateFunctionNode from '../dist/nodes/aggregateNodes/AggregateFunctionNode';
import Sort                  from '../dist/nodes/Sort';
import Limit                 from '../dist/nodes/Limit';
import And                   from '../dist/nodes/logicalNodes/And';
import Eq                    from '../dist/nodes/scalarNodes/Eq';
import Ne                    from '../dist/nodes/scalarNodes/Ne';
import Eqn                   from '../dist/nodes/binaryNodes/Eqn';
import Ge                    from '../dist/nodes/scalarNodes/Ge';
import Le                    from '../dist/nodes/scalarNodes/Le';
import Eqf                   from '../dist/nodes/binaryNodes/Eqf';
import Eqt                   from '../dist/nodes/binaryNodes/Eqt';
import AlikeGlob             from '../dist/nodes/scalarNodes/AlikeGlob';
import Ie                    from '../dist/nodes/binaryNodes/Ie';
import Or                    from '../dist/nodes/logicalNodes/Or';
import Lt                    from '../dist/nodes/scalarNodes/Lt';
import Gt                    from '../dist/nodes/scalarNodes/Gt';
import In                    from '../dist/nodes/arrayNodes/In';
import AggregateSelect       from '../dist/nodes/aggregateNodes/AggregateSelect';


describe('RQL Parser Test', () => {
	test('Group node that contains group nodes', () => {
		const rqlString = 'and(and(ne(a,3),ne(a,8)),or(ne(b,3),ne(b,8)))';
		const expectedQueryObject = new Query(
			{
				query: new And([
					new And([
						new Ne('a', 3),
						new Ne('a', 8),
					]),
					new Or([
						new Ne('b', 3),
						new Ne('b', 8),
					])
				])
			}
		);
		const parser = new RqlParser();
		const actualQueryObject = parser.parse(rqlString);
		expect(lodash.isEqual(actualQueryObject, expectedQueryObject)).toBeTruthy();
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
			expect(lodash.isEqual(actualQueryObject, expectedQueryObject)).toBeTruthy();
		}
	);
});
