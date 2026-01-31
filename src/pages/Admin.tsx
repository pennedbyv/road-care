import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Users,
  Settings,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  MoreVertical,
  Search,
  Plus,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const Admin = () => {
  const users = [
    { id: "USR-001", name: "Admin Kumar", email: "admin@smc.gov.in", role: "Admin", status: "active", lastLogin: "2024-01-15 10:30" },
    { id: "USR-002", name: "Supervisor Singh", email: "supervisor@smc.gov.in", role: "Supervisor", status: "active", lastLogin: "2024-01-15 09:15" },
    { id: "USR-003", name: "Operator Patil", email: "operator@smc.gov.in", role: "Operator", status: "active", lastLogin: "2024-01-14 16:45" },
    { id: "USR-004", name: "Viewer Sharma", email: "viewer@smc.gov.in", role: "Viewer", status: "inactive", lastLogin: "2024-01-10 11:20" },
  ];

  const systemStats = [
    { label: "CPU Usage", value: 45, icon: Cpu, status: "normal" },
    { label: "Memory", value: 62, icon: HardDrive, status: "normal" },
    { label: "Storage", value: 78, icon: Database, status: "warning" },
    { label: "Network", value: 92, icon: Wifi, status: "normal" },
  ];

  return (
    <DashboardLayout
      title="Admin Panel"
      subtitle="System administration and user management"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <Users className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Pending Alerts</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Monitoring */}
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">System Monitoring</h3>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {systemStats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.status === "warning" ? "text-warning" : "text-success"
                  }`}>
                    {stat.value}%
                  </span>
                </div>
                <Progress 
                  value={stat.value} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* User Management */}
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">User Management</h3>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-9 w-64 bg-secondary/50 border-white/5" />
              </div>
              <Button size="sm" className="bg-gradient-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="group">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-foreground">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant="outline" className={
                        user.role === "Admin" ? "text-destructive border-destructive/30" :
                        user.role === "Supervisor" ? "text-warning border-warning/30" :
                        "text-muted-foreground"
                      }>
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant="outline" className={
                        user.status === "active" ? "badge-completed" : "bg-muted text-muted-foreground"
                      }>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="text-sm text-muted-foreground">{user.lastLogin}</td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { action: "User login", user: "Admin Kumar", time: "2 minutes ago", type: "info" },
              { action: "Complaint assigned", user: "Supervisor Singh", time: "15 minutes ago", type: "success" },
              { action: "System backup completed", user: "System", time: "1 hour ago", type: "success" },
              { action: "Failed login attempt", user: "Unknown", time: "2 hours ago", type: "warning" },
              { action: "New user created", user: "Admin Kumar", time: "3 hours ago", type: "info" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/2 hover:bg-white/5 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === "success" ? "bg-success" :
                  activity.type === "warning" ? "bg-warning" :
                  "bg-info"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
