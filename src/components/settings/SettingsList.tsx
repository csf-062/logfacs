import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building2,
  Settings,
  Shield,
  Database,
  Globe,
  Mail,
  CreditCard,
  FileText,
  Bell,
  Workflow,
} from "lucide-react";

const SettingsList = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="organization" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="users">Users & Permissions</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SettingCard
              title="Company Profile"
              description="Manage your company information, logo, and business details"
              icon={<Building2 className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Business Units"
              description="Configure and manage your business units and departments"
              icon={<Building2 className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Locations"
              description="Manage warehouses, offices, and other physical locations"
              icon={<Globe className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Document Templates"
              description="Customize templates for invoices, purchase orders, and reports"
              icon={<FileText className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Fiscal Configuration"
              description="Set up fiscal years, periods, and tax configurations"
              icon={<CreditCard className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Notification Settings"
              description="Configure email notifications and alerts for your organization"
              icon={<Bell className="h-5 w-5 text-primary" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SettingCard
              title="User Management"
              description="Add, edit, and manage user accounts and profiles"
              icon={<Users className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Role Management"
              description="Define and configure user roles and responsibilities"
              icon={<Shield className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Permission Matrix"
              description="Set up detailed permissions for each role and module"
              icon={<Shield className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Access Control"
              description="Configure access control for different business units"
              icon={<Shield className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Authentication Settings"
              description="Configure login methods, MFA, and security policies"
              icon={<Shield className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Audit Logs"
              description="View and export user activity and system audit logs"
              icon={<FileText className="h-5 w-5 text-primary" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SettingCard
              title="General Settings"
              description="Configure system-wide settings and preferences"
              icon={<Settings className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Module Configuration"
              description="Enable, disable, and configure system modules"
              icon={<Settings className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Workflow Management"
              description="Configure approval workflows and business processes"
              icon={<Workflow className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Data Management"
              description="Manage data imports, exports, and backup settings"
              icon={<Database className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Email Configuration"
              description="Set up email servers and notification templates"
              icon={<Mail className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="System Maintenance"
              description="Schedule maintenance tasks and system updates"
              icon={<Settings className="h-5 w-5 text-primary" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SettingCard
              title="API Configuration"
              description="Manage API keys, webhooks, and integration settings"
              icon={<Settings className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Payment Gateways"
              description="Configure payment processors and financial integrations"
              icon={<CreditCard className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="External Systems"
              description="Connect to external ERP, CRM, and other business systems"
              icon={<Database className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Data Synchronization"
              description="Configure data sync settings with external systems"
              icon={<Database className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Third-Party Services"
              description="Manage connections to third-party services and tools"
              icon={<Globe className="h-5 w-5 text-primary" />}
            />
            <SettingCard
              title="Integration Logs"
              description="View and troubleshoot integration activity logs"
              icon={<FileText className="h-5 w-5 text-primary" />}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SettingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SettingCard = ({ title, description, icon }: SettingCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button size="sm">Configure</Button>
      </CardContent>
    </Card>
  );
};

export default SettingsList;
