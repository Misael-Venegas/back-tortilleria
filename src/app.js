const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')
const models = require('./sequelize/models/index');
const jwt = require("jsonwebtoken");


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
        cors: true,
        context: ({ req }) => {

            // Éstos serían alcanzables sin necesidad de que inicie sesión...
            if ( req.body.query && (req.body.query.match("login") || req.body.query.match("recuperarContranhia")) ) {
              return {
                models,
              };
            }
        
            // Todos los demás resolvers solo se alcanzarán si el usuario está autenticado
            const authorizationHeader = req.headers["authorization"] || "";
        
            const token =
              authorizationHeader.indexOf(" ") >= 0
                ? authorizationHeader.split(" ")[1]
                : authorizationHeader;
        
            if (token) {
              try {
                  console.log(token);
                  console.log("--------------------------------------------------");
                const usuario = jwt.verify(token, 'QlkshioASLKÑJDaa234#4klhjas');
        
                return {
                  models,
                  usuario,
                };
              } catch (err) {
                  console.log(err)
                throw new Error("Token de autenticacion invalido");
              }
            } else {
                throw new Error("Se requiere token de autenticacion");
            }
          },
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