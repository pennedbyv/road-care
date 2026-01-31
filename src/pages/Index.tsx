import {
  FileWarning,
  Clock,
  Loader2,
  CheckCircle2,
  TrendingUp,
  Users,
  Award,
  AlertTriangle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ComplaintsTable } from "@/components/dashboard/ComplaintsTable";
import { SolapurMap } from "@/components/dashboard/SolapurMap";
import { MonthlyTrendChart, DamageTypeChart } from "@/components/dashboard/AnalyticsCharts";
import { mockComplaints, mockAnalytics } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Index = () => {
  const stats = [
    {
      title: "Total Complaints",
      value: mockAnalytics.totalComplaints.toLocaleString(),
      subtitle: "Since inception",
      icon: FileWarning,
      trend: { value: 12, isPositive: false },
      variant: "default" as const,
    },
    {
      title: "Pending",
      value: mockAnalytics.pendingComplaints,
      subtitle: "Awaiting assignment",
      icon: Clock,
      variant: "warning" as const,
    },
    {
      title: "In Progress",
      value: mockAnalytics.inProgressComplaints,
      subtitle: "Currently being fixed",
      icon: Loader2,
      variant: "info" as const,
    },
    {
      title: "Completed",
      value: mockAnalytics.completedComplaints,
      subtitle: "Successfully resolved",
      icon: CheckCircle2,
      trend: { value: 8, isPositive: true },
      variant: "success" as const,
    },
  ];

  const recentHighPriority = mockComplaints.filter(
    (c) => c.priority === "high" && c.status === "pending"
  );

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle="Solapur Municipal Corporation - Road Damage Management System"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/10">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{mockAnalytics.avgResolutionTime} days</p>
              <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4">
            <div className="p-3 rounded-xl bg-info/10">
              <Users className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-info">{mockAnalytics.citizenSatisfaction}%</p>
              <p className="text-sm text-muted-foreground">Citizen Satisfaction</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4">
            <div className="p-3 rounded-xl bg-warning/10">
              <Award className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">156</p>
              <p className="text-sm text-muted-foreground">Certificates Issued</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/5 overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Live Complaint Map</h3>
                  <p className="text-sm text-muted-foreground">Solapur City - Real-time overview</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="damage-pothole">
                    <span className="w-2 h-2 rounded-full bg-destructive mr-2" />
                    Pothole
                  </Badge>
                  <Badge variant="outline" className="damage-crack">
                    <span className="w-2 h-2 rounded-full bg-warning mr-2" />
                    Crack
                  </Badge>
                  <Badge variant="outline" className="damage-water">
                    <span className="w-2 h-2 rounded-full bg-info mr-2" />
                    Water
                  </Badge>
                </div>
              </div>
              <ErrorBoundary
                fallback={
                  <div className="p-6 text-sm text-muted-foreground">
                    Map is temporarily unavailable.
                  </div>
                }
              >
                <SolapurMap complaints={mockComplaints} />
              </ErrorBoundary>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* High Priority Alerts */}
            <div className="rounded-xl border border-white/5 bg-card p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold">High Priority</h3>
                </div>
                <Badge variant="destructive">{recentHighPriority.length}</Badge>
              </div>
              <div className="space-y-3">
                {recentHighPriority.slice(0, 3).map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10"
                  >
                    <img
                      src={complaint.imageUrl}
                      alt="Damage"
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{complaint.id}</p>
                      <p className="text-xs text-muted-foreground truncate">{complaint.location}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs h-7">
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Damage Distribution */}
            <DamageTypeChart data={mockAnalytics.damageTypeDistribution} />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyTrendChart data={mockAnalytics.monthlyTrend} />
          <div className="chart-container">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockComplaints.slice(0, 5).map((complaint, index) => (
                <div
                  key={complaint.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/2 hover:bg-white/5 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={complaint.imageUrl}
                    alt="Damage"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{complaint.id}</p>
                      <Badge variant="outline" className={`text-[10px] ${
                        complaint.status === "pending" ? "badge-pending" :
                        complaint.status === "in-progress" ? "badge-in-progress" :
                        "badge-completed"
                      }`}>
                        {complaint.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{complaint.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Complaints Table */}
        <div className="rounded-xl border border-white/5 bg-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Recent Complaints</h3>
              <p className="text-sm text-muted-foreground">Latest road damage reports from citizens</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <ComplaintsTable complaints={mockComplaints.slice(0, 5)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
