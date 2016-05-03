import {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let FooInputType = new GraphQLInputObjectType({
  name: 'FooInput',
  fields: {
    bar: {
      type: new GraphQLInputObjectType({
        name: 'BarInput',
        fields: {
          baz: { type: GraphQLString },
        },
      }),
    },
  },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    echo: {
      type: GraphQLString,
      args: {
        foo: { type: FooInputType },
      },
      resolve: (_, args) => args.foo.bar.baz,
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
