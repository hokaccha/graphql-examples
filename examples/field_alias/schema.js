import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world',
    },
    echo: {
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
