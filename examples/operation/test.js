import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('multiple queries', () => {
  let query = `
    query a { foo }
    query b { bar }
    mutation c { foo }
    mutation e { bar }
  `;

  it('works', () => {
    return graphql(schema, query, null, null, null, 'a').then(result => {
      assert(result.data.foo === 'query-foo');
    });
  });

  it('works', () => {
    return graphql(schema, query, null, null, null, 'b').then(result => {
      assert(result.data.bar === 'query-bar');
    });
  });

  it('works', () => {
    return graphql(schema, query, null, null, null, 'c').then(result => {
      assert(result.data.foo === 'mutation-foo');
    });
  });

  it('works', () => {
    return graphql(schema, query, null, null, null, 'e').then(result => {
      assert(result.data.bar === 'mutation-bar');
    });
  });

  it('works', () => {
    return graphql(schema, '{ foo }').then(result => {
      assert(result.data.foo === 'query-foo');
    });
  });

  it('works', () => {
    return graphql(schema, 'mutation { foo }').then(result => {
      assert(result.data.foo === 'mutation-foo');
    });
  });

  it('should be error', () => {
    return graphql(schema, 'query a { foo } mutation b { foo }').then(result => {
      assert(result.errors[0].message === 'Must provide operation name if query contains multiple operations.');
    });
  });

  it('should be error', () => {
    return graphql(schema, 'query a { foo }', null, null, null, 'b').then(result => {
      assert(result.errors[0].message === 'Unknown operation named "b".');
    });
  });
});
