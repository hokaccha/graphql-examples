import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('hello world', () => {
  it('works', () => {
    let query = '{ arr { x }, obj { x } }';

    return graphql(schema, query).then(result => {
      assert.deepEqual(result.data, {
        arr: [
          { x: '1x' },
          { x: '2x' },
        ],
        obj: { x: 'x' },
      });
    });
  });
});
