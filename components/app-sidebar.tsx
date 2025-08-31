"use client";

import * as React from "react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

export function AppSidebar({
  setOpenTour,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  setOpenTour: (open: boolean) => void;
}) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! pt-2 pb-1 px-4"
      {...props}
      side="right"
    >
      <SidebarContent>
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser setOpenTour={setOpenTour} />
      </SidebarFooter>
    </Sidebar>
  );
}
