import intern from 'intern';
import In from '../../src/nodes/arrayNodes/In';
import Or from '../../src/nodes/logicalNodes/Or';
import Eq from '../../src/nodes/scalarNodes/Eq';

const {suite, test} = intern.getPlugin('interface.tdd');
const {assert} = intern.getPlugin('chai');

suite('Node Manipulation Test', () => {
	suite('Logical nodes', () => {
		test('Add subNode', () => {
			const andNode = new Or([new Eq('age', '21'), new Eq('age', '32')]);
			andNode.addNode(new Eq('age', '43'));
			const expectedNode = new Or([new Eq('age', '21'), new Eq('age', '32'), new Eq('age', '43')]);
			assert.deepEqual( andNode, expectedNode, 'subnode was added correctly');
		});
		test('Remove subNode', () => {
			const andNode = new Or([new Eq('age', '21'), new Eq('age', '32'), new Eq('age', '43')]);
			andNode.removeNode(2);
			const expectedNode = new Or([new Eq('age', '21'), new Eq('age', '32')]);
			assert.deepEqual(andNode, expectedNode,  'subnode was removed correctly');
		});
	});
	suite('Array nodes', () => {
		test('Add subNode', () => {
			const inNode = new In('age', [21, 32]);
			inNode.addValue(43);
			const expectedNode = new In('age', [21, 32, 43]);
			assert.deepEqual(inNode, expectedNode, 'subnode was added correctly');
		});
		test('Remove subNode', () => {
			const inNode = new In('age', [21, 32, 43]);
			inNode.removeValue(0);
			const expectedNode = new In('age', [32, 43]);
			assert.deepEqual(inNode, expectedNode, 'subnode was removed correctly');
		});
	});
});
