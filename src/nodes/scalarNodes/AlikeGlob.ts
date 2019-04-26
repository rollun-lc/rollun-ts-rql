import Alike from './Alike';
import Glob from '../../parser/Glob';

export default class AlikeGlob extends Alike {
	constructor(field: string, value: any) {
		const processedValue = value instanceof Glob ? value : new Glob(value);
		super(field, processedValue);
	}
}
