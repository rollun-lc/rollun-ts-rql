import Select from './nodes/Select';
import Sort from './nodes/Sort';
import Limit from './nodes/Limit';
import AbstractQueryNode from './nodes/AbstractQueryNode';

export default class Query {

	protected _selectNode;
	protected _sortNode;
	protected _limitNode;
	protected _queryNode;

	constructor(
		props: {
			select?: Select,
			sort?: Sort,
			limit?: Limit,
			query?: AbstractQueryNode
		}) {
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
}
