import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} from 'graphql';

let CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    text: { type: GraphQLString },
  },
});

let PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: (post) => {
        return post.comments.slice(0, 3);
      },
    },
  },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: PostType,
      resolve: () => {
        return {
          id: 1,
          title: 'foo',
          body: 'bar',
          comments: [
            { text: 'a' },
            { text: 'b' },
            { text: 'c' },
            { text: 'd' },
            { text: 'e' },
          ],
        };
      },
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
