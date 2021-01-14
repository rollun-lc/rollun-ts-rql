import QueryStringifier from '../src/QueryStringifier';
import Query            from '../src/Query';
import Select           from '../src/nodes/Select';
import Limit            from '../src/nodes/Limit';
import Eq               from '../src/nodes/scalarNodes/Eq';
import Sort             from '../src/nodes/Sort';
import RqlParser        from '../src/RqlParser';


describe('Speed test', () => {
	let stringsToParse = [];
	for (let i = 0; i < 1000; i++) {
		const rql = QueryStringifier.stringify(new Query({
			select: new Select(['one', 'two', 'three', 'four']),
			limit: new Limit(0, 1),
			query: new Eq('field', 'id'),
			sort: new Sort({'id': -1})
		}));
		stringsToParse.push(rql);
	}
	const length = stringsToParse.length;
	test(`Parsing ${length} Queries`, () => {
		const parser = new RqlParser();
		for (let i = 0; i < length; i++) {
			const rql =  parser.parse(stringsToParse[i]);
		}
	});
	const query = new Query({
		select: new Select(['one', 'two', 'three', 'four']),
		limit: new Limit(0, 1),
		query: new Eq('field', 'id'),
		sort: new Sort({'id': -1})
	});
	test(`Stringification of 100000 Queries`, () => {
		for (let i = 0; i < 100000; i++) {
			const str = QueryStringifier.stringify(query);
		}
	});
});
