import Select               from './nodes/Select';
import Sort                 from './nodes/Sort';
import Limit                from './nodes/Limit';
import AbstractQueryNode    from './nodes/AbstractQueryNode';
import GroupBy              from './nodes/GroupBy';
import { QueryStringifier } from './index';

type QueryProps = {
	select?: Select,
	sort?: Sort,
	limit?: Limit,
	query?: AbstractQueryNode,
	group?: GroupBy
};

export default class Query {

	protected _selectNode;
	protected _sortNode;
	protected _limitNode;
	protected _queryNode;
	protected _groupNode;

	constructor(props: QueryProps = {}) {
		this._groupNode  = props.group;
		this._selectNode = props.select;
		this._sortNode   = props.sort;
		this._limitNode  = props.limit;
		this._queryNode  = props.query;
	}

	setQuery(q: AbstractQueryNode) {
		this._queryNode = q;
		return this;
	}

	setSelect(s: Select) {
		this._selectNode = s;
		return this;
	}

	setSort(s: Sort) {
		this._sortNode = s;
		return this;
	}

	setLimit(l: Limit) {
		this._limitNode = l;
		return this;
	}

	setGroupBy(g: GroupBy) {
		this._groupNode = g;
		return this;
	}

	getNextLimit(initLimit = 100, initOffset = 0) {
		if (!this._limitNode) {
			return this.setLimit(new Limit(initLimit, initOffset));
		}
		this._limitNode.next();
		return this;
	}

	get selectNode() {
		return this._selectNode;
	}

	set selectNode(value) {
		this._selectNode = value;
	}

	get sortNode() {
		return this._sortNode;
	}

	set sortNode(value) {
		this._sortNode = value;
	}

	get limitNode() {
		return this._limitNode;
	}

	set limitNode(value) {
		this._limitNode = value;
	}

	get queryNode() {
		return this._queryNode;
	}

	set queryNode(value) {
		this._queryNode = value;
	}

	get groupNode() {
		return this._groupNode;
	}

	set groupNode(value) {
		this._groupNode = value;
	}

	toString(): string {
		return QueryStringifier.stringify(this);
	}
}
