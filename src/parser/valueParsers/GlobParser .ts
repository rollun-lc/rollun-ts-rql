import { SubParserInterface } from '../interfaces';
import { TokenTypeNameMap }   from '../Token';
import TokenStream            from '../TokenStream';
import Glob                   from '../Glob';

export default class GlobParser implements SubParserInterface {
	/**
	 * @var array Allowed types to convert to glob
	 */
	protected static allowedTypes = [
		TokenTypeNameMap.T_INTEGER,
		TokenTypeNameMap.T_FLOAT,
		TokenTypeNameMap.T_STRING,
		TokenTypeNameMap.T_DATE,
		TokenTypeNameMap.T_GLOB,
	];

	/**
	 * @inheritdoc
	 */
	parse(tokenStream: TokenStream) {
		if (tokenStream.test(TokenTypeNameMap.T_GLOB)) {
			return new Glob(tokenStream.next().value);
		}
		if (tokenStream.nextIf(TokenTypeNameMap.T_TYPE)) {
			tokenStream.expect(TokenTypeNameMap.T_COLON);
		}
		return new Glob(Glob.encode(tokenStream.expect(GlobParser.allowedTypes).value));
	}
}
