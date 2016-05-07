import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('hello world', () => {
  it('works', () => {
    let query = `
    { ...A }
    fragment A on Query { foo, bar }
    `;

    return graphql(schema, query).then(result => {
      assert.deepEqual(result.data, { foo: 'foo', bar: 'bar' });
    });
  });
});
