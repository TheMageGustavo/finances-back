//import { origin, playground, secret } from './config'

const { GraphQLServer } = require('graphql-yoga')
const Binding = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')

const {  endpoint, origin, playground, secret } = require('./config')
const resolvers = require('./resolvers')

console.log('endpoint ', endpoint)
console.log('origin ', origin)
console.log('playground ', playground)
console.log('secret ', secret)

/* const env = process.env
const endpoint = `${env.PRISMA_ENDPOINT}/${env.PRISMA_SERVICE}/${env.PRISMA_STAGE}`
 */
const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers,
  context: request => ({
    ...request,
      db: new Binding.Prisma({
        typeDefs:`${__dirname}/generated/graphql-schema/prisma.graphql`,
        endpoint,
        secret
        //secret: env.PRISMA_SERVICE_SECRET
    }),
    prisma
  })
})

server.start({
  playground,
  cors: {
    origin
  },port: 4000
}).then(() => console.log('Server running on http://localhost:4000'))