import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('scalar-types-id', () => {
  it('argument: 1', () => {
    return graphql(schema, '{ echo(id: 1) { id } }').then(result => {
      assert(result.data.echo.id === '1');
    });
  });

  it('argument: "1"', () => {
    return graphql(schema, '{ echo(id: "1") { id } }').then(result => {
      assert(result.data.echo.id === '1');
    });
  });

  it('argument: "foo"', () => {
    return graphql(schema, '{ echo(id: "foo") { id } }').then(result => {
      assert(result.data.echo.id === 'foo');
    });
  });

  it('argument: foo', () => {
    return graphql(schema, '{ echo(id: foo) { id } }').then(result => {
      let errMsg = 'Argument "id" has invalid value foo.\nExpected type "ID", found foo.';
      assert(result.errors[0].message === errMsg);
    });
  });

  it('variable: 1', () => {
    let query = 'query foo($_id: ID) { echo(id: $_id) { id } }';
    let variables = { _id: 1 };

    return graphql(schema, query, null, null, variables).then(result => {
      let echo = result.data.echo;
      assert(echo.id === '1'); // ID type is converted to string
    });
  });

  it('variable: {}', () => {
    let query = 'query foo($_id: ID) { echo(id: $_id) { id } }';
    let variables = { _id: {} };

    return graphql(schema, query, null, null, variables).then(result => {
      assert(result.data.echo.id === '[object Object]');
    });
  });
});
