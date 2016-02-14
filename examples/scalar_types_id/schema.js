import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let ExampleType = new GraphQLObjectType({
  name: 'Example',
  fields: { id: { type: GraphQLID } },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    echo: {
      type: ExampleType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => args,
    }
  }
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
