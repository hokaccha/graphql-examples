import {
  GraphQLInterfaceType,
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  graphql,
} from 'graphql';

let objects = {
  post: {
    1: { type: 'post', id: 1, title: 'foo', body: 'foo foo' },
    2: { type: 'post', id: 2, title: 'bar', body: 'bar bar' },
    3: { type: 'post', id: 3, title: 'baz', body: 'baz baz' },
  },
  comment: {
    1: { type: 'comment', id: 1, text: 'hoge' },
    2: { type: 'comment', id: 2, text: 'fuga' },
    3: { type: 'comment', id: 3, text: 'piyo' },
  },
};

let NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: { type: GraphQLID },
  },
  resolveType(obj) {
    if (obj.type === 'post') {
      return PostType;
    }
    else if (obj.type === 'comment') {
      return CommentType;
    }
  }
});

let PostType = new GraphQLObjectType({
  name: 'Post',
  interfaces: [NodeInterface],
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  isTypeOf: obj => obj.type === 'post',
});

let CommentType = new GraphQLObjectType({
  name: 'Comment',
  interfaces: [NodeInterface],
  fields: {
    id: { type: GraphQLID },
    text: { type: GraphQLString },
  },
  isTypeOf: obj => obj.type === 'comment',
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: {
      type: NodeInterface,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        // args.id will be 'comment:1'
        let parsedId = args.id.split(':');
        let type = parsedId[0];
        let id = parsedId[1];
        return objects[type][id];
      },
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
