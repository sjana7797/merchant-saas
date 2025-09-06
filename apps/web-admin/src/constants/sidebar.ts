import type { NavMain, SidebarMenuItem } from "@/types/sidebar";
import {
  BookOpen,
  Building,
  ChartPie,
  MessageSquareText,
  Server,
  Settings,
  Settings2,
  User2,
} from "lucide-react";

export const menus: SidebarMenuItem[] = [
  {
    title: "Servers Health",
    url: "/servers",
    icon: Server,
    key: "servers",
  },
  {
    title: "Sales & Marketing",
    url: "/sales&marketing",
    icon: ChartPie,
    key: "sales",
  },
  {
    title: "Chat & Support",
    url: "/chat-support",
    icon: MessageSquareText,
    key: "chat-support",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    key: "settings",
  },
];

export const navMain: NavMain[] = [
  {
    title: "Users",
    url: "/",
    icon: User2,
    items: [
      {
        title: "All Users",
        url: "#",
      },
      {
        title: "Add User",
        url: "#",
      },
    ],
  },
  {
    title: "Organizations",
    url: "#",
    icon: Building,
    items: [
      {
        title: "All Organizations",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Products",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];
