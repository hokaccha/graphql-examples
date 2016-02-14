import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} from 'graphql';

let ExampleType = new GraphQLObjectType({
  name: 'Example',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    num: { type: GraphQLInt },
  },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    echo: {
      type: ExampleType,
      args: {
        id: { type: GraphQLID },
        num: { type: GraphQLInt },
      },
      resolve: (_, args) => args,
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
