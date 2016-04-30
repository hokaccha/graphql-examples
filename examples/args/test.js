import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('args', () => {
  it('works', () => {
    let query = '{ echo(str: "foo") }';

    return graphql(schema, query).then(result => {
      assert(result.data.echo === 'foo');
    });
  });

  it('works', () => {
    let query = 'query q($s: String!) { echo(str: $s) }';

    return graphql(schema, query, null, null, { s: 1 }).then(result => {
      assert(result.data.echo === '1');
    });
  });

  it('should be error', () => {
    let query = '{ echo(str: 1) }';

    return graphql(schema, query).then(result => {
      let msg = 'Argument "str" has invalid value 1.\nExpected type "String", found 1.';
      assert(result.errors[0].message === msg);
    });
  });

  it('should be error', () => {
    let query = '{ echo }';

    return graphql(schema, query).then(result => {
      let msg = 'Field "echo" argument "str" of type "String!" is required but not provided.';
      assert(result.errors[0].message === msg);
    });
  });
});
