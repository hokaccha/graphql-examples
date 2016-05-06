import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    foo: {
      type: GraphQLString,
      resolve: () => 'foo',
    },
    bar: {
      type: GraphQLString,
      args: {
        a: { type: GraphQLString },
      },
      resolve: (_, args) => args.a,
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
