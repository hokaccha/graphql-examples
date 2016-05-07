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
      resolve: () => 'bar',
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
