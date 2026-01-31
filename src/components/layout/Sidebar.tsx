import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileWarning,
  Map,
  Users,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { path: "/complaints", icon: FileWarning, label: "Complaints", badge: 12 },
  { path: "/map", icon: Map, label: "City Map", badge: null },
  { path: "/workers", icon: Users, label: "Workers", badge: null },
  { path: "/analytics", icon: BarChart3, label: "Analytics", badge: null },
  { path: "/certificates", icon: Award, label: "Certificates", badge: null },
  { path: "/admin", icon: Shield, label: "Admin", badge: null },
  { path: "/settings", icon: Settings, label: "Settings", badge: null },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">SMC</span>
              </div>
              <div>
                <h1 className="font-semibold text-sm text-sidebar-foreground">Solapur Municipal</h1>
                <p className="text-xs text-muted-foreground">Road Management</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            const navButton = (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-item group relative",
                  isActive && "active"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="h-5 min-w-5 text-xs flex items-center justify-center"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.path} delayDuration={0}>
                  <TooltipTrigger asChild>
                    {navButton}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <Badge variant="destructive" className="h-5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return navButton;
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">AK</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Admin Kumar</p>
                <p className="text-xs text-muted-foreground truncate">Supervisor</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-full h-10">
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </aside>
  );
}
