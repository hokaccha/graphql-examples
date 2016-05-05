import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('variable', () => {
  it('works', () => {
    return graphql(schema, 'query q($x: String!) { echo(foo: $x) }', null, null, { x: 'y' }).then(result => {
      assert(result.data.echo === 'y');
    });
  });
});
