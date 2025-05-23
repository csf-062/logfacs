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
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react";
import { useCompany } from "../common/CompanySelector";

interface PurchaseOrder {
  id: string;
  reference: string;
  supplier: string;
  date: string;
  deliveryDate: string;
  status: string;
  total: number;
  currency: string;
  items: number;
  project: string;
  requestor: string;
  business: string;
}

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "approved":
      return "default";
    case "received":
      return "outline";
    case "cancelled":
      return "destructive";
    case "partial":
      return "warning";
    default:
      return "outline";
  }
};

const PurchasesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { selectedCompany } = useCompany();

  // Mock data for purchase orders
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: "PO-2023-001",
      reference: "REQ-2023-042",
      supplier: "Aceros Industriales S.A.",
      date: "2023-06-15",
      deliveryDate: "2023-07-05",
      status: "approved",
      total: 45000,
      currency: "USD",
      items: 12,
      project: "Warehouse Expansion",
      requestor: "Carlos Mendoza",
      business: "business-1",
    },
    {
      id: "PO-2023-002",
      reference: "REQ-2023-043",
      supplier: "Transportes Logísticos",
      date: "2023-06-16",
      deliveryDate: "2023-06-30",
      status: "received",
      total: 12500,
      currency: "USD",
      items: 3,
      project: "Fleet Modernization",
      requestor: "Ana Gutiérrez",
      business: "business-3",
    },
    {
      id: "PO-2023-003",
      reference: "REQ-2023-044",
      supplier: "Sistemas Integrados S.A.",
      date: "2023-06-18",
      deliveryDate: "2023-07-10",
      status: "pending",
      total: 28000,
      currency: "USD",
      items: 5,
      project: "Inventory System Upgrade",
      requestor: "Roberto Sánchez",
      business: "business-1",
    },
    {
      id: "PO-2023-004",
      reference: "REQ-2023-045",
      supplier: "Constructora Moderna",
      date: "2023-06-20",
      deliveryDate: "2023-08-15",
      status: "partial",
      total: 85000,
      currency: "USD",
      items: 8,
      project: "New Distribution Center",
      requestor: "María Fernández",
      business: "business-2",
    },
    {
      id: "PO-2023-005",
      reference: "REQ-2023-046",
      supplier: "Consultores Logísticos",
      date: "2023-06-22",
      deliveryDate: "2023-07-15",
      status: "approved",
      total: 18500,
      currency: "USD",
      items: 2,
      project: "Supply Chain Optimization",
      requestor: "Javier López",
      business: "business-3",
    },
    {
      id: "PO-2023-006",
      reference: "REQ-2023-047",
      supplier: "Software Solutions Inc.",
      date: "2023-06-25",
      deliveryDate: "2023-08-01",
      status: "cancelled",
      total: 32000,
      currency: "USD",
      items: 1,
      project: "Logistics Software Integration",
      requestor: "Patricia Ramírez",
      business: "business-2",
    },
  ];

  // Filter purchase orders based on search term, status filter, and company
  const filteredPurchaseOrders = purchaseOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    // Check if the order belongs to the selected company or any of its children
    const matchesCompany =
      selectedCompany === "all" ||
      selectedCompany === "group-1" ||
      selectedCompany === "group-2" ||
      order.business === selectedCompany;

    return matchesSearch && matchesStatus && matchesCompany;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
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
            New Purchase Order
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            Purchase Orders ({filteredPurchaseOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchaseOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.project}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getBadgeVariant(order.status)}
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      <span>
                        {order.total.toLocaleString("en-US", {
                          style: "currency",
                          currency: order.currency,
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="text-xs">
                          Order: {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="text-xs">
                          Delivery:{" "}
                          {new Date(order.deliveryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      <span className="text-xs">{order.reference}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {order.requestor}
                    </div>
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

export default PurchasesList;
