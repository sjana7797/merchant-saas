import { health } from "./health";
import { server } from "./server";

export const routes = [health, server] as const;
