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
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
