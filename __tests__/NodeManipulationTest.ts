import {Query, Limit, In, Or, Eq, QueryBuilder} from '../src';

describe('Node Manipulation Test', () => {
	describe('Logical nodes', () => {
		test('Add subNode', () => {
			const andNode = new Or([new Eq('age', '21'), new Eq('age', '32')]);
			andNode.addNode(new Eq('age', '43'));
			const expectedNode = new Or([new Eq('age', '21'), new Eq('age', '32'), new Eq('age', '43')]);
			expect(andNode).toEqual(expectedNode);
		});
		test('Remove subNode', () => {
			const andNode = new Or([new Eq('age', '21'), new Eq('age', '32'), new Eq('age', '43')]);
			andNode.removeNode(2);
			const expectedNode = new Or([new Eq('age', '21'), new Eq('age', '32')]);
			expect(andNode).toEqual(expectedNode);
		});
		test('Chained', () => {
			const andNode = new Or()
				.addNode(new Eq('age', '32'))
				.addNodeAt(new Eq('age', '21'), 0);
			const expectedNode = new Or([new Eq('age', '21'), new Eq('age', '32')]);
			expect(andNode).toEqual(expectedNode);
		});
		test('Limit', () => {
			const expectedNode = new Limit(50, 150);
			expect(new Limit(50, 0).next().next().next()).toEqual(expectedNode);
		});
		test('Query next limit', () => {
			const expectedNode = new Query({limit: new Limit(100, 400)});
			expect(new Query()
				.getNextLimit(100)
				.getNextLimit(100)
				.getNextLimit(100)
				.getNextLimit(100)
				.getNextLimit(100)
			).toEqual(expectedNode);
		});
	});
	describe('Array nodes', () => {
		test('Add subNode', () => {
			const inNode = new In('age', [21, 32]);
			inNode.addValue(43);
			const expectedNode = new In('age', [21, 32, 43]);
			expect(inNode).toEqual(expectedNode);
		});
		test('Remove subNode', () => {
			const inNode = new In('age', [21, 32, 43]);
			inNode.removeValue(0);
			const expectedNode = new In('age', [32, 43]);
			expect(inNode).toEqual(expectedNode);
		});
	});
	describe('Query builder', () => {
		test('from full query', () => {
			const actual = QueryBuilder
				.create()
				.from(new Query())
				.getQuery()
			const expected = new Query();
			expect(actual).toEqual(expected);
		});
	});
});
