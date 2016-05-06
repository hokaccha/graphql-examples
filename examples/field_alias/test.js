import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('hello world', () => {
  it('works', () => {
    let query = '{ foo: hello, bar: hello }';

    return graphql(schema, query).then(result => {
      assert(result.data.foo === 'world');
      assert(result.data.bar === 'world');
    });
  });

  it('works', () => {
    let query = '{ foo: echo(a: "x"), bar: echo(a: "y") }';

    return graphql(schema, query).then(result => {
      assert(result.data.foo === 'x');
      assert(result.data.bar === 'y');
    });
  });

  it('works', () => {
    let query = '{ foo: hello, foo: hello }';

    return graphql(schema, query).then(result => {
      assert(result.data.foo === 'world');
    });
  });

  it('error', () => {
    let query = '{ foo: hello, foo: echo(a: "x") }';

    return graphql(schema, query).then(result => {
      assert(result.errors[0].message === 'Fields "foo" conflict because hello and echo are different fields.');
    });
  });

  it('error', () => {
    let query = '{ foo: echo(a: "x"), foo: echo(a: "y") }';

    return graphql(schema, query).then(result => {
      assert(result.errors[0].message === 'Fields "foo" conflict because they have differing arguments.');
    });
  });
});
