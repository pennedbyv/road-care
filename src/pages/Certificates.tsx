import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Award,
  Download,
  Search,
  Star,
  CheckCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { mockComplaints } from "@/data/mockData";

const Certificates = () => {
  // Citizens who reported completed complaints get certificates
  const eligibleCitizens = mockComplaints
    .filter((c) => c.status === "completed")
    .map((c) => ({
      id: c.id,
      name: c.citizenName,
      location: c.location,
      completedAt: c.completedAt,
      damageType: c.damageType,
    }));

  return (
    <DashboardLayout
      title="Citizen Certificates"
      subtitle="Generate appreciation certificates for citizen contributions"
    >
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-warning/10">
              <Award className="h-8 w-8 text-warning" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Citizen Rewards Program</h2>
              <p className="text-muted-foreground">
                Recognize citizens who help improve Solapur's roads
              </p>
            </div>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />
            Generate All Certificates
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{eligibleCitizens.length}</p>
              <p className="text-sm text-muted-foreground">Eligible Citizens</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4">
            <div className="p-3 rounded-xl bg-warning/10">
              <Award className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">Certificates Issued</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4">
            <div className="p-3 rounded-xl bg-info/10">
              <Star className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Top Contributors</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search citizens by name or complaint ID..."
            className="pl-9 bg-secondary/50 border-white/5"
          />
        </div>

        {/* Eligible Citizens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eligibleCitizens.map((citizen) => (
            <div
              key={citizen.id}
              className="rounded-xl border border-white/5 bg-card p-5 hover:border-warning/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">
                      {citizen.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{citizen.name}</h3>
                    <p className="text-sm text-muted-foreground">{citizen.id}</p>
                  </div>
                </div>
                <Badge variant="outline" className="badge-completed text-xs">
                  Eligible
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{citizen.location}</span>
                </div>

                {citizen.completedAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Resolved on{" "}
                      {new Date(citizen.completedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-white/5">
                  <Button variant="outline" size="sm" className="flex-1">
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-primary text-primary-foreground">
                    <Download className="h-4 w-4 mr-1" />
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Preview Template */}
        <div className="rounded-xl border border-white/5 bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Certificate Template Preview</h3>
          <div className="aspect-[16/10] rounded-lg border border-warning/30 bg-gradient-to-br from-warning/5 to-transparent p-8 flex flex-col items-center justify-center text-center">
            <Award className="h-16 w-16 text-warning mb-4" />
            <h2 className="text-2xl font-bold text-warning mb-2">
              Certificate of Appreciation
            </h2>
            <p className="text-muted-foreground mb-4">
              Solapur Municipal Corporation
            </p>
            <p className="text-lg text-foreground mb-2">
              This certificate is awarded to
            </p>
            <p className="text-xl font-bold text-primary mb-4">[Citizen Name]</p>
            <p className="text-sm text-muted-foreground max-w-md">
              For your valuable contribution in identifying and reporting road damage,
              helping us maintain safer roads for all citizens of Solapur.
            </p>
            <div className="flex items-center gap-8 mt-6">
              <div className="text-center">
                <div className="w-24 h-0.5 bg-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Date</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-0.5 bg-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Commissioner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Certificates;
