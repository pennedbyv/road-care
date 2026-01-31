import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  MonthlyTrendChart,
  WardDistributionChart,
  DamageTypeChart,
  ResolutionTimeChart,
} from "@/components/dashboard/AnalyticsCharts";
import { mockAnalytics } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Analytics = () => {
  return (
    <DashboardLayout
      title="Analytics & Reports"
      subtitle="Comprehensive insights and performance metrics"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-40 bg-secondary/50 border-white/5">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button size="sm" className="bg-gradient-primary text-primary-foreground">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card text-center">
            <p className="text-4xl font-bold text-gradient">{mockAnalytics.totalComplaints}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Complaints</p>
          </div>
          <div className="stat-card text-center">
            <p className="text-4xl font-bold text-success">{mockAnalytics.completedComplaints}</p>
            <p className="text-sm text-muted-foreground mt-1">Resolved</p>
          </div>
          <div className="stat-card text-center">
            <p className="text-4xl font-bold text-info">{mockAnalytics.avgResolutionTime} days</p>
            <p className="text-sm text-muted-foreground mt-1">Avg Resolution</p>
          </div>
          <div className="stat-card text-center">
            <p className="text-4xl font-bold text-warning">{mockAnalytics.citizenSatisfaction}%</p>
            <p className="text-sm text-muted-foreground mt-1">Satisfaction</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyTrendChart data={mockAnalytics.monthlyTrend} />
          <WardDistributionChart data={mockAnalytics.wardDistribution} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DamageTypeChart data={mockAnalytics.damageTypeDistribution} />
          <ResolutionTimeChart data={mockAnalytics.resolutionTimeByPriority} />
        </div>

        {/* Summary Table */}
        <div className="rounded-xl border border-white/5 bg-card p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Complaints</th>
                  <th>Resolved</th>
                  <th>Resolution Rate</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {mockAnalytics.monthlyTrend.map((month) => (
                  <tr key={month.month}>
                    <td className="font-medium">{month.month} 2024</td>
                    <td>{month.complaints}</td>
                    <td className="text-success">{month.resolved}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-success"
                            style={{ width: `${(month.resolved / month.complaints) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm">
                          {Math.round((month.resolved / month.complaints) * 100)}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-success text-sm">↑ 5%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
