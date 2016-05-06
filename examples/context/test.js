import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('context', () => {
  it('works', () => {
    return graphql(schema, '{ echo }', null, { foo: 'bar' }).then(result => {
      assert(result.data.echo === 'bar');
    });
  });
});
