import AbstractQueryNode from '../AbstractQueryNode';
import AbstractNode from '../AbstractNode';

export default abstract class AbstractLogicalNode extends AbstractQueryNode {
	protected _subNodes;

	constructor(subNodes: AbstractQueryNode[]) {
		super();
		this._subNodes = subNodes;
	}

	get subNodes() {
		return this._subNodes;
	}

	set subNodes(subNodes: AbstractQueryNode[]) {
		this._subNodes = subNodes;
	}

	addNode(node: AbstractQueryNode) {
		this._subNodes.push(node);
	}

	removeNode(index: number) {
		this._subNodes.splice(index, 1);
	}
}
