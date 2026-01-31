import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SolapurMap } from "@/components/dashboard/SolapurMap";
import { mockComplaints } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DamageType } from "@/types/dashboard";
import { Layers, MapPin, Satellite } from "lucide-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const MapPage = () => {
  const [selectedType, setSelectedType] = useState<DamageType | "all">("all");

  const damageTypes: { value: DamageType | "all"; label: string; count: number; color: string }[] = [
    { value: "all", label: "All Types", count: mockComplaints.length, color: "bg-foreground" },
    { value: "pothole", label: "Potholes", count: mockComplaints.filter(c => c.damageType === "pothole").length, color: "bg-destructive" },
    { value: "crack", label: "Road Cracks", count: mockComplaints.filter(c => c.damageType === "crack").length, color: "bg-warning" },
    { value: "water", label: "Water Damage", count: mockComplaints.filter(c => c.damageType === "water").length, color: "bg-info" },
  ];

  return (
    <DashboardLayout
      title="City Map"
      subtitle="Interactive map view of all complaints in Solapur"
    >
      <div className="space-y-4 animate-fade-in">
        {/* Map Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Damage Type Filters */}
          <div className="flex flex-wrap gap-2">
            {damageTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
                className={selectedType === type.value ? "bg-gradient-primary text-primary-foreground" : ""}
              >
                <span className={`w-2 h-2 rounded-full mr-2 ${type.color}`} />
                {type.label}
                <Badge variant="secondary" className="ml-2 h-5 text-xs">
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              Street View
            </Button>
            <Button variant="outline" size="sm">
              <Satellite className="h-4 w-4 mr-2" />
              Satellite
            </Button>
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </Button>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl border border-white/5 overflow-hidden">
          <ErrorBoundary
            fallback={
              <div className="p-6 text-sm text-muted-foreground">
                Map is temporarily unavailable.
              </div>
            }
          >
            <SolapurMap complaints={mockComplaints} selectedType={selectedType} />
          </ErrorBoundary>
        </div>

        {/* Map Legend */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {damageTypes.filter(t => t.value !== "all").map((type) => (
            <div
              key={type.value}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-white/5"
            >
              <div className={`w-10 h-10 rounded-lg ${type.color}/20 flex items-center justify-center`}>
                <span className={`w-4 h-4 rounded-full ${type.color}`} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{type.count}</p>
                <p className="text-sm text-muted-foreground">{type.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MapPage;
