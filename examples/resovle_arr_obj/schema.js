import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';

let ObjType = new GraphQLObjectType({
  name: 'Obj',
  fields: {
    x: { type: GraphQLString },
  },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    arr: {
      type: new GraphQLList(ObjType),
      resolve: () => [{ x: '1x' }, { x: '2x' }],
    },
    obj: {
      type: ObjType,
      resolve: () => ({ x: 'x' }),
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
