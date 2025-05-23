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
  FileText,
  DollarSign,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  reference: string;
  account: string;
  project: string;
  business: string;
}

const getTransactionBadgeVariant = (type: string) => {
  switch (type) {
    case "income":
      return "default";
    case "expense":
      return "destructive";
    case "transfer":
      return "secondary";
    case "adjustment":
      return "warning";
    default:
      return "outline";
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "outline";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    case "reconciled":
      return "default";
    default:
      return "outline";
  }
};

const AccountingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for transactions
  const transactions: Transaction[] = [
    {
      id: "TRX-001",
      date: "2023-06-15",
      description: "Client Payment - Project #1234",
      type: "income",
      amount: 45000,
      currency: "USD",
      status: "completed",
      reference: "INV-2023-042",
      account: "Accounts Receivable",
      project: "Warehouse Expansion",
      business: "Logística Norte",
    },
    {
      id: "TRX-002",
      date: "2023-06-14",
      description: "Equipment Purchase",
      type: "expense",
      amount: 12500,
      currency: "USD",
      status: "completed",
      reference: "PO-2023-001",
      account: "Equipment Expenses",
      project: "Fleet Modernization",
      business: "Transportes Rápidos",
    },
    {
      id: "TRX-003",
      date: "2023-06-12",
      description: "Warehouse to Distribution Center",
      type: "transfer",
      amount: 8000,
      currency: "USD",
      status: "pending",
      reference: "TRF-2023-015",
      account: "Internal Transfers",
      project: "Supply Chain Optimization",
      business: "Logística Norte",
    },
    {
      id: "TRX-004",
      date: "2023-06-10",
      description: "Monthly Rent",
      type: "expense",
      amount: 5500,
      currency: "USD",
      status: "completed",
      reference: "RENT-2023-06",
      account: "Rent Expenses",
      project: "",
      business: "Logística Sur",
    },
    {
      id: "TRX-005",
      date: "2023-06-08",
      description: "Client Payment - Project #1235",
      type: "income",
      amount: 28000,
      currency: "USD",
      status: "pending",
      reference: "INV-2023-043",
      account: "Accounts Receivable",
      project: "Inventory System Upgrade",
      business: "Logística Norte",
    },
    {
      id: "TRX-006",
      date: "2023-06-05",
      description: "Inventory Adjustment",
      type: "adjustment",
      amount: 3200,
      currency: "USD",
      status: "completed",
      reference: "ADJ-2023-008",
      account: "Inventory Adjustments",
      project: "",
      business: "Logística Sur",
    },
    {
      id: "TRX-007",
      date: "2023-06-03",
      description: "Supplier Payment",
      type: "expense",
      amount: 15800,
      currency: "USD",
      status: "reconciled",
      reference: "PAY-2023-025",
      account: "Accounts Payable",
      project: "New Distribution Center",
      business: "Logística Sur",
    },
  ];

  // Filter transactions based on search term, type filter, and status filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
              <SelectItem value="adjustment">Adjustment</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="reconciled">Reconciled</SelectItem>
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
            New Transaction
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            Financial Transactions ({filteredTransactions.length})
          </CardTitle>
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
                <TableHead>Reference</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{transaction.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {transaction.account}
                    </div>
                    {transaction.project && (
                      <div className="text-xs text-muted-foreground">
                        Project: {transaction.project}
                      </div>
                    )}
                  </TableCell>
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
                      transaction.type === "expense" ||
                      transaction.type === "adjustment"
                        ? "text-destructive"
                        : transaction.type === "income"
                          ? "text-primary"
                          : ""
                    }
                  >
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      <span>
                        {transaction.type === "expense" ||
                        transaction.type === "adjustment"
                          ? "-"
                          : transaction.type === "income"
                            ? "+"
                            : ""}
                        {transaction.amount.toLocaleString("en-US", {
                          style: "currency",
                          currency: transaction.currency,
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(transaction.status)}
                      className="capitalize"
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      <span className="text-xs">{transaction.reference}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.business}</TableCell>
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

export default AccountingList;
