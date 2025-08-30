import { makeExecutableSchema } from "@graphql-tools/schema";
import { EcomServiceClient } from "@merchant/proto/ecom";
import * as grpc from "@grpc/grpc-js";
import { db } from "@merchant/db";
import { servers } from "@merchant/db/schema/servers";
import { UserServiceClient } from "@merchant/proto/user";

const ecomClient = new EcomServiceClient(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

const userClient = new UserServiceClient(
  "localhost:50053",
  grpc.credentials.createInsecure()
);

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

  type Query {
    getProduct(productId: String!): Product
    getServers: [Server]
    getUsers(limit: Int, page: Int): GetUsersResponse
    getUser(userId: String!): User
    getCustomers(limit: Int, page: Int ,orgId: String!): GetUsersResponse
    getCustomer(userId: String!, orgId: String!): User
    
  }
`;

const resolvers = {
  Query: {
    getProduct: async (_: any, { productId }: { productId: string }) => {
      return new Promise((resolve, reject) => {
        ecomClient.getProduct({ productId }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            console.log("Response:", response, err);
            resolve(response);
          }
        });
      });
    },
    getServers: async () => {
      const serversResults = await db.select().from(servers);
      console.log("Servers:", serversResults);

      return serversResults;
    },
    async getUsers(
      _: any,
      {
        limit,
        page,
      }: {
        limit?: number;
        page?: number;
      }
    ) {
      return new Promise((resolve, reject) => {
        userClient.getUsers(
          { limit: limit ?? 10, page: page ?? 1 },
          (err, response) => {
            if (err) {
              reject(err);
            } else {
              console.log("Response:", response, err);
              resolve(response);
            }
          }
        );
      });
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
