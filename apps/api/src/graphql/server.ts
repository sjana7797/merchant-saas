import type {
  Server,
  ServerRequest,
  ServerStatusRequest,
  ServerStatusResponse,
} from "@/graphql/types";
import { ServerService } from "@/utils/server-health";
import { httpStatusCodes, Logger } from "@merchant/api-config";
import { db } from "@merchant/db";
import { eq } from "@merchant/db/lib";
import { servers } from "@merchant/db/schema/servers";

export async function getServers(): Promise<Server[]> {
  Logger.info({
    message: "Fetching servers",
    statusCode: httpStatusCodes.CONTINUE,
  });
  const serversResults = await db.select().from(servers);

  Logger.info({
    message: "Received servers",
    statusCode: httpStatusCodes.OK,
    details: serversResults,
  });

  return serversResults;
}

export async function addServer(
  serverRequest: ServerRequest
): Promise<Server | null> {
  const { server } = serverRequest;

  try {
    const serverResult = await db.insert(servers).values(server).returning();

    if (!serverResult.length) {
      throw new Error("Failed to Add Server");
    }

    return serverResult.at(0)!;
  } catch (error) {
    Logger.error({
      message: "Failed to Add Server",
      statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
      details: error,
    });
    return null;
  }
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
