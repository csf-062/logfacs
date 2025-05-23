import React, { useState } from "react";
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
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  Warehouse,
  BarChart,
  AlertTriangle,
} from "lucide-react";
import { useCompany } from "../common/CompanySelector";

interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  value: number;
  status: string;
  location: string;
  minStock: number;
  maxStock: number;
  lastMovement: string;
  business: string;
}

const getStockBadgeVariant = (status: string) => {
  switch (status) {
    case "in-stock":
      return "default";
    case "low-stock":
      return "secondary";
    case "out-of-stock":
      return "destructive";
    case "over-stock":
      return "warning";
    default:
      return "outline";
  }
};

const InventoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { selectedCompany } = useCompany();

  // Mock data for inventory items
  const inventoryItems: InventoryItem[] = [
    {
      id: "INV-001",
      code: "RM-1001",
      name: "Steel Beams",
      category: "Raw Materials",
      stock: 250,
      unit: "tons",
      value: 125000,
      status: "in-stock",
      location: "Warehouse A - Section 3",
      minStock: 100,
      maxStock: 300,
      lastMovement: "2023-06-15",
      business: "business-1",
    },
    {
      id: "INV-002",
      code: "EQ-2034",
      name: "Forklift",
      category: "Equipment",
      stock: 5,
      unit: "units",
      value: 175000,
      status: "in-stock",
      location: "Warehouse B - Section 1",
      minStock: 2,
      maxStock: 8,
      lastMovement: "2023-05-20",
      business: "business-1",
    },
    {
      id: "INV-003",
      code: "SP-3045",
      name: "Packaging Materials",
      category: "Supplies",
      stock: 1200,
      unit: "boxes",
      value: 24000,
      status: "low-stock",
      location: "Warehouse A - Section 5",
      minStock: 1500,
      maxStock: 5000,
      lastMovement: "2023-06-18",
      business: "business-1",
    },
    {
      id: "INV-004",
      code: "RM-1078",
      name: "Aluminum Sheets",
      category: "Raw Materials",
      stock: 0,
      unit: "sheets",
      value: 0,
      status: "out-of-stock",
      location: "Warehouse A - Section 2",
      minStock: 50,
      maxStock: 200,
      lastMovement: "2023-06-01",
      business: "business-2",
    },
    {
      id: "INV-005",
      code: "EQ-2089",
      name: "Conveyor Belt",
      category: "Equipment",
      stock: 12,
      unit: "units",
      value: 36000,
      status: "in-stock",
      location: "Warehouse C - Section 4",
      minStock: 5,
      maxStock: 15,
      lastMovement: "2023-06-10",
      business: "business-2",
    },
    {
      id: "INV-006",
      code: "SP-3102",
      name: "Safety Helmets",
      category: "Supplies",
      stock: 350,
      unit: "units",
      value: 10500,
      status: "over-stock",
      location: "Warehouse B - Section 3",
      minStock: 100,
      maxStock: 300,
      lastMovement: "2023-06-12",
      business: "business-3",
    },
    {
      id: "INV-007",
      code: "RM-1125",
      name: "Concrete Mix",
      category: "Raw Materials",
      stock: 180,
      unit: "bags",
      value: 9000,
      status: "in-stock",
      location: "Warehouse A - Section 1",
      minStock: 100,
      maxStock: 500,
      lastMovement: "2023-06-20",
      business: "business-3",
    },
  ];

  // Filter inventory items based on search term, category filter, status filter, and company
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    // Check if the item belongs to the selected company or any of its children
    const matchesCompany =
      selectedCompany === "all" ||
      selectedCompany === "group-1" ||
      selectedCompany === "group-2" ||
      item.business === selectedCompany;

    return matchesSearch && matchesCategory && matchesStatus && matchesCompany;
  });

  // Get unique categories for the filter
  const categories = [...new Set(inventoryItems.map((item) => item.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              <SelectItem value="over-stock">Over Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Inventory Items ({filteredItems.length})</CardTitle>
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
                <TableHead>Location</TableHead>
                <TableHead>Stock Levels</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {item.stock} {item.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last updated:{" "}
                      {new Date(item.lastMovement).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>${item.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStockBadgeVariant(item.status)}
                      className="capitalize"
                    >
                      {item.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Warehouse className="h-3 w-3 mr-1" />
                      <span className="text-xs">{item.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className={`h-2 rounded-full ${getStockLevelColor(item.stock, item.minStock, item.maxStock)}`}
                          style={{
                            width: `${getStockPercentage(item.stock, item.maxStock)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>{item.minStock}</span>
                      <span>{item.maxStock}</span>
                    </div>
                    {item.stock < item.minStock && (
                      <div className="flex items-center text-destructive text-xs mt-1">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>Below minimum</span>
                      </div>
                    )}
                    {item.stock > item.maxStock && (
                      <div className="flex items-center text-warning text-xs mt-1">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>Above maximum</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to calculate stock percentage
const getStockPercentage = (stock: number, maxStock: number) => {
  if (maxStock === 0) return 0;
  const percentage = (stock / maxStock) * 100;
  return Math.min(percentage, 100); // Cap at 100%
};

// Helper function to determine stock level color
const getStockLevelColor = (
  stock: number,
  minStock: number,
  maxStock: number,
) => {
  if (stock === 0) return "bg-destructive";
  if (stock < minStock) return "bg-destructive/60";
  if (stock > maxStock) return "bg-warning";
  return "bg-primary";
};

export default InventoryList;
