var graphql = require('graphql');
var GraphQLError = graphql.GraphQLError;

var e = new GraphQLError('foo');
console.log(e instanceof GraphQLError);
