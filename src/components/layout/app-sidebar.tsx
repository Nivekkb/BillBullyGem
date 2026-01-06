"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/logo";
import { Gavel, HandCoins, LayoutDashboard, Scissors, ShieldCheck, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { placeholderImages } from "@/lib/placeholder-images";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
  { href: "/bill-negotiation", label: "Bill Negotiation", icon: <HandCoins /> },
  { href: "/credit-repair", label: "Credit Repair", icon: <ShieldCheck /> },
  { href: "/subscription-cancellation", label: "Subscription Manager", icon: <Scissors /> },
  { href: "/compliance", label: "Compliance Tool", icon: <Gavel /> },
];

export function AppSidebar() {
  const pathname = usePathname();
  const userAvatar = placeholderImages.find(p => p.id === 'user-avatar-1');
  const { user } = useUser();
  const auth = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Sidebar className="border-r" side="left" collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight font-headline group-data-[collapsible=icon]:hidden">
            BillBully
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: "right", align: "center" }}
              >
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t">
        <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.photoURL ?? userAvatar?.imageUrl} alt="User Avatar" data-ai-hint={userAvatar?.imageHint} />
              <AvatarFallback>{user?.email?.[0].toUpperCase() ?? 'B'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-medium">{user?.displayName ?? 'Bill Bully'}</p>
                <p className="text-xs text-muted-foreground">{user?.email ?? 'user@billbully.com'}</p>
            </div>
        </div>
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                asChild
                tooltip={{ children: "Settings", side: "right", align: "center" }}
                >
                <Link href="#">
                    <Settings />
                    <span>Settings</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  tooltip={{ children: "Log Out", side: "right", align: "center" }}
                >
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
