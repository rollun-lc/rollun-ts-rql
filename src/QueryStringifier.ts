import Query from "./Query";
import SelectNode from "./Nodes/SelectNode";
import LimitNode from "./Nodes/LimitNode";
import SortNode from "./Nodes/SortNode";
import AbstractNode from "./Nodes/AbstractNode";
import AbstractLogicalNode from "./Nodes/LogicalNodes/AbstractLogicalNode";
import AbstractArrayNode from "./Nodes/ArrayNodes/AbstractArrayNode";
import AbstractScalarNode from "./Nodes/ScalarNodes/AbstractScalarNode";

export default class QueryStringifier {
    static stringify(query: Query): string {
        const result = Object.entries(query).reduce(
            (accumulator, item) => {
                const [key, node] = item;
                accumulator += this.parseTopLevelNode(key, node);
                return accumulator + this.addUnion(accumulator)
            },
            '');

        return (result.substr(-1) === '&')
            ? result.substring(0, result.length - 1)
            : result;
    }

    protected static parseTopLevelNode(key: string, node: AbstractNode) {
        const methodName = `parse${key[0].toUpperCase()}${key.slice(1)}`;
        return this[methodName](node);
    }

    protected static parseSelectNode(node?: SelectNode): string {
        return node ? `select(${node.fields.join(',')})` : '';
    }

    protected static parseSortNode(node?: SortNode): string {
        let result;
        if (node) {
            result = Object.entries(node.sortOptions).reduce((accumulator, currentItem) => {
                const [field, direction] = currentItem;
                const parsedDirection = (direction === 1) ? '+' : '-';
                accumulator += `${parsedDirection}${field}`;
                return accumulator;
            }, 'sort(');
            result += ')';
        }
        else {
            result = ''
        }
        return result;
    }

    protected static parseLimitNode(node?: LimitNode): string {
        return node ? `limit(${node.limit},${node.offset})` : '';
    }

    protected static parseConditionNode(node?: AbstractNode): string {
        let result = '';
        switch (true) {

            case (node instanceof AbstractLogicalNode):
                const logicalNode = <AbstractLogicalNode>node;
                const nodeName = logicalNode.name;
                result += logicalNode.subNodes.reduce((accumulator, currentItem) => {
                    return accumulator + `${this.parseConditionNode(currentItem)},`;
                }, result);
                result = (result.substr(-1) === ',') ? result.substring(0, result.length - 1) : result;
                result = `${nodeName}(${result})`;
                break;

            case (node instanceof AbstractScalarNode):
                const scalarNode = <AbstractScalarNode>node;
                result = `${scalarNode.name}(${scalarNode.field},${scalarNode.value})`;
                break;

            case (node instanceof AbstractArrayNode):
                const arrayNode = <AbstractArrayNode>node;
                result = `${arrayNode.name}(${arrayNode.values.join(',')})`;
                break;
        }
        return result;
    }

    protected static addUnion(queryString: string): string {
        return (queryString !== '' && queryString.substr(-1) !== '&') ? '&' : '';
    }
}


