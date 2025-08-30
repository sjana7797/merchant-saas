import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/graphql-client";
import { gql } from "graphql-request";
import { Server } from "../types";
import { useState } from "react";
import { AddServerSchema } from "@merchant/validators/forms";

const GET_SERVERS_QUERY = gql`
  query GetServers {
    getServers {
      id
      name
      description
      healthUrl
      createdAt
      updatedAt
    }
  }
`;

const ADD_SERVER_MUTATION = (server: AddServerSchema) => gql`
  mutation AddServer {
    addServer(server: { name: "${server.name}", healthUrl: "${server.healthUrl}", description: "${server.description}" }) {
      id
      name
      description
      healthUrl
      createdAt
      updatedAt
    }
  }
`;

const useGetServers = () => {
  return useQuery({
    queryKey: ["getServers"],
    queryFn: async () => {
      const data = await client.request<{
        getServers: Server[] | null;
      }>(GET_SERVERS_QUERY);
      return data.getServers;
    },
  });
};

const useGetServerStatus = (id: string) => {
  const [status, setStatus] = useState(false);

  const { refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["status", id],
    queryFn: async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/server/status/" + id
        );
        const data = await response.json();

        cons;
      } catch (error) {
        setStatus(false);
      }
    },
    refetchInterval: 10 * 60 * 1000,
  });

  return {
    status,
    refetch,
    loading: isLoading || isRefetching,
  };
};

const useAddServer = () => {
  return useMutation({
    mutationFn: async (server: AddServerSchema) => {
      console.log(server);
      const data = await client.request<{
        addServer: Server | null;
      }>(ADD_SERVER_MUTATION(server));

      return data.addServer;
    },
  });
};

export const api = {
  useGetServers,
  useGetServerStatus,
  useAddServer,
} as const;
