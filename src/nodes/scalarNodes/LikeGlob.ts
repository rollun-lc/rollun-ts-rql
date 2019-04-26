import Like from './Like';
import Glob from '../../parser/Glob';

export default class LikeGlob extends Like {
	constructor(field: string, value: any) {
		const processedValue = value instanceof Glob ? value : new Glob(value);
		super(field, processedValue);
	}
}
