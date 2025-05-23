import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  FileText,
  Calendar,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportsList = () => {
  const [dateRange, setDateRange] = useState("month");
  const [businessFilter, setBusinessFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={businessFilter} onValueChange={setBusinessFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Business" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Businesses</SelectItem>
              <SelectItem value="logistica-norte">Logística Norte</SelectItem>
              <SelectItem value="logistica-sur">Logística Sur</SelectItem>
              <SelectItem value="transportes-rapidos">
                Transportes Rápidos
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="operational" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="operational" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ReportCard
              title="Project Performance"
              description="Overview of project status, progress, and budget variance"
              icon={<BarChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Resource Utilization"
              description="Analysis of resource allocation and efficiency"
              icon={<LineChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Operational KPIs"
              description="Key performance indicators for operational efficiency"
              icon={<PieChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Project Timeline Report"
              description="Detailed timeline analysis of all active projects"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
            <ReportCard
              title="Delivery Performance"
              description="On-time delivery metrics and analysis"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
            <ReportCard
              title="Operational Costs"
              description="Breakdown of operational costs by category"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ReportCard
              title="Revenue Analysis"
              description="Revenue breakdown by business unit and project"
              icon={<BarChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Expense Trends"
              description="Monthly expense trends and forecasts"
              icon={<LineChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Profit Margins"
              description="Profit margin analysis by business and project"
              icon={<PieChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Cash Flow Statement"
              description="Detailed cash flow analysis and projections"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
            <ReportCard
              title="Balance Sheet"
              description="Consolidated balance sheet for all businesses"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
            <ReportCard
              title="Income Statement"
              description="Detailed income statement with comparative analysis"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ReportCard
              title="Inventory Turnover"
              description="Analysis of inventory turnover rates by category"
              icon={<BarChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Stock Level Trends"
              description="Historical stock level trends and forecasts"
              icon={<LineChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Inventory Value"
              description="Inventory value distribution by warehouse"
              icon={<PieChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Low Stock Alert Report"
              description="Items approaching or below minimum stock levels"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
            <ReportCard
              title="Inventory Movement"
              description="Detailed report of all inventory movements"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
            <ReportCard
              title="Warehouse Utilization"
              description="Space utilization analysis by warehouse"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ReportCard
              title="Supplier Performance"
              description="Performance metrics for all active suppliers"
              icon={<BarChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Purchase Trends"
              description="Purchase volume trends by supplier"
              icon={<LineChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Supplier Spend"
              description="Spend distribution across suppliers"
              icon={<PieChart className="h-5 w-5 text-primary" />}
              reportType="chart"
            />
            <ReportCard
              title="Supplier Evaluation"
              description="Detailed supplier evaluation and ratings"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
            <ReportCard
              title="Delivery Compliance"
              description="Supplier delivery compliance analysis"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
            <ReportCard
              title="Price Variance"
              description="Price variance analysis by supplier and category"
              icon={<FileText className="h-5 w-5 text-primary" />}
              reportType="document"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  reportType: "chart" | "document";
}

const ReportCard = ({
  title,
  description,
  icon,
  reportType,
}: ReportCardProps) => {
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
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm">
            {reportType === "chart" ? (
              <>
                <BarChart className="h-4 w-4 mr-2" />
                View Chart
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                View Report
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsList;
