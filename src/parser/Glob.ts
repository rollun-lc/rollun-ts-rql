import * as locutus from 'locutus';

export default class Glob {
	constructor(private glob: string) {
	}

	static encode(value: string): string {
		return locutus.php.strings.addcslashes(value, '\\?*');
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
