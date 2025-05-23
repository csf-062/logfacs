import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  LineChart,
  PieChart,
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleOverviewProps {
  activeTab?: string;
}

const ModuleOverview = ({ activeTab = "projects" }: ModuleOverviewProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  return (
    <div className="w-full bg-background">
      <Tabs
        defaultValue={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New {currentTab.slice(0, -1)}
            </Button>
          </div>
        </div>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">24</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <BarChart className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Project Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">$1.2M</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <LineChart className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">68%</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PieChart className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Active Projects</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search projects..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectsData.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        {project.name}
                      </TableCell>
                      <TableCell>{project.business}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getBadgeVariant(project.status)}
                          className="capitalize"
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.progress}%</TableCell>
                      <TableCell>${project.budget.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/projects/${project.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Stock Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">$842,500</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <BarChart className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Stock Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">18</div>
                  <div className="p-2 bg-destructive/10 rounded-full">
                    <LineChart className="h-4 w-4 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Warehouses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">5</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PieChart className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Inventory Status</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search items..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="raw">Raw Materials</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        {item.stock} {item.unit}
                      </TableCell>
                      <TableCell>${item.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getStockBadgeVariant(item.status)}
                          className="capitalize"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/inventory/${item.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">$324,500</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <LineChart className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">$198,250</div>
                  <div className="p-2 bg-destructive/10 rounded-full">
                    <BarChart className="h-4 w-4 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Profit Margin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">38.9%</div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PieChart className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Financial Transactions</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="w-[200px] pl-8"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financesData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getTransactionBadgeVariant(transaction.type)}
                          className="capitalize"
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={
                          transaction.type === "expense"
                            ? "text-destructive"
                            : "text-primary"
                        }
                      >
                        {transaction.type === "expense" ? "-" : "+"}
                        {transaction.amount.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "outline"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/accounting/${transaction.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper functions for badge variants
const getBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default";
    case "completed":
      return "outline";
    case "on-hold":
      return "secondary";
    default:
      return "outline";
  }
};

const getStockBadgeVariant = (status: string) => {
  switch (status) {
    case "in-stock":
      return "default";
    case "low-stock":
      return "secondary";
    case "out-of-stock":
      return "destructive";
    default:
      return "outline";
  }
};

const getTransactionBadgeVariant = (type: string) => {
  switch (type) {
    case "income":
      return "default";
    case "expense":
      return "destructive";
    case "transfer":
      return "secondary";
    default:
      return "outline";
  }
};

// Mock data
const projectsData = [
  {
    id: 1,
    name: "Warehouse Expansion",
    business: "Logistics Inc.",
    status: "active",
    progress: 75,
    budget: 450000,
  },
  {
    id: 2,
    name: "Fleet Modernization",
    business: "Transport Co.",
    status: "on-hold",
    progress: 30,
    budget: 280000,
  },
  {
    id: 3,
    name: "Inventory System Upgrade",
    business: "Logistics Inc.",
    status: "active",
    progress: 60,
    budget: 120000,
  },
  {
    id: 4,
    name: "New Distribution Center",
    business: "Global Shipping",
    status: "completed",
    progress: 100,
    budget: 850000,
  },
  {
    id: 5,
    name: "Supply Chain Optimization",
    business: "Transport Co.",
    status: "active",
    progress: 45,
    budget: 75000,
  },
];

const inventoryData = [
  {
    id: 1,
    code: "RM-1001",
    name: "Steel Beams",
    category: "Raw Materials",
    stock: 250,
    unit: "tons",
    value: 125000,
    status: "in-stock",
  },
  {
    id: 2,
    code: "EQ-2034",
    name: "Forklift",
    category: "Equipment",
    stock: 5,
    unit: "units",
    value: 175000,
    status: "in-stock",
  },
  {
    id: 3,
    code: "SP-3045",
    name: "Packaging Materials",
    category: "Supplies",
    stock: 1200,
    unit: "boxes",
    value: 24000,
    status: "low-stock",
  },
  {
    id: 4,
    code: "RM-1078",
    name: "Aluminum Sheets",
    category: "Raw Materials",
    stock: 0,
    unit: "sheets",
    value: 0,
    status: "out-of-stock",
  },
  {
    id: 5,
    code: "EQ-2089",
    name: "Conveyor Belt",
    category: "Equipment",
    stock: 12,
    unit: "units",
    value: 36000,
    status: "in-stock",
  },
];

const financesData = [
  {
    id: "TRX-001",
    date: "2023-06-15",
    description: "Client Payment - Project #1234",
    type: "income",
    amount: 45000,
    status: "completed",
  },
  {
    id: "TRX-002",
    date: "2023-06-14",
    description: "Equipment Purchase",
    type: "expense",
    amount: 12500,
    status: "completed",
  },
  {
    id: "TRX-003",
    date: "2023-06-12",
    description: "Warehouse to Distribution Center",
    type: "transfer",
    amount: 8000,
    status: "pending",
  },
  {
    id: "TRX-004",
    date: "2023-06-10",
    description: "Monthly Rent",
    type: "expense",
    amount: 5500,
    status: "completed",
  },
  {
    id: "TRX-005",
    date: "2023-06-08",
    description: "Client Payment - Project #1235",
    type: "income",
    amount: 28000,
    status: "pending",
  },
];

export default ModuleOverview;
