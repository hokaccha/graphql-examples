import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('hello world', () => {
  it('works', () => {
    let query = '{ colorEnum(fromEnum: green) }';

    return graphql(schema, query).then(result => {
      assert(result.data.colorEnum === 'green');
    });
  });

  it('works', () => {
    let query = '{ colorEnum(fromInt: 1) }';

    return graphql(schema, query).then(result => {
      assert(result.data.colorEnum === 'green');
    });
  });

  it('works', () => {
    let query = '{ colorEnum(fromString: "green") }';

    return graphql(schema, query).then(result => {
      assert(result.data.colorEnum === null);
    });
  });

  it('works', () => {
    let query = '{ colorEnum(fromString: "blue!") }';

    return graphql(schema, query).then(result => {
      assert(result.data.colorEnum === 'blue');
    });
  });
});
