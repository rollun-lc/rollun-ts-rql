import Query from "./Query";
import SelectNode from "./Nodes/SelectNode";
import LimitNode from "./Nodes/LimitNode";
import SortNode from "./Nodes/SortNode";
import AbstractNode from "./Nodes/AbstractNode";
import AbstractLogicalNode from "./Nodes/LogicalNodes/AbstractLogicalNode";
import AbstractArrayNode from "./Nodes/ArrayNodes/AbstractArrayNode";
import AbstractScalarNode from "./Nodes/ScalarNodes/AbstractScalarNode";

function addUnion(queryString: string): string {
    return (queryString !== '' && queryString.substr(-1) !== '&') ? '&' : '';
}

function parseSelectNode(node?: SelectNode): string {
    return node ? `select(${node.fields.join(',')})` : '';
}

function parseSortNode(node?: SortNode): string {
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

function parseLimitNode(node?: LimitNode): string {
    return node ? `limit(${node.limit},${node.offset})` : '';
}

function parseConditionsNode(node?: AbstractNode): string {
    let result = '';
    switch (true) {

        case (node instanceof AbstractLogicalNode):
            const logicalNode = <AbstractLogicalNode>node;
            const nodeName = logicalNode.name;
            result += logicalNode.subNodes.reduce((accumulator, currentItem) => {
                return accumulator + `${parseConditionsNode(currentItem)},`;
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

export default function serialize(query: Query): string {
    let queryString = '';
    queryString += parseSelectNode(query.getSelectNode());
    queryString += addUnion(queryString);
    queryString += parseSortNode(query.getSortNode());
    queryString += addUnion(queryString);
    queryString += parseLimitNode(query.getLimitNode());
    queryString += addUnion(queryString);
    queryString += parseConditionsNode(query.getConditionsNode());
    return (queryString.substr(-1) === '&') ? queryString.substring(0, queryString.length - 1) : queryString;
}

