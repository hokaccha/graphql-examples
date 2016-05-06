import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    echo: {
      type: GraphQLString,
      resolve: (_, args, context) => context.foo,
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
