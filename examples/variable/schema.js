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
      args: {
        foo: { type: GraphQLString },
      },
      resolve: (_, args) => args.foo,
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
