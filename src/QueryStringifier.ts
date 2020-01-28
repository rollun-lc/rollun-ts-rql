import Query                 from './Query';
import Select                from './nodes/Select';
import Limit                 from './nodes/Limit';
import Sort                  from './nodes/Sort';
import AbstractNode          from './nodes/AbstractNode';
import AbstractLogicalNode   from './nodes/logicalNodes/AbstractLogicalNode';
import AbstractArrayNode     from './nodes/arrayNodes/AbstractArrayNode';
import AbstractScalarNode    from './nodes/scalarNodes/AbstractScalarNode';
import AggregateFunctionNode from './nodes/aggregateNodes/AggregateFunctionNode';
import GroupBy               from './nodes/GroupBy';

export default class QueryStringifier {
	static stringify(query: Query): string {
		const result = Object.entries(query).reduce(
			(accumulator, item) => {
				const [key, node] = item;
				accumulator += this.parseTopLevelNode(key, node);
				return accumulator + this.addUnion(accumulator);
			},
			'');

		return (result.substr(-1) === '&')
			? result.substring(0, result.length - 1)
			: result;
	}

	protected static encodeRql(value: string): string {
		let encodedValue = encodeURIComponent(value);
		while (encodedValue.match(/[\(\)\-\_\.\~\!\*\'\!]/g)) {
			encodedValue = encodedValue
				.replace('(', '%28')
				.replace(')', '%29')
				.replace('-', '%2D')
				.replace('_', '%5F')
				.replace('.', '%2E')
				.replace('~', '%7E')
				.replace('*', '%2A')
				.replace('\'', '%27')
				.replace('!', '%21');
		}
		return encodedValue;
	}

	protected static parseTopLevelNode(key: string, node: AbstractNode) {
		let cleanKey = key;
		if (cleanKey[0] === '_' ) { // remove underscore to enable protected and private methods usage
			cleanKey = key.slice(1);
		}
		const methodName = `parse${cleanKey[0].toUpperCase()}${cleanKey.slice(1)}`;
		const handler = this[methodName];
		if (handler) {
			return this[methodName](node);
		} else {
			throw new Error(`Node parser with name "${methodName}" is not a function!`);
		}
	}

	protected static parseGroupNode(node?: GroupBy): string {
		if (!node) { return ''; }
		const fieldsAmount = node.fields.length;
		const nodeArguments = node.fields.map((field, index) => {
			return this.encodeRql(field) + (index + 1 < fieldsAmount ? ',' : '');
		});
		return `groupby(${nodeArguments.join('')})`;
	}

	protected static parseSelectNode(node?: Select): string {
		if (node) {
			const encodedFieldNames =
				node.fields.map((fieldName) => {
						if (fieldName instanceof AggregateFunctionNode) {
							return `${this.encodeRql(fieldName.function)}(${this.encodeRql(fieldName.field.toString())})`;
						} else {
							return this.encodeRql(fieldName);
						}
					}
				);
			return `select(${encodedFieldNames.join(',')})`;
		}
		return '';
	}

	protected static parseSortNode(node?: Sort): string {
		let result;
		if (node) {
			result = Object.entries(node.sortOptions).reduce((accumulator, currentItem) => {
				const [field, direction] = currentItem;
				const parsedDirection = (direction === 1) ? '+' : '-';
				accumulator += `${parsedDirection}${this.encodeRql(field)},`;
				return accumulator;
			}, 'sort(');
			if (result.endsWith(',')) {
				result = result.substring(0, result.length - 1);
			}
			result += ')';
		}
		else {
			result = '';
		}
		return result;
	}

	protected static parseLimitNode(node?: Limit): string {
		return node ? `limit(${node.limit},${node.offset})` : '';
	}

	protected static parseQueryNode(node?: AbstractNode): string {
		let result = '';
		switch (true) {

			case (node instanceof AbstractLogicalNode):
				const logicalNode = <AbstractLogicalNode> node;
				const nodeName = logicalNode.name;
				result += logicalNode.subNodes.reduce((accumulator, currentItem) => {
					return accumulator + `${this.parseQueryNode(currentItem)},`;
				}, result);
				result = (result.substr(-1) === ',') ? result.substring(0, result.length - 1) : result;
				result = `${nodeName}(${result})`;
				break;

			case (node instanceof AbstractScalarNode):
				const scalarNode = <AbstractScalarNode> node;
				const type = (typeof scalarNode.value === 'string' && scalarNode.value !== 'null()'  ? 'string:' : '');
				const value = (scalarNode.value === null || scalarNode.value === 'null()'
					? 'null()'
					: this.encodeRql(scalarNode.value));
				result = `${scalarNode.name}(${this.encodeRql(scalarNode.field)},${type}${value})`;
				break;

			case (node instanceof AbstractArrayNode):
				const arrayNode = <AbstractArrayNode> node;
				const encodedValues = arrayNode.values.map((value) => {
					return this.encodeRql(value);
				});
				result = `${arrayNode.name}(${this.encodeRql(arrayNode.field)},(${encodedValues.join(',')}))`;
				break;
		}
		return result;
	}

	protected static addUnion(queryString: string): string {
		return (queryString !== '' && queryString.substr(-1) !== '&') ? '&' : '';
	}
}
