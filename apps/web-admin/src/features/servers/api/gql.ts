import { ServerInsert } from "@merchant/db/types";
import { gql } from "graphql-request";

export const GET_SERVERS_QUERY = gql`
  query GetServerHealth {
    getServers {
      id
      name
      description
      host
      port
      type
      createdAt
      updatedAt
    }
  }
`;

export const GET_SERVER_HEALTH_QUERY = (id: string) => gql`
  query GetServerHealth {
    getServerHealth(server: { id: "${id}" }) {
      status
    }
  }
`;

export const ADD_SERVER_MUTATION = (server: ServerInsert) => gql`
  mutation AddServer {
    addServer(
      serverRequest: {
        server: {
          name: "${server.name}"
          description: "${server.description}"
          host: "${server.host}"
          port: ${server.port}
          type: ${server.type}
        }
      }
    ) {
      id
      name
      description
      host
      port
      type
      createdAt
      updatedAt
    }
  }
`;
