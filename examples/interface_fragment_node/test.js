import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('interface_fragment_node', () => {
  it('should be return error', () => {
    let query = `
      {
        node(id: "comment:1") {
          id, text
        }
      }
    `;

    return graphql(schema, query).then(result => {
      assert(result.errors[0].message === 'Cannot query field "text" on type "Node". However, this field exists on "Comment". Perhaps you meant to use an inline fragment?');
    });
  });

  it('should be return data', () => {
    let query = `
      {
        node1: node(id: "comment:1") {
          id,
          ... on Comment { text }
        }
        node2: node(id: "post:1") {
          id,
          ... on Post { title }
        }
        node3: node(id: "post:2") {
          ... on Comment { text }
        }
      }
    `;

    return graphql(schema, query).then(result => {
      assert.deepEqual(result.data, {
        node1: { id: '1', text: 'hoge' },
        node2: { id: '1', title: 'foo' },
        node3: {},
      });
    });
  });

  it('should be return data', () => {
    let query = `
      {
        node1: node(id: "comment:1") {
          id,
          ...comment
        }
        node2: node(id: "post:1") {
          id,
          ...post
        }
        node3: node(id: "post:2") {
          ...comment
        }
      }
      fragment comment on Comment { text }
      fragment post on Post { title }
    `;

    return graphql(schema, query).then(result => {
      assert.deepEqual(result.data, {
        node1: { id: '1', text: 'hoge' },
        node2: { id: '1', title: 'foo' },
        node3: {},
      });
    });
  });
});
