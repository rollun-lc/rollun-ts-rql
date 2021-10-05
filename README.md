![Coverage badge](https://img.shields.io/badge/Coverage%20Statements-91.42%25-green.svg)
![Coverage badge](https://img.shields.io/badge/Coverage%20Lines-91.25%25-green.svg)
![Coverage badge](https://img.shields.io/badge/Coverage%20Functions-78.98%25-orange.svg)
![Coverage badge](https://img.shields.io/badge/Coverage%20Branches-82.49%25-green.svg)

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

## Basic usage
```typescript
import { QueryStringifier } from 'rollun-ts-rql';
import { Query } from 'rollun-ts-rql';
import { Select } from 'rollun-ts-rql';
import { And } from 'rollun-ts-rql';
import { Eq } from 'rollun-ts-rql';
import { Ge } from 'rollun-ts-rql';

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
import { QueryStringifier } from 'rollun-ts-rql';

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

## Contributing

Before contributing to this lib, make sure you have correct node.js version. It is specified in `.nvmrc` file

You can use [NVM](https://github.com/nvm-sh/nvm) to manage node versions.

For example, run following command to automatically use correct node version:

```shell
nvm use
```
