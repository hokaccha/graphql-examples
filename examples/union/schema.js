import {
  GraphQLString,
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let FooType = new GraphQLObjectType({
  name: 'Foo',
  fields: {
    x: {
      type: GraphQLString,
      resolve: () => 'foo',
    },
  },
});

let BarType = new GraphQLObjectType({
  name: 'Bar',
  fields: {
    x: {
      type: GraphQLString,
      resolve: () => 'bar',
    },
  },
});

let FooOrBarType = new GraphQLUnionType({
  name: 'FooOrBar',
  types: [FooType, BarType],
  resolveType: (value) => {
    if (value.type === 'FooType') {
      return FooType;
    }
    if (value.type === 'BarType') {
      return BarType;
    }
  },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    union: {
      type: FooOrBarType,
      args: {
        t: { type: GraphQLString },
      },
      resolve: (_, args) => ({ type: args.t }),
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
