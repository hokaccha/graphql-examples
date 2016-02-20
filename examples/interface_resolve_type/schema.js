import {
  GraphQLInterfaceType,
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';

let ArticleInterface = new GraphQLInterfaceType({
  name: 'Article',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolveType(obj) {
    /*eslint-disable no-use-before-define */
    if (obj.type === 'blog') {
      return BlogType;
    }
    else if (obj.type === 'news') {
      return NewsType;
    }
    /*eslint-enable no-use-before-define */
  }
});

let BlogType = new GraphQLObjectType({
  name: 'Blog',
  interfaces: [ArticleInterface],
  fields: {
    id: { type: GraphQLID },
    title: {
      type: GraphQLString,
      resolve: obj => `[blog] ${obj.title}`,
    },
    body: { type: GraphQLString },
  },
});

let NewsType = new GraphQLObjectType({
  name: 'News',
  interfaces: [ArticleInterface],
  fields: {
    id: { type: GraphQLID },
    title: {
      type: GraphQLString,
      resolve: obj => `[news] ${obj.title}`,
    },
    body: { type: GraphQLString },
  },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    articles: {
      type: new GraphQLList(ArticleInterface),
      resolve: () => {
        return [
          { id: 1, title: 'foo', type: 'news' },
          { id: 2, title: 'bar', type: 'blog' },
          { id: 3, title: 'baz', type: 'news' },
        ];
      },
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
