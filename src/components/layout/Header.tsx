import { useState } from "react";
import { Bell, Search, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { mockNotifications } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-background/80 backdrop-blur-xl border-b border-border">
      {/* Left side - Title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints, workers..."
            className="w-64 pl-9 bg-secondary/50 border-white/5 focus:border-primary/50"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium flex items-center justify-center text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="font-semibold">Notifications</span>
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {mockNotifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex flex-col items-start gap-1 p-3 cursor-pointer",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                    <span className="font-medium text-sm">{notification.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground pl-4">
                    {notification.message}
                  </span>
                  <span className="text-[10px] text-muted-foreground pl-4">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date/Time */}
        <div className="hidden lg:block text-right">
          <p className="text-sm font-medium text-foreground">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date().toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </header>
  );
}
