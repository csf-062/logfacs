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
  Star,
  Phone,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";
import { useCompany } from "../common/CompanySelector";

interface Supplier {
  id: string;
  name: string;
  category: string;
  rating: number;
  status: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  lastOrder: string;
  paymentTerms: string;
  business: string;
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "blacklisted":
      return "destructive";
    case "pending":
      return "outline";
    default:
      return "outline";
  }
};

const getRatingStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? "text-warning fill-warning" : "text-muted-foreground"}`}
      />,
    );
  }
  return <div className="flex">{stars}</div>;
};

const SuppliersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { selectedCompany } = useCompany();

  // Mock data for suppliers
  const suppliers: Supplier[] = [
    {
      id: "SUP-001",
      name: "Aceros Industriales S.A.",
      category: "Raw Materials",
      rating: 4,
      status: "active",
      contact: "Juan Pérez",
      email: "jperez@acerosindustriales.com",
      phone: "+52 55 1234 5678",
      address: "Av. Industrial 123, Ciudad de México",
      totalOrders: 28,
      lastOrder: "2023-06-15",
      paymentTerms: "Net 30",
    },
    {
      id: "SUP-002",
      name: "Transportes Logísticos",
      category: "Transportation",
      rating: 3,
      status: "active",
      contact: "María González",
      email: "mgonzalez@translog.com",
      phone: "+52 55 8765 4321",
      address: "Calle Transporte 456, Guadalajara",
      totalOrders: 15,
      lastOrder: "2023-06-10",
      paymentTerms: "Net 15",
    },
    {
      id: "SUP-003",
      name: "Sistemas Integrados S.A.",
      category: "Technology",
      rating: 5,
      status: "active",
      contact: "Roberto Sánchez",
      email: "rsanchez@sistemasint.com",
      phone: "+52 55 2468 1357",
      address: "Av. Tecnología 789, Monterrey",
      totalOrders: 12,
      lastOrder: "2023-06-18",
      paymentTerms: "Net 45",
    },
    {
      id: "SUP-004",
      name: "Constructora Moderna",
      category: "Construction",
      rating: 4,
      status: "inactive",
      contact: "Carlos Ramírez",
      email: "cramirez@constructmod.com",
      phone: "+52 55 1357 2468",
      address: "Calle Construcción 321, Puebla",
      totalOrders: 8,
      lastOrder: "2023-05-25",
      paymentTerms: "Net 30",
    },
    {
      id: "SUP-005",
      name: "Consultores Logísticos",
      category: "Consulting",
      rating: 2,
      status: "blacklisted",
      contact: "Ana Martínez",
      email: "amartinez@consultlog.com",
      phone: "+52 55 9876 5432",
      address: "Av. Consultoría 654, Querétaro",
      totalOrders: 3,
      lastOrder: "2023-04-12",
      paymentTerms: "Advance Payment",
    },
    {
      id: "SUP-006",
      name: "Software Solutions Inc.",
      category: "Technology",
      rating: 4,
      status: "pending",
      contact: "John Smith",
      email: "jsmith@softwaresol.com",
      phone: "+1 555 123 4567",
      address: "Tech Avenue 987, San Francisco, CA",
      totalOrders: 0,
      lastOrder: "",
      paymentTerms: "Net 30",
    },
  ];

  // Filter suppliers based on search term, category filter, and status filter
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || supplier.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || supplier.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for the filter
  const categories = [
    ...new Set(suppliers.map((supplier) => supplier.category)),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search suppliers..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="blacklisted">Blacklisted</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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
            Add Supplier
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Suppliers ({filteredSuppliers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{supplier.name}</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{supplier.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>{getRatingStars(supplier.rating)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(supplier.status)}
                      className="capitalize"
                    >
                      {supplier.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{supplier.contact}</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{supplier.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {supplier.totalOrders} orders
                    </div>
                    {supplier.lastOrder && (
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <FileText className="h-3 w-3 mr-1" />
                        <span>
                          Last:{" "}
                          {new Date(supplier.lastOrder).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{supplier.paymentTerms}</TableCell>
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

export default SuppliersList;
