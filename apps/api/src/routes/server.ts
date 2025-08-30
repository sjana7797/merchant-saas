import type {
  Server,
  ServerRequest,
  ServerStatusRequest,
  ServerStatusResponse,
} from "@/graphql/types";
import { ServerService } from "@/utils/server-health";
import { db } from "@merchant/db";
import { eq } from "@merchant/db/lib";
import { servers } from "@merchant/db/schema/servers";

export async function getServers(): Promise<Server[]> {
  const serversResults = await db.select().from(servers);

  return serversResults;
}

export async function addServer(serverRequest: ServerRequest): Promise<Server> {
  const { server } = serverRequest;
  return new Promise(async (resolve, reject) => {
    try {
      const serverResult = await db.insert(servers).values(server).returning();

      if (!serverResult.length) {
        reject("Failed to Add Server");
      }

      resolve(serverResult.at(0)!);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export const getServerHealth = async (
  server: ServerStatusRequest
): Promise<ServerStatusResponse> => {
  const { id } = server;

  const serverResults = await db
    .select()
    .from(servers)
    .where(eq(servers.id, id))
    .limit(1);

  const serverData = serverResults.at(0)!;

  const status = await new ServerService(serverData).getHealth();

  return {
    status,
  };
};
