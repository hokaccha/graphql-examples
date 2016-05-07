import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('directive', () => {
  let query = `
  query($a: Boolean!, $b: Boolean!) {
    foo @skip(if: $a)
    bar @include(if: $b)
  }
  `;

  it('works', () => {
    return graphql(schema, query, null, null, { a: false, b: true }).then(result => {
      assert(result.data.foo === 'foo');
      assert(result.data.bar === 'bar');
    });
  });

  it('works', () => {
    return graphql(schema, query, null, null, { a: true, b: true }).then(result => {
      assert(result.data.foo === undefined);
      assert(result.data.bar === 'bar');
    });
  });

  it('works', () => {
    return graphql(schema, query, null, null, { a: false, b: false }).then(result => {
      assert(result.data.foo === 'foo');
      assert(result.data.bar === undefined);
    });
  });
});
