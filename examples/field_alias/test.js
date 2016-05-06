import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('field alias', () => {
  it('works', () => {
    let query = '{ foo1: foo, foo2: foo, foo }';

    return graphql(schema, query).then(result => {
      assert(result.data.foo1 === 'foo');
      assert(result.data.foo2 === 'foo');
      assert(result.data.foo === 'foo');
    });
  });

  it('works', () => {
    let query = '{ bar1: bar(a: "x"), bar2: bar(a: "y") }';

    return graphql(schema, query).then(result => {
      assert(result.data.bar1 === 'x');
      assert(result.data.bar2 === 'y');
    });
  });

  it('works', () => {
    let query = '{ foo1: foo, foo1: foo }';

    return graphql(schema, query).then(result => {
      assert(result.data.foo1 === 'foo');
    });
  });

  it('error', () => {
    let query = '{ foo1: foo, foo1: bar(a: "x") }';

    return graphql(schema, query).then(result => {
      assert(result.errors[0].message === 'Fields "foo1" conflict because foo and bar are different fields.');
    });
  });

  it('error', () => {
    let query = '{ bar1: bar(a: "x"), bar1: bar(a: "y") }';

    return graphql(schema, query).then(result => {
      assert(result.errors[0].message === 'Fields "bar1" conflict because they have differing arguments.');
    });
  });
});
