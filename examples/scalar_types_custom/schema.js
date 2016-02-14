import {
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import { Kind } from 'graphql/language';

let parseDate = (str) => {
  let d = new Date(str);
  return Number.isNaN(d.getTime()) ? null : d;
};

let DateTimeType = new GraphQLScalarType({
  name: 'DateTime',
  serialize: value => {
    return value.toJSON();
  },
  parseValue: value => {
    return parseDate(value);
  },
  parseLiteral: ast => {
    return ast.kind === Kind.STRING ? parseDate(ast.value) : null;
  },
});

let UserType = new GraphQLObjectType({
  name: 'User',
  fields: { created: { type: DateTimeType } },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { date: { type: DateTimeType } },
      resolve: (_, args) => ({ created: args.date }),
    }
  }
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema, DateTimeType };
