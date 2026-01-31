import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Save,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  return (
    <DashboardLayout
      title="Settings"
      subtitle="Configure system preferences and notifications"
    >
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* General Settings */}
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <div className="flex items-center gap-2 mb-6">
            <SettingsIcon className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">General Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input defaultValue="Solapur Municipal Corporation" className="bg-secondary/50 border-white/5" />
              </div>
              <div className="space-y-2">
                <Label>System Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="bg-secondary/50 border-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="mr">Marathi</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger className="bg-secondary/50 border-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger className="bg-secondary/50 border-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Notification Settings</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "New complaint alerts", description: "Get notified when citizens report new complaints", defaultChecked: true },
              { label: "High priority notifications", description: "Immediate alerts for high priority cases", defaultChecked: true },
              { label: "Task completion updates", description: "Notifications when workers complete tasks", defaultChecked: true },
              { label: "Deadline reminders", description: "Remind before task deadlines approach", defaultChecked: true },
              { label: "AI classification alerts", description: "Alerts for low confidence classifications", defaultChecked: false },
              { label: "System maintenance alerts", description: "Notifications about system updates", defaultChecked: false },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/2">
                <div>
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.defaultChecked} />
              </div>
            ))}
          </div>
        </div>

        {/* Email Settings */}
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Email Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SMTP Server</Label>
                <Input defaultValue="smtp.smc.gov.in" className="bg-secondary/50 border-white/5" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Port</Label>
                <Input defaultValue="587" className="bg-secondary/50 border-white/5" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From Email</Label>
                <Input defaultValue="noreply@smc.gov.in" className="bg-secondary/50 border-white/5" />
              </div>
              <div className="space-y-2">
                <Label>Reply-To Email</Label>
                <Input defaultValue="support@smc.gov.in" className="bg-secondary/50 border-white/5" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <div className="flex items-center gap-2 mb-6">
            <Database className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">AI Classification Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Minimum Confidence Threshold</Label>
                <Select defaultValue="75">
                  <SelectTrigger className="bg-secondary/50 border-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60%</SelectItem>
                    <SelectItem value="70">70%</SelectItem>
                    <SelectItem value="75">75%</SelectItem>
                    <SelectItem value="80">80%</SelectItem>
                    <SelectItem value="90">90%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Auto-assign Priority</Label>
                <Select defaultValue="enabled">
                  <SelectTrigger className="bg-secondary/50 border-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Enabled</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/2">
              <div>
                <p className="text-sm font-medium">Require manual review for low confidence</p>
                <p className="text-xs text-muted-foreground">Flag complaints below threshold for human verification</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-gradient-primary text-primary-foreground">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
