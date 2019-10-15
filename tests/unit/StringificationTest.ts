import intern from 'intern';
import QueryStringifier from '../../src/QueryStringifier';
import Query from '../../src/Query';
import Select from '../../src/nodes/Select';
import Sort from '../../src/nodes/Sort';
import Limit from '../../src/nodes/Limit';
import In from '../../src/nodes/arrayNodes/In';
import Out from '../../src/nodes/arrayNodes/Out';
import And from '../../src/nodes/logicalNodes/And';
import Or                    from '../../src/nodes/logicalNodes/Or';
import Not                   from '../../src/nodes/logicalNodes/Not';
import Alike                 from '../../src/nodes/scalarNodes/Alike';
import Eq                    from '../../src/nodes/scalarNodes/Eq';
import Ge                    from '../../src/nodes/scalarNodes/Ge';
import Gt                    from '../../src/nodes/scalarNodes/Gt';
import Le                    from '../../src/nodes/scalarNodes/Le';
import Like                  from '../../src/nodes/scalarNodes/Like';
import Lt                    from '../../src/nodes/scalarNodes/Lt';
import Ne                    from '../../src/nodes/scalarNodes/Ne';
import GroupBy               from '../../src/nodes/GroupBy';
import AggregateFunctionNode from '../../src/nodes/aggregateNodes/AggregateFunctionNode';

const {suite, test} = intern.getPlugin('interface.tdd');
const {assert} = intern.getPlugin('chai');

const dataProvider = [
	{
		queryObject: new Query({
			select: new Select([
				'id', 'name', 'data', 'age'
			]),
			sort: new Sort({age: -1}),
			limit: new Limit(10, 0),
			query: new And([
				new Or([
					new Eq('name', 'Bob'),
					new Eq('name', 'Jeff')]),
				new And([
					new Le('age', 23),
					new Ge('age', 55)
				])
			])
		}),
		expectedString: 'select(id,name,data,age)&sort(-age)&limit(10,0)&and(or(eq(name,string:Bob),eq(name,string:Jeff)),and(le(age,23),ge(age,55)))',
		message: 'first query'
	},
	{
		queryObject: new Query({
			select: new Select(['id', 'name', 'age']),
			query: new And([
				new And([
					new In('name', ['Alfred', 'Ivan', 'Jared']),
					new Out('id', [12335, 16725])
				]),
				new Or([
					new Like('name', 'er'),
					new Alike('name', 'aZa')
				])
			]),
			limit: new Limit(13, 100)
		}),
		expectedString: 'select(id,name,age)&limit(13,100)&and(and(in(name,(Alfred,Ivan,Jared)),out(id,(12335,16725))),or(like(name,string:er),alike(name,string:aZa)))',
		message: 'second query'
	},
	{
		queryObject: new Query({
			query: new Not([
				new Or([
					new Gt('age', 33),
					new Lt('age', 100),
					new Ne('id', 1823457234985)
				])
			])
		}),
		expectedString: 'not(or(gt(age,33),lt(age,100),ne(id,1823457234985)))',
		message: 'third query'
	},
	{
		queryObject: new Query({
			limit: new Limit(20, 20)
		}),
		expectedString: 'limit(20,20)',
		message: 'fourth query'
	},
	{
		queryObject: new Query({
			select: new Select(['id', 'name', 'age']),
			query: new Eq('age', 45)
		}),
		expectedString: 'select(id,name,age)&eq(age,45)',
		message: 'query 5'
	},
	{
		queryObject: new Query({
			select: new Select(['id', 'name', 'age']),
			query: new And([
				new Or([new Le('age', 45), new Ge('age', 45)]),
				new Or([new Le('age', 45), new Ge('age', 45)])
			])
		}),
		expectedString: 'select(id,name,age)&and(or(le(age,45),ge(age,45)),or(le(age,45),ge(age,45)))',
		message: 'query 6'
	},
	{
		queryObject: new Query({
			select: new Select(['id', 'name', 'age']),
			sort: new Sort({id: 1, age: 1})
		}),
		expectedString: 'select(id,name,age)&sort(+id,+age)',
		message: 'query with multiple sort nodes'
	},
	{
		queryObject: new Query({
			select: new Select(['id', 'name', 'age']),
			query: new Or([
				new Like('name', '('),
				new Like('name', ')'),
				new Like('name', '-'),
				new Like('name', '_'),
				new Like('name', '.'),
				new Like('name', '~'),
				new Like('name', '*'),
				new Like('name', '\''),
				new Like('name', '!')
			])
		}),
		expectedString: 'select(id,name,age)&or(like(name,string:%28),like(name,string:%29),like(name,string:%2D),like(name,string:%5F),like(name,string:%2E),like(name,string:%7E),like(name,string:%2A),like(name,string:%27),like(name,string:%21))',
		message: 'query with special characters'
	},
	{
		queryObject: new Query({
			select: new Select(['id', 'name', 'age']),
			query: new Or([
				new Like('name', '=('),
				new Like('name', '=)'),
				new Like('name', '*-*'),
				new Like('name', 'T_T'),
				new Like('name', '0.0'),
				new Like('name', '~qw'),
				new Like('name', 'o*o'),
				new Like('name', 'ars\''),
				new Like('name', 'run!')
			])
		}),
		expectedString: 'select(id,name,age)&or(like(name,string:%3D%28),like(name,string:%3D%29),like(name,string:%2A%2D%2A),like(name,string:T%5FT),like(name,string:0%2E0),like(name,string:%7Eqw),like(name,string:o%2Ao),like(name,string:ars%27),like(name,string:run%21))',
		message: 'query with words that contain special characters'
	},
	{
		queryObject: new Query({
			select: new Select([
					new AggregateFunctionNode('count', 'age'),
					new AggregateFunctionNode('min', 'age'),
					new AggregateFunctionNode('max', 'age'),
					new AggregateFunctionNode('avg', 'age')
			])
		}),
		expectedString: 'select(count(age),min(age),max(age),avg(age))',
		message: 'query with words that contain special characters'
	},
	{
		queryObject: new Query({
			select: new Select(['id', 'name', 'age']),
			query: new Or([
				new Like('name', '123'),
				new Like('name', 123),
				new Like('id', '1123532144'),
				new Like('id', 1123532144),
			])
		}),
		expectedString: 'select(id,name,age)&or(like(name,string:123),like(name,123),like(id,string:1123532144),like(id,1123532144))',
		message: 'type annotation check query'
	},
	{
		queryObject: new Query({
			group: new GroupBy(['id', 'age'])
		}),
		expectedString: 'groupby(id,age)',
		message: 'GroupBy Node test'
	}
];

suite('Stringification', () => {
	const testsAmount = dataProvider.length;
		dataProvider.forEach((entry, index) => {
			const {queryObject, expectedString, message} = entry;
			test(`Test ${index + 1} of ${testsAmount}`, () => {
			const actualString = QueryStringifier.stringify(queryObject);
			assert.equal(actualString, expectedString, message);
		});
	});
});
