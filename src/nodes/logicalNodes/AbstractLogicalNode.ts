import AbstractQueryNode from '../AbstractQueryNode';

export default abstract class AbstractLogicalNode extends AbstractQueryNode {
	protected _subNodes;

	constructor(subNodes?: AbstractQueryNode[]) {
		super();
		this._subNodes = subNodes || [];
	}

	get subNodes(): AbstractQueryNode[] {
		return this._subNodes;
	}

	set subNodes(subNodes: AbstractQueryNode[]) {
		this._subNodes = subNodes;
	}

	addNode(node: AbstractQueryNode) {
		return this.addNodeAt(node, this._subNodes.length);
	}

	addNodeAt(node: AbstractQueryNode | Array<AbstractQueryNode>, at: number) {
		const n        = Array.isArray(node) ? node : [ node ];
		this._subNodes.splice(at, 0, ...n);
		return this;
	}

	removeNode(index: number) {
		this._subNodes.splice(index, 1);
		return this;
	}
}
