import * as locutus from 'locutus';

export default class Glob {
	private readonly glob: string;

	constructor(glob: string) {
		this.glob = glob;
	}

	static encode(value: string): string {
		// disable encoding of wildcard for now, because it disables usage of wildcard
		// need to figure out if something will break.
		// return locutus.php.strings.addcslashes(value, '\\?*');
		return value;
	}

	toString() {
		return this.glob;
	}

	private decoder(many: string, one: string, escaper: (str: string) => string) {
		return this.glob.replace(/\\\\.|\*|\?|./, (match: string) => {
			if (match[0] === '*') {
				return many;
			}

			if (match[0] === '?') {
				return one;
			}
			return escaper(locutus.php.strings.stripslashes(match[0]));
		});
	}

	toRql(): string {
		return this.decoder('*', '?', (char: string) => {
			return locutus.php.strings.strtr(encodeURIComponent(char), {
				'-': '%2D',
				'_': '%5F',
				'.': '%2E',
				'~': '%7E',
			});
		});
	}

	toRegex(): string {
		const regex = this.decoder(
			'.*',
			'.',
			function (char: string) {
				return locutus.php.pcre.preg_quote(char, '/');
			}
		);
		return '^' + regex + '$';
	}

	toLike() {
		return this.decoder(
			'%',
			'_',
			function ($char) {
				return locutus.php.strings.addcslashes($char, '\\%_');
			}
		);
	}
}
