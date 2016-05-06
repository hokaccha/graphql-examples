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
      resolve: () => 'query-foo',
    },
    bar: {
      type: GraphQLString,
      resolve: () => 'query-bar',
    },
  },
});

let MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    foo: {
      type: GraphQLString,
      resolve: () => 'mutation-foo',
    },
    bar: {
      type: GraphQLString,
      resolve: () => 'mutation-bar',
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

export { schema };
