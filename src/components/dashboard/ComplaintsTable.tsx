import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  UserPlus,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Complaint, ComplaintStatus, DamageType } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface ComplaintsTableProps {
  complaints: Complaint[];
}

const statusConfig: Record<ComplaintStatus, { label: string; class: string }> = {
  pending: { label: "Pending", class: "badge-pending" },
  "in-progress": { label: "In Progress", class: "badge-in-progress" },
  completed: { label: "Completed", class: "badge-completed" },
};

const damageConfig: Record<DamageType, { label: string; class: string }> = {
  pothole: { label: "Pothole", class: "damage-pothole" },
  crack: { label: "Road Crack", class: "damage-crack" },
  water: { label: "Water Damage", class: "damage-water" },
};

const priorityConfig = {
  low: { label: "Low", class: "text-muted-foreground" },
  medium: { label: "Medium", class: "text-warning" },
  high: { label: "High", class: "text-destructive" },
};

export function ComplaintsTable({ complaints }: ComplaintsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [damageFilter, setDamageFilter] = useState<string>("all");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(search.toLowerCase()) ||
      complaint.location.toLowerCase().includes(search.toLowerCase()) ||
      complaint.citizenName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesDamage = damageFilter === "all" || complaint.damageType === damageFilter;
    return matchesSearch && matchesStatus && matchesDamage;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, location, or citizen name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary/50 border-white/5"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-secondary/50 border-white/5">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={damageFilter} onValueChange={setDamageFilter}>
            <SelectTrigger className="w-40 bg-secondary/50 border-white/5">
              <SelectValue placeholder="Damage Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pothole">Pothole</SelectItem>
              <SelectItem value="crack">Road Crack</SelectItem>
              <SelectItem value="water">Water Damage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Complaint</th>
                <th>Location</th>
                <th>Damage Type</th>
                <th>AI Confidence</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                        <img
                          src={complaint.imageUrl}
                          alt="Road damage"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{complaint.id}</p>
                        <p className="text-xs text-muted-foreground">{complaint.citizenName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-foreground">{complaint.location}</p>
                        <p className="text-xs text-muted-foreground">{complaint.ward}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", damageConfig[complaint.damageType].class)}
                    >
                      {damageConfig[complaint.damageType].label}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            complaint.aiConfidence >= 90
                              ? "bg-success"
                              : complaint.aiConfidence >= 75
                              ? "bg-warning"
                              : "bg-destructive"
                          )}
                          style={{ width: `${complaint.aiConfidence}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          complaint.aiConfidence >= 90
                            ? "text-success"
                            : complaint.aiConfidence >= 75
                            ? "text-warning"
                            : "text-destructive"
                        )}
                      >
                        {complaint.aiConfidence}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      {complaint.priority === "high" && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                      <span className={cn("text-sm font-medium", priorityConfig[complaint.priority].class)}>
                        {priorityConfig[complaint.priority].label}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Badge
                      variant="outline"
                      className={cn("text-xs border", statusConfig[complaint.status].class)}
                    >
                      {statusConfig[complaint.status].label}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DialogTrigger asChild>
                            <DropdownMenuItem onClick={() => setSelectedComplaint(complaint)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign Worker
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-success">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Completed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {selectedComplaint && (
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <span>Complaint {selectedComplaint.id}</span>
                              <Badge
                                variant="outline"
                                className={cn("text-xs border", statusConfig[selectedComplaint.status].class)}
                              >
                                {statusConfig[selectedComplaint.status].label}
                              </Badge>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="space-y-4">
                              <img
                                src={selectedComplaint.imageUrl}
                                alt="Road damage"
                                className="w-full aspect-video rounded-lg object-cover"
                              />
                              <div className="space-y-2">
                                <h4 className="font-semibold">AI Classification</h4>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                                  <div>
                                    <Badge className={damageConfig[selectedComplaint.damageType].class}>
                                      {damageConfig[selectedComplaint.damageType].label}
                                    </Badge>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-2xl font-bold text-success">
                                      {selectedComplaint.aiConfidence}%
                                    </p>
                                    <p className="text-xs text-muted-foreground">Confidence</p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="w-full">
                                  Override Classification
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Citizen Details</h4>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <span className="text-muted-foreground">Name:</span>{" "}
                                    {selectedComplaint.citizenName}
                                  </p>
                                  <p>
                                    <span className="text-muted-foreground">Phone:</span>{" "}
                                    {selectedComplaint.citizenPhone}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Location</h4>
                                <div className="space-y-2 text-sm">
                                  <p>{selectedComplaint.location}</p>
                                  <p className="text-muted-foreground">{selectedComplaint.ward}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground">
                                  {selectedComplaint.description}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Timeline</h4>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <span className="text-muted-foreground">Reported:</span>{" "}
                                    {new Date(selectedComplaint.createdAt).toLocaleString()}
                                  </p>
                                  <p>
                                    <span className="text-muted-foreground">Last Updated:</span>{" "}
                                    {new Date(selectedComplaint.updatedAt).toLocaleString()}
                                  </p>
                                  {selectedComplaint.deadline && (
                                    <p>
                                      <span className="text-muted-foreground">Deadline:</span>{" "}
                                      {new Date(selectedComplaint.deadline).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 pt-4">
                                <Button className="flex-1 bg-gradient-primary text-primary-foreground">
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Assign Worker
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  View on Map
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination hint */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredComplaints.length} of {complaints.length} complaints</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
