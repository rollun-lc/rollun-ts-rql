import AbstractNode        from './nodes/AbstractNode';
import AbstractQueryNode   from './nodes/AbstractQueryNode';
import Query               from './Query';
import Limit               from './nodes/Limit';
import Sort                from './nodes/Sort';
import Select              from './nodes/Select';
import And                 from './nodes/logicalNodes/And';
import AbstractLogicalNode from './nodes/logicalNodes/AbstractLogicalNode';
import GroupBy             from './nodes/GroupBy';

export default class QueryBuilder {

	protected query: Query;

	constructor() {
		this.query = new Query({});
	}

	addNode(node: AbstractNode) {
		if (node instanceof Select) {
			return this.addSelect(node);
		}
		if (node instanceof AbstractQueryNode) {
			return this.addQuery(node);
		}
		if (node instanceof Sort) {
			return this.addSort(node);
		}
		if (node instanceof Limit) {
			return this.addLimit(node);
		}
		if (node instanceof GroupBy) {
			return this.addGroupBy(node);
		}
		throw new Error(`Unknown node "${node.name}"`, );
	}

	getQuery() {
		return this.query;
	}

	addSelect(select: Select) {
		this.query.selectNode = select;
		return this;
	}

	addQuery(query: AbstractQueryNode) {
		const current = this.query.queryNode;
		if (!current) {
			this.query.queryNode = query;
		} else {
			if (current instanceof AbstractLogicalNode) {
				current.addNode(query);
			} else {
				this.query.queryNode = new And([current, query]);
			}
		}
		return this;
	}

	addSort(sort: Sort) {
		this.query.sortNode = sort;
		return this;
	}

	addLimit(limit: Limit) {
		this.query.limitNode = limit;
		return this;
	}

	addGroupBy(node: GroupBy) {
		this.query.groupNode = node;
		return this;
	}
}
