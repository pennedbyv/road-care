import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ComplaintsTable } from "@/components/dashboard/ComplaintsTable";
import { mockComplaints } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCw } from "lucide-react";

const Complaints = () => {
  return (
    <DashboardLayout
      title="Complaints Management"
      subtitle="View and manage all road damage complaints"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg bg-secondary/50 border border-white/5">
              <span className="text-2xl font-bold text-foreground">{mockComplaints.length}</span>
              <span className="text-sm text-muted-foreground ml-2">Total Complaints</span>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20">
                <span className="text-sm font-medium text-warning">
                  {mockComplaints.filter(c => c.status === "pending").length} Pending
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-info/10 border border-info/20">
                <span className="text-sm font-medium text-info">
                  {mockComplaints.filter(c => c.status === "in-progress").length} In Progress
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Complaint
            </Button>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="rounded-xl border border-white/5 bg-card p-4">
          <ComplaintsTable complaints={mockComplaints} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Complaints;
