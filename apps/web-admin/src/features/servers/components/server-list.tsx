"use client";

import { Button, buttonVariants } from "@merchant/ui/components/button";
import { api } from "../api";
import ServerCard from "./server-card";
import AddServerForm from "./add-server-form";
import { Loader2 } from "lucide-react";
import { cn } from "@merchant/ui/lib/utils";
import Render from "@merchant/ui/components/render";

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
      <ul className="grid auto-rows-min gap-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
        {data?.map((server) => (
          <ServerCard server={server} key={server.id} />
        ))}
      </ul>
    </section>
  );
}

export default ServerList;
