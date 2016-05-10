import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('union', () => {
  it('works', () => {
    let query = `
    {
      union(t: "BarType") {
        ... on Foo { x }
        ... on Bar { x }
      }
    }
    `;

    return graphql(schema, query).then(result => {
      assert(result.data.union.x === 'bar');
    });
  });

  it('errors', () => {
    let query = `
    {
      union(t: "FooType") {
        x
      }
    }
    `;

    return graphql(schema, query).then(result => {
      assert(result.errors[0].message === 'Cannot query field "x" on type "FooOrBar". However, this field exists on "Bar", "Foo". Perhaps you meant to use an inline fragment?');
    });
  });
});
