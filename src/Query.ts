import Select            from './nodes/Select';
import Sort              from './nodes/Sort';
import Limit             from './nodes/Limit';
import AbstractQueryNode from './nodes/AbstractQueryNode';
import GroupBy           from './nodes/GroupBy';

export default class Query {

	protected _selectNode;
	protected _sortNode;
	protected _limitNode;
	protected _queryNode;
	protected _groupNode;

	constructor(
		props: {
			select?: Select,
			sort?: Sort,
			limit?: Limit,
			query?: AbstractQueryNode,
			group?: GroupBy
		}) {
		this._groupNode = props.group;
		this._selectNode = props.select;
		this._sortNode = props.sort;
		this._limitNode = props.limit;
		this._queryNode = props.query;
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
}
