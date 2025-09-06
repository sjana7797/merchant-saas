"use client";

import { Button } from "@merchant/ui/components/button";
import { api } from "../api";
import ServerCard from "./server-card";
import AddServerForm from "./add-server-form";
import { Loader2 } from "lucide-react";
import Render from "@merchant/ui/components/render";
import Loading from "@merchant/ui/illustrations/loading";
import EmptyData from "@merchant/ui/illustrations/empty-data";

function ServerList() {
  const { data, refetch, isFetching, isLoading } = api.useGetServers();

  return (
    <section className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between md:flex-row gap-2">
        <h1 className="text-2xl font-bold">Servers</h1>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
          >
            <Render condition={isFetching || isLoading}>
              <Loader2 className="animate-spin size-4" />
            </Render>
            Refresh Servers
          </Button>
          <AddServerForm />
        </div>
      </div>
      <Render condition={isLoading}>
        <Loading className="w-full max-w-2xl mx-auto p-4" />
      </Render>
      <Render condition={!isLoading && !data?.length}>
        <EmptyData className="w-full max-w-sm mx-auto p-4 my-5" />
      </Render>
      <Render condition={!isLoading && !!data?.length}>
        <ul className="grid auto-rows-min gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
          {data?.map((server) => (
            <ServerCard server={server} key={server.id} />
          ))}
        </ul>
      </Render>
    </section>
  );
}

export default ServerList;
