import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockWorkers } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Phone,
  MapPin,
  Star,
  MoreVertical,
  UserPlus,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Workers = () => {
  const statusConfig = {
    available: { label: "Available", class: "badge-completed" },
    busy: { label: "Busy", class: "badge-in-progress" },
    "off-duty": { label: "Off Duty", class: "bg-muted text-muted-foreground" },
  };

  return (
    <DashboardLayout
      title="Worker Management"
      subtitle="Manage field workers and task assignments"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Total Workers</p>
            <p className="text-3xl font-bold text-foreground">{mockWorkers.length}</p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-3xl font-bold text-success">
              {mockWorkers.filter(w => w.status === "available").length}
            </p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Busy</p>
            <p className="text-3xl font-bold text-info">
              {mockWorkers.filter(w => w.status === "busy").length}
            </p>
          </div>
          <div className="stat-card">
            <p className="text-sm text-muted-foreground">Off Duty</p>
            <p className="text-3xl font-bold text-muted-foreground">
              {mockWorkers.filter(w => w.status === "off-duty").length}
            </p>
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockWorkers.map((worker) => (
            <div
              key={worker.id}
              className="rounded-xl border border-white/5 bg-card p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">
                      {worker.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{worker.name}</h3>
                    <p className="text-sm text-muted-foreground">{worker.id}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Assign Task</DropdownMenuItem>
                    <DropdownMenuItem>Contact</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className={cn("text-xs border", statusConfig[worker.status].class)}
                >
                  {statusConfig[worker.status].label}
                </Badge>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{worker.zone}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{worker.phone}</span>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-muted-foreground mb-2">Specialization</p>
                  <Badge variant="secondary" className="text-xs">
                    {worker.specialization}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium">{worker.completedTasks}</span>
                    <span className="text-xs text-muted-foreground">tasks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm font-medium">{worker.rating}</span>
                  </div>
                </div>

                {worker.currentTask && (
                  <div className="p-3 rounded-lg bg-info/10 border border-info/20">
                    <p className="text-xs text-muted-foreground mb-1">Current Task</p>
                    <p className="text-sm font-medium text-info">{worker.currentTask}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Add Worker Card */}
          <div className="rounded-xl border border-dashed border-white/10 bg-card/50 p-5 flex flex-col items-center justify-center min-h-[280px] hover:border-primary/30 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <UserPlus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Add New Worker</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Workers;
