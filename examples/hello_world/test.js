import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('hello world', () => {
  it('works', () => {
    let query = '{ hello }';

    return graphql(schema, query).then(result => {
      assert(result.data.hello === 'world');
    });
  });
});
