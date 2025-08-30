"use client";

import { Button } from "@merchant/ui/components/button";
import { api } from "../api";
import ServerCard from "./server-card";

function ServerList() {
  const { data } = api.useGetServers();

  return (
    <section className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between md:flex-row gap-2">
        <h1 className="text-2xl font-bold">Servers</h1>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm">
            Refresh Servers
          </Button>
          <Button size="sm">Add Server</Button>
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
