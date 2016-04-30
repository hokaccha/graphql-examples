import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    echo: {
      type: GraphQLString,
      args: {
        str: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => args.str,
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
