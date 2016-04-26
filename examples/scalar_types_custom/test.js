import assert from 'power-assert';
import sinon from 'sinon';
import { graphql, GraphQLError } from 'graphql';
import { schema, DateTimeType } from './schema';

describe('scalar-types-custom', () => {
  it('initial behavior', () => {
    graphql(schema, '{ user(date: "2015-01-01 10:00:00") { created } }').then(result => {
      assert(result.data.user.created === '2015-01-01T10:00:00.000Z');
    });
  });

  describe('DateTimeType#serialize', () => {
    it('serialize argument is a resolved value', () => {
      let resolvedValue = new Date();
      let serialize = sinon.spy(DateTimeType._scalarConfig, 'serialize');
      let resolve = sinon.stub(schema._queryType._fields.user, 'resolve').returns({ created: resolvedValue });

      return graphql(schema, '{ user(date: "2015-01-01 10:00:00") { created } }').then(() => {
        assert(serialize.args[0][0] === resolvedValue);
        serialize.restore();
        resolve.restore();
      });
    });

    it('response data will be a serialized value', () => {
      let serializedValue = '2015/10/10';
      let serialize = sinon.stub(DateTimeType._scalarConfig, 'serialize').returns(serializedValue);

      return graphql(schema, '{ user(date: "2015-01-01 10:00:00") { created } }').then(result => {
        assert(result.data.user.created === serializedValue);
        serialize.restore();
      });
    });

    it('response data will be null when serialize returns null', () => {
      let serialize = sinon.stub(DateTimeType._scalarConfig, 'serialize').returns(null);

      return graphql(schema, '{ user(date: "2015-01-01 10:00:00") { created } }').then(result => {
        assert(result.data.user.created === null);
        serialize.restore();
      });
    });
  });

  describe('DateTimeType#parseLiteral', () => {
    it('parseLiteral receives argument from input query', () => {
      let inputValue = '2015-01-01 10:00:00';
      let parseLiteral = sinon.spy(DateTimeType._scalarConfig, 'parseLiteral');

      return graphql(schema, `{ user(date: "${inputValue}") { created } }`).then(() => {
        assert(parseLiteral.args[0][0].value === inputValue);
        parseLiteral.restore();
      });
    });

    it('resolve recieves argument from parseLiteral', () => {
      let parsedValue = new Date();
      let parseLiteral = sinon.stub(DateTimeType._scalarConfig, 'parseLiteral').returns(parsedValue);
      let resolve = sinon.spy(schema._queryType._fields.user, 'resolve');

      return graphql(schema, `{ user(date: "xxx") { created } }`).then(() => {
        assert(resolve.args[0][1].date === parsedValue);
        parseLiteral.restore();
        resolve.restore();
      });
    });

    it('response will be error when parseLiteral returns null', () => {
      let parseLiteral = sinon.stub(DateTimeType._scalarConfig, 'parseLiteral').returns(null);

      return graphql(schema, `{ user(date: "xxx") { created } }`).then(result => {
        let errMsg = 'Argument "date" has invalid value "xxx".\n' +
                     'Expected type "DateTime", found "xxx".';

        assert(result.errors[0].message === errMsg);
        parseLiteral.restore();
      });
    });

    it('response will be error when parseLiteral returns GraphQlError', () => {
      let parseLiteral = sinon.stub(DateTimeType._scalarConfig, 'parseLiteral', ast => {
        return new GraphQLError(`Query Error: "${ast.value}" is invalid date`, [ast]);
      });

      return graphql(schema, `{ user(date: "xxx") { created } }`).then(result => {
        assert(result.errors[0].message === 'Query Error: "xxx" is invalid date');
        parseLiteral.restore();
      });
    });
  });

  describe('DateTimeType#parseValue', () => {
    let query = 'query foo($d: DateTime) { user(date: $d) { created } }';

    it('parseValue receives argument from input variable', () => {
      let inputValue = new Date().toString();
      let variables = { d: inputValue };
      let parseValue = sinon.spy(DateTimeType._scalarConfig, 'parseValue');

      return graphql(schema, query, null, null, variables).then(() => {
        assert(parseValue.args[0][0] === inputValue);
        parseValue.restore();
      });
    });

    it('resolve recieves argument from parseValue', () => {
      let parsedValue = new Date();
      let parseValue = sinon.stub(DateTimeType._scalarConfig, 'parseValue').returns(parsedValue);
      let resolve = sinon.spy(schema._queryType._fields.user, 'resolve');

      return graphql(schema, query, null, null, { d: "xxx" }).then(() => {
        assert(resolve.args[0][1].date === parsedValue);
        parseValue.restore();
        resolve.restore();
      });
    });

    it('response will be error when parseValue returns null', () => {
      let parseValue = sinon.stub(DateTimeType._scalarConfig, 'parseValue').returns(null);

      return graphql(schema, query, null, null, { d: "xxx" }).then(result => {
        let errMsg = 'Variable "$d" got invalid value "xxx".\n' +
                     'Expected type "DateTime", found "xxx".';

        assert(result.errors[0].message === errMsg);
        parseValue.restore();
      });
    });

    it('response will be error when parseValue returns GraphQlError', () => {
      let parseValue = sinon.stub(DateTimeType._scalarConfig, 'parseValue', value => {
        return new GraphQLError(`Query Error: "${value}" is invalid date`);
      });

      return graphql(schema, query, null, null, { d: "xxx" }).then(result => {
        assert(result.errors[0].message === 'Query Error: "xxx" is invalid date');
        parseValue.restore();
      });
    });
  });
});
