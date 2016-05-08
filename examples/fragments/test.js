import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('hello world', () => {
  it('works', () => {
    let query = `
    { ...a }
    fragment a on Query { obj { ...b } }
    fragment b on Obj { foo, bar }
    `;

    return graphql(schema, query).then(result => {
      assert.deepEqual(result.data.obj, { foo: 'foo', bar: 'bar' });
    });
  });

  it('works', () => {
    let query = `
    {
      ... on Query {
        obj {
          ... on Obj {
            foo
            bar
          }
        }
      }
    }
    `;

    return graphql(schema, query).then(result => {
      assert.deepEqual(result.data.obj, { foo: 'foo', bar: 'bar' });
    });
  });
});
