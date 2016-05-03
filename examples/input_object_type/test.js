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
});
