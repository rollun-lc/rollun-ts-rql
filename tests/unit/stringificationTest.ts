import intern from 'intern';
import QueryStringifier from '../../src/QueryStringifier';
import Query from '../../src/Query';
import Select from '../../src/nodes/Select';
import Sort from '../../src/nodes/Sort';
import Limit from '../../src/nodes/Limit';
import In from '../../src/nodes/arrayNodes/In';
import Out from '../../src/nodes/arrayNodes/Out';
import And from '../../src/nodes/logicalNodes/And';
import Or from '../../src/nodes/logicalNodes/Or';
import Not from '../../src/nodes/logicalNodes/Not';
import Alike from '../../src/nodes/scalarNodes/Alike';
import Eq from '../../src/nodes/scalarNodes/Eq';
import Ge from '../../src/nodes/scalarNodes/Ge';
import Gt from '../../src/nodes/scalarNodes/Gt';
import Le from '../../src/nodes/scalarNodes/Le';
import Like from '../../src/nodes/scalarNodes/Like';
import Lt from '../../src/nodes/scalarNodes/Lt';
import Ne from '../../src/nodes/scalarNodes/Ne';

const {suite, test} = intern.getPlugin('interface.tdd');
const {assert} = intern.getPlugin('chai');

const dataProvider = [
    {
        queryObject: new Query({
            select: new Select([
                'id', 'name', 'data', 'age'
            ]),
            sort: new Sort({age: -1}),
            limit: new Limit(10, 0),
            condition: new And([
                new Or([
                    new Eq('name', 'Bob'),
                    new Eq('name', 'Jeff'),]),
                new And([
                    new Le('age', 23),
                    new Ge('age', 55),
                ]),
            ])
        }),
        expectedString: 'select(id,name,data,age)&sort(-age)&limit(10,0)&and(or(eq(name,Bob),eq(name,Jeff)),and(le(age,23),ge(age,55)))',
        message: 'first query'
    },
    {
        queryObject: new Query({
            select: new Select(['id', 'name', 'age']),
            condition: new And([
                    new And([
                        new In('name', ['Alfred', 'Ivan', 'Jared']),
                        new Out('id', [12335, 16725]),
                    ]),
                    new Or([
                        new Like('name', 'er'),
                        new Alike('name', 'aZa'),
                    ]),
            ]),
            limit: new Limit(13, 100),
        }),
        expectedString: 'select(id,name,age)&limit(13,100)&and(and(in(name,(Alfred,Ivan,Jared)),out(id,(12335,16725))),or(like(name,er),alike(name,aZa)))',
        message: 'second query'
    },
    {
        queryObject: new Query({
            condition: new Not([
                new Or([
                    new Gt('age',33),
                    new Lt('age',100),
                    new Ne('id',1823457234985)
                ])
            ])
        }),
        expectedString: 'not(or(gt(age,33),lt(age,100),ne(id,1823457234985)))',
        message: 'third query'
    },
    {
        queryObject: new Query({
            limit: new Limit(20, 20)
        }),
        expectedString: 'limit(20,20)',
        message: 'fourth query'
    },
];

suite('Stringification', () => {
    test('query to string', () => {
        dataProvider.forEach((entry) => {
            const {queryObject, expectedString, message} = entry;
            const actualString = QueryStringifier.stringify(queryObject);
            assert.equal(actualString, expectedString, message);
        })
    });
});
