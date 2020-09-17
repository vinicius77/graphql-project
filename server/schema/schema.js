const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLError,
} = graphql;

/** ----------------------------------
 *
 *             BOOK SCHEMA
 *
 *------------------------------------ */
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    published: { type: GraphQLInt },
    author: { type: GraphQLString },
    //genres: { type: GraphQLString },
    authorBook: {
      type: AuthorType,
      async resolve(parent, args) {
        try {
          return await Author.findOne({ name: parent.author });
        } catch (error) {
          return new GraphQLError(error);
        }
      },
    },
  }),
});

/** ------------------------------------
 *
 *          AUTHOR SCHEMA
 *
 * ------------------------------------- */
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    born: { type: GraphQLInt },
    name: { type: GraphQLString },
    id: { type: GraphQLID },
    book: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        return await Book.find({ author: parent.name });
      },
    },
  }),
});

/** ------------------------------------
 *
 *              ROOT QUERY
 *
 * -------------------------------------*/
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { title: { type: GraphQLString } },
      async resolve(parent, args) {
        try {
          return await Book.findOne({ title: args.title });
        } catch (error) {
          return new GraphQLError(error);
        }
      },
    },
    author: {
      type: AuthorType,
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        try {
          return await Author.findOne({ name: args.name });
        } catch (error) {
          return new GraphQLError(error);
        }
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        try {
          return await Book.find();
        } catch (error) {
          return new GraphQLError(error);
        }
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        try {
          return await Author.find();
        } catch (error) {
          return new GraphQLError(error);
        }
      },
    },
  },
});

/** ------------------------
 *
 *          MUTATIONS
 *
 * -------------------------- * */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        born: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        // This is the MongoDB Schema
        let author_ = new Author({
          name: args.name,
          born: args.born,
        });

        try {
          return await author_.save();
        } catch (error) {
          return new GraphQLError(error);
        }
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        published: { type: GraphQLInt },
        author: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // This is the MongoDB Schema
        let book_ = new Book({
          title: args.title,
          published: args.published,
          author: args.author,
        });

        try {
          return await book_.save();
        } catch (error) {
          return new GraphQLError(error);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
