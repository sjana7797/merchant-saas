const typeDefs = `
  type Product {
    id: String!
    name: String!
    description: String
    slug: String
    orgId: String!
  }

  type Server {
    id: String!
    name: String!
    description: String
    healthUrl: String!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: String!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type GetUsersResponse {
    users: [User]
    totalCount: Int!
    page: Int!
    nextCursor: Int
  }

  type GetServerHealthReponse {
    message:String
  }

  input AddServerInput {
  name: String!
  healthUrl: String!
  description: String
  }

  type Query {
    getProduct(productId: String!): Product
    getServers: [Server]
    getServerHealth(serverId:String!):GetServerHealthReponse
    getUsers(limit: Int, page: Int): GetUsersResponse
    getUser(userId: String!): User
    getCustomers(limit: Int, page: Int ,orgId: String!): GetUsersResponse
    getCustomer(userId: String!, orgId: String!): User
  }

  type Mutation{
   addServer(server:AddServerInput): Server
  }
`;
