import intern from 'intern';
import Lexer from '../../src/parser/Lexer';
import Parser from '../../src/Parser';

const {suite, test} = intern.getPlugin('interface.tdd');
const {assert} = intern.getPlugin('chai');

function encodeString(value: string) {
	return encodeURIComponent(value).replace(/[-_.~']/, (value: string) => {
		const encodingMap = {
			'-': '%2D',
			'_': '%5F',
			'.': '%2E',
			'~': '%7E',
		};
		return encodingMap[value];
	});
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

suite('Parser Test', () => {
	test('Test parsing', () => {
			assert.equal(true, false);
		}
	);
});
