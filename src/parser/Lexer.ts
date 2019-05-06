import { SubLexerInterface } from './interfaces';
import ConstantSubLexer from './subLexers/ConstantSubLexer';
import PunctuationSubLexer from './subLexers/PunctuationSubLexer';
import SubLexerChain from './subLexers/SubLexerChain';
import FiqlOperatorSubLexer from './subLexers/FiqlOperatorSubLexer';
import RqlOperatorSubLexer from './subLexers/RqlOperatorSubLexer';
import TypeSubLexer from './subLexers/TypeSubLexer';
import GlobSubLexer from './subLexers/GlobSubLexer';
import StringSubLexer from './subLexers/StringSubLexer';
import DatetimeSubLexer from './subLexers/DatetimeSubLexer';
import SortSubLexer from './subLexers/SortSubLexer';
import NumberSubLexer from './subLexers/NumberSubLexer';
import Token, { TokenTypeNameMap } from './Token';
import TokenStream from './TokenStream';

export default class Lexer {

	private subLexer: SubLexerInterface;

	constructor(subLexer?: SubLexerInterface) {
		this.subLexer = subLexer
			? subLexer
			: this.createDefaultSubLexer();
	}

	setSubLexer(subLexer: SubLexerInterface) {
		this.subLexer = subLexer;
		return this;
	}

	getSubLexer(): SubLexerInterface {
		return this.subLexer;
	}

	createDefaultSubLexer() {
		return (new SubLexerChain())
			.addSubLexer(new ConstantSubLexer())
			.addSubLexer(new PunctuationSubLexer())
			.addSubLexer(new FiqlOperatorSubLexer())
			.addSubLexer(new RqlOperatorSubLexer())
			.addSubLexer(new TypeSubLexer())
			.addSubLexer(new GlobSubLexer())
			.addSubLexer(new StringSubLexer())
			.addSubLexer(new DatetimeSubLexer())
			.addSubLexer(new NumberSubLexer())
			.addSubLexer(new SortSubLexer());
	}

	tokenize(code: string) {
		const end = code.length;
		let cursor = 0;
		const tokens = [];
		while (cursor < end) {
			const token = this.subLexer.getTokenAt(code, cursor);
			if (token === null) {
				throw new SyntaxError(
					`Invalid character "${code[cursor]}" at position ${cursor}`,
				);
			}
			tokens.push(token);
			cursor = token.end;
		}
		tokens.push(new Token(TokenTypeNameMap.T_END, '', cursor, cursor));
		return new TokenStream(tokens);
	}
}
