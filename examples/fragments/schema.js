import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

let ObjType = new GraphQLObjectType({
  name: 'Obj',
  fields: {
    foo: {
      type: GraphQLString,
      resolve: () => 'foo',
    },
    bar: {
      type: GraphQLString,
      resolve: () => 'bar',
    },
    baz: {
      type: GraphQLString,
      resolve: () => 'baz',
    },
  },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    obj: {
      type: ObjType,
      resolve: () => '{}',
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
