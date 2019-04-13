import { SubLexerInterface } from '../interfaces';

export default class SubLexerChain implements SubLexerInterface {

	private subLexers = [];

	addSubLexer(subLexer: SubLexerInterface) {
		this.subLexers.push(subLexer);
		return this;
	}

	getTokenAt(code, cursor) {
		for (const subLexer of this.subLexers) {
			const token = subLexer.getTokenAt(code, cursor);
			if (token !== null) {
				return token;
			}
		}
		return null;
	}
}
