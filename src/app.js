const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')
const models = require('./sequelize/models/index');

const path = require("path");
import { mergeResolvers, mergeTypeDefs, makeExecutableSchema, loadFilesSync } from 'graphql-tools';


const typesArr = loadFilesSync(path.join(__dirname, "./graphql/typeDefs/"), {
    extensions: ['graphql', 'gql']
});
const resolversArr = loadFilesSync(path.join(__dirname, "./graphql/resolvers"), {
    extensions: ['js']
});

const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs(typesArr),
    resolvers: mergeResolvers(resolversArr),
});


//Conexion con la BD
models.sequelize.authenticate().then(() => {
    console.log("Conectado a la BD")
})
models.sequelize.sync()

//Graphql

let server = null;

async function startServer() {
    server = new ApolloServer({
        schema,
        context: {
            models
        }
    })

    await server.start();
    server.applyMiddleware({
        app
    });
}

startServer();
const app = express();


app.listen({
    port: 4000
}, () => console.log("http://localhost:4000/graphql"))