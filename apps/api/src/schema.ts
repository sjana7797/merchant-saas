import { makeExecutableSchema } from "@graphql-tools/schema";
import { EcomServiceClient } from "@merchant/proto/ecom";
import * as grpc from "@grpc/grpc-js";

const ecomClient = new EcomServiceClient(
  "localhost:50052",
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

  type Query {
    getProduct(productId: String!): Product
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
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
