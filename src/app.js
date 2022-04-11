const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')
const models = require('./sequelize/models/index');
import resolvers from './graphql/resolvers/resolvers'
import typeDefs from './graphql/typeDefs/typeDefs'
//Conexion con la BD
models.sequelize.authenticate().then(() => {
    console.log("Conectado a la BD")
})
models.sequelize.sync()

//Graphql

let server = null;

async function startServer() {
    server = new ApolloServer({
        typeDefs,
        resolvers,
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
}, () => console.log("http://localhost:4000" + server.graphqlPath))