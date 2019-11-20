import intern           from 'intern';
import QueryStringifier from '../../dist/QueryStringifier';
import Query            from '../../dist/Query';
import Select           from '../../dist/nodes/Select';
import Limit            from '../../dist/nodes/Limit';
import Eq               from '../../dist/nodes/scalarNodes/Eq';
import Sort             from '../../dist/nodes/Sort';
import RqlParser        from '../../dist/RqlParser';

const {suite, test} = intern.getPlugin('interface.tdd');

suite('Speed test', () => {
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
