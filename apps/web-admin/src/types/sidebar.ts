import type { LucideIcon } from "lucide-react";
import type { Route } from "next";

export type SidebarMenuItem<T extends string = string> = {
  title: string;
  url: Route<T> | URL;
  icon: LucideIcon;
  key: string;
};

export type NavMain<T extends string = string> = {
  title: string;
  url: Route<T> | URL;
  icon: LucideIcon;
  items: Array<NavSubMain<T>>;
};

export type NavSubMain<T extends string = string> = {
  title: string;
  url: Route<T> | URL;
};
