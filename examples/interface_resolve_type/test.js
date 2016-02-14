import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('interface_resolve_type', () => {
  it('should be resolved data type', () => {
    let query = '{ articles { id, title } }';

    return graphql(schema, query).then(result => {
      assert.deepEqual(result.data.articles, [
        { id: '1', title: '[news] foo' },
        { id: '2', title: '[blog] bar' },
        { id: '3', title: '[news] baz' },
      ]);
    });
  });
});
