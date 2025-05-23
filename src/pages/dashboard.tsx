import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import KpiCards from "@/components/dashboard/KpiCards";
import ModuleOverview from "@/components/dashboard/ModuleOverview";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <MainLayout title="Dashboard" description="Welcome to your ERP dashboard.">
      {/* KPI Cards */}
      <div className="mb-8">
        <KpiCards />
      </div>

      {/* Module Overview */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Tabs defaultValue="projects" className="w-full">
            <div className="border-b px-6 py-2">
              <TabsList>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="finances">Finances</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="projects">
                <ModuleOverview activeTab="projects" />
              </TabsContent>
              <TabsContent value="inventory">
                <ModuleOverview activeTab="inventory" />
              </TabsContent>
              <TabsContent value="finances">
                <ModuleOverview activeTab="finances" />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Dashboard;
