import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/graphql-client";
import { Server } from "@merchant/db/types";
import { useState } from "react";
import { AddServerSchema } from "@merchant/validators/forms";
import {
  ADD_SERVER_MUTATION,
  GET_SERVER_HEALTH_QUERY,
  GET_SERVERS_QUERY,
} from "./gql";

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
      const data = await client.request<{
        getServerHealth: {
          status: boolean;
        };
      }>(GET_SERVER_HEALTH_QUERY(id));

      setStatus(data.getServerHealth.status);
    },
    refetchInterval: false,
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
      try {
        const { hostname, port } = new URL(server.url);
        const data = await client.request<{
          addServer: Server | null;
        }>(
          ADD_SERVER_MUTATION({
            name: server.name,
            host: hostname,
            port: Number(port),
            type: server.type,
            description: server.description,
          })
        );

        return data.addServer;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
};

export const api = {
  useGetServers,
  useGetServerStatus,
  useAddServer,
} as const;
