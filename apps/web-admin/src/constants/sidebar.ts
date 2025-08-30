import type { SidebarMenuItem } from "@/types/sidebar";
import { CHAT_SUPPORT_ROUTE, SERVERS_ROUTE } from "./routes";
import { ChartPie, MessageSquareText, Server } from "lucide-react";

export const menus: SidebarMenuItem[] = [
  {
    title: "Servers Health",
    url: SERVERS_ROUTE,
    icon: Server,
    key: "servers",
  },
  {
    title: "Sales & Marketing",
    url: "#",
    icon: ChartPie,
    key: "sales",
  },
  {
    title: "Chat & Support",
    url: CHAT_SUPPORT_ROUTE,
    icon: MessageSquareText,
    key: "chat-support",
  },
];
