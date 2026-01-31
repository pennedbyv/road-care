export type DamageType = "pothole" | "crack" | "water";
export type Severity = "low" | "medium" | "high";
export type ComplaintStatus = "pending" | "in-progress" | "completed";
export type Priority = "low" | "medium" | "high";
export type WorkerStatus = "available" | "busy" | "off-duty";

export interface Complaint {
  id: string;
  citizenName: string;
  citizenPhone: string;
  location: string;
  ward: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  damageType: DamageType;
  severity: Severity;
  description: string;
  imageUrl: string;
  aiConfidence: number;
  status: ComplaintStatus;
  priority: Priority;
  assignedTo?: string;
  deadline?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Worker {
  id: string;
  name: string;
  phone: string;
  zone: string;
  specialization: string;
  status: WorkerStatus;
  currentTask?: string;
  completedTasks: number;
  rating: number;
}

export interface AnalyticsData {
  totalComplaints: number;
  pendingComplaints: number;
  inProgressComplaints: number;
  completedComplaints: number;
  avgResolutionTime: number;
  citizenSatisfaction: number;
  monthlyTrend: {
    month: string;
    complaints: number;
    resolved: number;
  }[];
  wardDistribution: {
    ward: string;
    complaints: number;
    color: string;
  }[];
  damageTypeDistribution: {
    type: string;
    count: number;
    percentage: number;
  }[];
  resolutionTimeByPriority: {
    priority: string;
    avgDays: number;
  }[];
}

export interface Notification {
  id: string;
  type: "new_complaint" | "task_completed" | "deadline_approaching" | "ai_classification";
  title: string;
  message: string;
  complaintId?: string;
  timestamp: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "supervisor" | "operator";
  department: string;
  avatar?: string;
}
