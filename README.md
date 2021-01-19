![Coverage badge](https://img.shields.io/badge/Coverage%20Statements-12.9%25-red.svg)
![Coverage badge](https://img.shields.io/badge/Coverage%20Lines-13.42%25-red.svg)
![Coverage badge](https://img.shields.io/badge/Coverage%20Functions-10.6%25-red.svg)
![Coverage badge](https://img.shields.io/badge/Coverage%20Branches-11.08%25-red.svg)

# rollun-ts-rql
RQL library written in Typescript.
This library contains:
* Set of objects that represent RQL nodes
* Stringifier that converts object tree into RQL string
## Installation
preferred way to install this library is via npm.
Run
```
npm install rollun-ts-rql
```

or add
```
"rollun-ts-rql": "*",
```
to the dependencies section of your package.json
## Basic usage
```typescript
import QueryStringifier from 'rollun-ts-rql/dist';
import Query from 'rollun-ts-rql/dist';
import Select from 'rollun-ts-rql/dist';
import And from 'rollun-ts-rql/dist';
import Eq from 'rollun-ts-rql/dist';
import Ge from 'rollun-ts-rql/dist';

const query = new Query({
    select: new Select(['id', 'name', 'age', 'city']),
    query: new And([
        new Eq('name', 'John'),
        new Ge('age', 18)
    ])
});
const rqlString = QueryStringifier.stringify(query);
console.log(rqlString);
//output: select(id,name,age,city)&and(eq(name,John),ge(age,18))
```

## Nodes
Scalar nodes:
* eq - new Eq(&lt;field>,&lt;value>)
* ne - new Ne(&lt;field>,&lt;value>)
* lt - new Lt(&lt;field>,&lt;value>)
* gt - new Gt(&lt;field>,&lt;value>)
* le - new Le(&lt;field>,&lt;value>)
* ge - new Ge(&lt;field>,&lt;value>)
* like - new Like(&lt;field>,&lt;value>)
* alike - new Alike(&lt;field>,&lt;value>)

Array Nodes
* in - new In(&lt;field>,&lt;array of values>)
* out - new Out(&lt;field>,&lt;array of values>)

Logic operators
* and - new And(&lt;array of nodes>)
* or - new Or(&lt;array of nodes>)
* not - new Not(&lt;array of nodes>)

## Query to string
QueryStringifier exposes static method `stringify`, that takes a node
and returns a string representation of that node
```typescript
const rqlString = QueryStringifier.stringify(
    new Query({
        query: new And([
            new Eq('status', 'active'),
            new Eq('age', 33)
        ])
    })
);
console.log(rqlString);
//output: and(eq(status,active),eq(age,33))
```
