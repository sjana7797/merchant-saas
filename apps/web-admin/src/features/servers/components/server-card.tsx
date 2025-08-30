"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@merchant/ui/components/card";
import { Server } from "../types";
import { RefreshCcw, Loader2, ServerIcon } from "lucide-react";
import { api } from "../api";
import Render from "@merchant/ui/components/render";
import { Button } from "@merchant/ui/components/button";
import { cn } from "@merchant/ui/lib/utils";

type Props = {
  server: Server;
};

function ServerCard({ server }: Props) {
  const { loading, refetch, status } = api.useGetServerStatus(server.id);
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {server.name}
        </CardTitle>
        <div className="text-blue-600 flex items-center gap-2">
          <ServerIcon />
          <Button
            size="icon"
            variant="secondary"
            onClick={() => refetch()}
            disabled={loading}
          >
            <RefreshCcw className={cn("size-4", loading && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Render condition={loading}>
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            <p className="text-muted-foreground">Loading</p>
          </div>
        </Render>
        <Render condition={!loading}>
          <div className="flex justify-between gap-x-2">
            <div className="text-2xl font-semibold">
              {status ? "✅UP" : "❌DOWN"}
            </div>
          </div>
          <p className="text-muted-foreground">
            {status ? "All good" : "Something went wrong"}
          </p>
        </Render>
      </CardContent>
    </Card>
  );
}

export default ServerCard;
