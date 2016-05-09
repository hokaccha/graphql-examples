import assert from 'power-assert';
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} from 'graphql';

let ColorType = new GraphQLEnumType({
  name: 'Color',
  values: {
    red: { value: 0 },
    green: { value: 1 },
    blue: { value: 'blue!' },
  },
});

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    colorEnum: {
      type: ColorType,
      args: {
        fromEnum: { type: ColorType },
        fromInt: { type: GraphQLInt },
        fromString: { type: GraphQLString },
      },
      resolve(value, { fromEnum, fromInt, fromString }) {
        if (fromEnum) {
          assert(fromEnum === 1);
        }

        if (fromInt) {
          assert(fromInt === 1);
        }

        if (fromInt !== undefined) return fromInt;
        if (fromString !== undefined) return fromString;
        return fromEnum;
      },
    },
    colorInt: {
      type: GraphQLInt,
      args: {
        fromEnum: { type: ColorType },
        fromInt: { type: GraphQLInt },
      },
      resolve(value, { fromEnum, fromInt }) {
        return fromInt !== undefined ? fromInt : fromEnum;
      },
    },
  },
});

let schema = new GraphQLSchema({ query: QueryType });

export { schema };
