import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('DateTimeType', () => {
  it('returns date time as string', () => {
    let query = `
    query foo($d: DateTime) {
      example(date: $d) { created }
    }
    `;
    let variables = { d: "2015-01-01T00:00:00Z" };

    return graphql(schema, query, null, null, variables).then(result => {
      assert.deepEqual(result, { data: { example: { created: '2015-01-01T00:00:00.000Z' } } });
    });
  });
});
