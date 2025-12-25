const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// let notes = [
//   {
//     id: '1',
//     content: 'This is a note',
//     author: 'Adam Scott'
//   },
//   {
//     id: '2',
//     content: 'This is another note',
//     author: 'Harlow Everly'
//   },
//   {
//     id: '3',
//     content: 'Oh hey look, another note!',
//     author: 'Riley Harrison'
//   }
// ];

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String
    notes: [Note]
    note(id: ID!): Note
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',

    // ⬇️ [수정 전] 원래 이렇게 되어 있던 줄을...
    // notes: () => notes,

    // ⬇️ [수정 후] 이렇게 바꿔주세요! (여기에 붙여넣기)
    notes: async () => {
      return await models.Note.find();
    },

    // (note: ... 부분은 일단 그대로 두셔도 됩니다)
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott'
      });
    }
  }
};

const app = express();

console.log('👀 DB_HOST 값 확인:', DB_HOST);

db.connect(DB_HOST);

//아폴로 서버 설정
const server = new ApolloServer({ typeDefs, resolvers });

// 아폴로 그래프QL 미들웨어를 적용하고 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
