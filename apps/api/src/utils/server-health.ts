import { Server } from "@/graphql/types";
import { servers } from "./client";

export interface ServerHealth {
  getHealth: () => Promise<boolean>;
}

export class GRPCHealth implements ServerHealth {
  constructor(private port: number) {}

  async getHealth() {
    const client = servers[this.port as keyof typeof servers];

    return new Promise<boolean>((resolve) => {
      client.getHealth({}, (err, response) => {
        const status = !err && response?.message === "OK";
        console.log(`Health check for port ${this.port}:`, status);
        resolve(status);
      });
    });
  }
}

export class RestHealth implements ServerHealth {
  constructor(private url: string) {}
  async getHealth() {
    const response = await fetch(this.url);

    return response.ok;
  }
}

export class ServerService {
  server: ServerHealth;
  constructor(server: Server) {
    switch (server.type) {
      case "grpc":
        this.server = new GRPCHealth(server.port);
        break;
      case "rest":
        this.server = new RestHealth(this.urlBuilder(server));
        break;
      default:
        this.server = new RestHealth(this.urlBuilder(server));
    }
  }

  private urlBuilder(server: Server): string {
    return `http://${server.host}:${server.port}/health`;
  }

  async getHealth() {
    return await this.server.getHealth();
  }
}
