"use client";

import { MoreHorizontal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@merchant/ui/components/sidebar";
import { menus } from "@/constants/sidebar";
import Link from "next/link";

export function NavProjects() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Menus</SidebarGroupLabel>
      <SidebarMenu>
        {menus.map((item) => (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
