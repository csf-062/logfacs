import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";
import KpiCards from "./dashboard/KpiCards";
import ModuleOverview from "./dashboard/ModuleOverview";
import CompanySelector from "./common/CompanySelector";

const Home = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary">LogiERP</h2>
          <p className="text-sm text-muted-foreground">Logistics Management</p>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { name: "Dashboard", icon: "home" },
            { name: "Projects", icon: "briefcase" },
            { name: "Purchases", icon: "shopping-cart" },
            { name: "Inventory", icon: "package" },
            { name: "Suppliers", icon: "truck" },
            { name: "Accounting", icon: "dollar-sign" },
            { name: "Reports", icon: "bar-chart-2" },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-3 py-2 text-sm rounded-md ${item.name === "Dashboard" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground"}`}
            >
              <span className="flex items-center justify-center w-6 h-6 mr-3">
                <i className={`lucide-${item.icon}`}></i>
              </span>
              {item.name}
            </a>
          ))}
        </nav>

        <div className="pt-4 border-t">
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm rounded-md text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <span className="flex items-center justify-center w-6 h-6 mr-3">
              <i className="lucide-settings"></i>
            </span>
            Settings
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <CompanySelector />

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your ERP dashboard.
            </p>
          </div>

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
                    <ModuleOverview module="projects" />
                  </TabsContent>
                  <TabsContent value="inventory">
                    <ModuleOverview module="inventory" />
                  </TabsContent>
                  <TabsContent value="finances">
                    <ModuleOverview module="finances" />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Home;
