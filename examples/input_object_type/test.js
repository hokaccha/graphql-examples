import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('input_object_type', () => {
  it('works', () => {
    let query = '{ echo(foo: { bar: { baz: "x" } }) }';

    return graphql(schema, query).then(result => {
      assert(result.data.echo === 'x');
    });
  });

  it('works', () => {
    let query = 'query q($x: String) { echo(foo: { bar: { baz: $x } }) }';

    return graphql(schema, query, null, null, { x: 1 }).then(result => {
      assert(result.data.echo === '1');
    });
  });

  it('works', () => {
    let query = 'query q($x: String) { echo(foo: { bar: { baz: $x } }) }';

    return graphql(schema, query, null, null, { x: { y: 'z' } }).then(result => {
      assert(result.data.echo === '[object Object]');
    });
  });
});
