import type { SidebarMenuItem } from "@/types/sidebar";
import { MENUS } from "./routes";
import {
  ChartPie,
  MessageSquareText,
  Server,
  Settings,
  Settings2,
} from "lucide-react";

export const menus: SidebarMenuItem[] = [
  {
    title: "Servers Health",
    url: MENUS.SERVERS_ROUTE,
    icon: Server,
    key: "servers",
  },
  {
    title: "Sales & Marketing",
    url: MENUS.SALES_MARKETING_ROUTE,
    icon: ChartPie,
    key: "sales",
  },
  {
    title: "Chat & Support",
    url: MENUS.CHAT_SUPPORT_ROUTE,
    icon: MessageSquareText,
    key: "chat-support",
  },
  {
    title: "Settings",
    url: MENUS.SETTINGS,
    icon: Settings,
    key: "settings",
  },
];
