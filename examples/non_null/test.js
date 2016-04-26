import assert from 'power-assert';
import sinon from 'sinon';
import { schema, resolver } from './schema';
import { graphql } from 'graphql';

describe('non_null', () => {
  describe('str field', () => {
    let query = '{ str }';

    afterEach(() => {
      resolver.str.restore();
    });

    context('when resolved by null', () => {
      beforeEach(() => sinon.stub(resolver, 'str', () => null));

      it('should return error', () => {
        return graphql(schema, query).then(result => {
          let error = result.errors[0];
          assert(error.constructor === Error);
          assert(error.message === 'Cannot return null for non-nullable field Query.str.');
        });
      });
    });

    context('when resolved by non-null', () => {
      beforeEach(() => sinon.stub(resolver, 'str', () => 'str!'));

      it('should return data', () => {
        return graphql(schema, query).then(result => {
          assert(result.data.str === 'str!');
        });
      });
    });
  });

  describe('list1 field (`[String]!`)', () => {
    let query = '{ list1 }';

    afterEach(() => {
      resolver.list1.restore();
    });

    context('when resolved by null', () => {
      beforeEach(() => sinon.stub(resolver, 'list1', () => null));

      it('should return error', () => {
        return graphql(schema, query).then(result => {
          let error = result.errors[0];
          assert(error.constructor === Error);
          assert(error.message === 'Cannot return null for non-nullable field Query.list1.');
        });
      });
    });

    context('when resolved by empty array', () => {
      beforeEach(() => sinon.stub(resolver, 'list1', () => []));

      it('should return data', () => {
        return graphql(schema, query).then(result => {
          assert.deepStrictEqual(result.data.list1, []);
        });
      });
    });

    context('when resolved by array included null', () => {
      beforeEach(() => sinon.stub(resolver, 'list1', () => ['foo', null]));

      it('should return data', () => {
        return graphql(schema, query).then(result => {
          assert.deepStrictEqual(result.data.list1, ['foo', null]);
        });
      });
    });
  });

  describe('list2 field (`[String!]`)', () => {
    let query = '{ list2 }';

    afterEach(() => {
      resolver.list2.restore();
    });

    context('when resolved by null', () => {
      beforeEach(() => sinon.stub(resolver, 'list2', () => null));

      it('should return data', () => {
        return graphql(schema, query).then(result => {
          assert.deepStrictEqual(result.data.list2, null);
        });
      });
    });

    context('when resolved by empty array', () => {
      beforeEach(() => sinon.stub(resolver, 'list2', () => []));

      it('should return data', () => {
        return graphql(schema, query).then(result => {
          assert.deepStrictEqual(result.data.list2, []);
        });
      });
    });

    context('when resolved by array included null', () => {
      beforeEach(() => sinon.stub(resolver, 'list2', () => ['foo', null]));

      it('should return error', () => {
        return graphql(schema, query).then(result => {
          let error = result.errors[0];
          assert(error.constructor === Error);
          assert(error.message === 'Cannot return null for non-nullable field Query.list2.');
        });
      });
    });
  });

  describe('list3 field (`[String!]!`)', () => {
    let query = '{ list3 }';

    afterEach(() => {
      resolver.list3.restore();
    });

    context('when resolved by null', () => {
      beforeEach(() => sinon.stub(resolver, 'list3', () => null));

      it('should return error', () => {
        return graphql(schema, query).then(result => {
          let error = result.errors[0];
          assert(error.constructor === Error);
          assert(error.message === 'Cannot return null for non-nullable field Query.list3.');
        });
      });
    });

    context('when resolved by empty array', () => {
      beforeEach(() => sinon.stub(resolver, 'list3', () => []));

      it('should return data', () => {
        return graphql(schema, query).then(result => {
          assert.deepStrictEqual(result.data.list3, []);
        });
      });
    });

    context('when resolved by array included null', () => {
      beforeEach(() => sinon.stub(resolver, 'list3', () => ['foo', null]));

      it('should return error', () => {
        return graphql(schema, query).then(result => {
          let error = result.errors[0];
          assert(error.constructor === Error);
          assert(error.message === 'Cannot return null for non-nullable field Query.list3.');
        });
      });
    });
  });
});
