import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/graphql-client";
import { gql } from "graphql-request";
import { Server } from "../types";
import { useState } from "react";

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
        const data = await fetch("http://localhost:5000/server/status/" + id);
        setStatus(data.ok);
      } catch (error) {
        setStatus(false);
      }
    },
  });

  return {
    status,
    refetch,
    loading: isLoading || isRefetching,
  };
};

export const api = {
  useGetServers,
  useGetServerStatus,
} as const;
