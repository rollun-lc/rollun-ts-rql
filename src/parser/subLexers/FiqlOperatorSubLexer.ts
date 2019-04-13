import { SubLexerInterface } from '../interfaces';
import Token, { TokenTypeNameMap } from '../Token';

export enum FiqlOperatorMap {
	'=' = 'eq',
	'==' = 'eq',
	'!=' = 'ne',
	'<>' = 'ne',
	'>' = 'gt',
	'<' = 'lt',
	'>=' = 'ge',
	'<=' = 'le',
}

export default class FiqlOperatorSubLexer implements SubLexerInterface {
	getTokenAt(code, cursor) {
		const matches = code.match(new RegExp('/(=[a-z]\w*=|==|!=|<>|>=|<=|<|>|==|=)/', 'Ai'));
		if (matches) {
			return new Token(
				TokenTypeNameMap.T_OPERATOR,
				this.getValue(matches[0]),
				cursor,
				cursor + matches[0].length
			);
		} else {
			return null;
		}
	}

	private getValue(match) {
		if ((FiqlOperatorMap[match])) {
			return FiqlOperatorMap[match];
		} else {
			return match.slice(1, -1);
		}
	}
}
