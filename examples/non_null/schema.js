import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';

let resolver = {
  str() {},
  list1() {},
  list2() {},
  list3() {},
};

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    str: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => resolver.str(),
    },
    list1: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      resolve: () => resolver.list1(),
    },
    list2: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
      resolve: () => resolver.list2(),
    },
    list3: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      resolve: () => resolver.list3(),
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema, resolver };
