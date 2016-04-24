import assert from 'power-assert';
import { schema } from './schema';
import { graphql } from 'graphql';

describe('post_schema', () => {
  it('works', () => {
    let query = `
      {
        post {
          id,
          comments {
            text
          }
        }
      }
    `;

    return graphql(schema, query).then(result => {
      let post = result.data.post;
      assert(post.comments.length === 3);
      assert(post.comments[0].text === 'a');
    });
  });
});
