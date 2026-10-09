"use client";

import { createContext, useContext, useState } from "react";

// Chỉ còn trạng thái ngăn kéo menu trên màn hình nhỏ.
type Ctx = { mobileOpen: boolean; setMobileOpen: (v: boolean) => void };
const SidebarContext = createContext<Ctx | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <SidebarContext.Provider value={{ mobileOpen, setMobileOpen }}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar phải nằm trong <SidebarProvider>");
  return ctx;
}
