import assert from 'power-assert';
import sinon from 'sinon';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('resolve', () => {
  it('args', () => {
    let spy = sinon.spy(schema._queryType._fields.echo, 'resolve');
    let query = '{ echo(id: 1, num: 2) { id } }';

    return graphql(schema, query).then(() => {
      let args = spy.args[0][1];
      assert(args.id === '1'); // ID type is converted to string
      assert(args.num === 2);
      spy.restore();
    });
  });

  it('convert return value types', () => {
    let retValue = { id: 1, num: '2' };
    let stub = sinon.stub(schema._queryType._fields.echo, 'resolve').returns(retValue);
    let query = '{ echo { id, num } }';

    return graphql(schema, query).then(result => {
      assert(result.data.echo.id === '1'); // ID type is converted to string
      assert(result.data.echo.num === 2);  // Int type is converted to number
      stub.restore();
    });
  });

  it('returns error when dosent return non-nullable field', () => {
    let retValue = {};
    let stub = sinon.stub(schema._queryType._fields.echo, 'resolve').returns(retValue);
    let query = '{ echo { id } }';
    return graphql(schema, query).then(result => {
      assert(result.errors[0].message === 'Cannot return null for non-nullable field Example.id.');
      stub.restore();
    });
  });

  it('returns null when dosent return nullable field', () => {
    let retValue = {};
    let stub = sinon.stub(schema._queryType._fields.echo, 'resolve').returns(retValue);
    let query = '{ echo { num } }';
    return graphql(schema, query).then(result => {
      assert(result.data.echo.num === null);
      stub.restore();
    });
  });
});
