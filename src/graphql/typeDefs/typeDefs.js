const {
  gql
} = require('apollo-server-express')

const typeDefs = gql`

type Query {
 getUsuarios: [Usuarios]
 getUsuario(id: Int!): Usuarios
 holaMundo: String
 login(correo: String!, contrasenia: String!, key: Float!): Usuarios
}

type Mutation {
  createusuario(input: usuarioInput!): Usuarios
}

type Usuarios{
 id: Int
 nombre: String
 apellidos: String
 telefono: String
 email: String
 password: String
 tipo: Int
}



input usuarioInput {
    nombre: String
    apellidos: String
    telefono: String
    email: String
    password: String
    tipo: Int
}

`

module.exports = typeDefs