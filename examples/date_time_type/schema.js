import assert from 'assert';
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

let ExampleType = new GraphQLObjectType({
  name: 'Example',
  fields: { created: { type: DateTimeType } },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    example: {
      type: ExampleType,
      args: { date: { type: DateTimeType } },
      resolve: (_, args) => {
        // Dateで渡ってくる
        assert(args.date instanceof Date);

        // Dateとして何か処理して

        // Dateで返す
        return { created: args.date };
      },
    }
  }
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
