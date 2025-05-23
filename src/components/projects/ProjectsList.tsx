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
  Users,
  Clock,
} from "lucide-react";
import { useCompany } from "../common/CompanySelector";

interface Project {
  id: number;
  name: string;
  business: string;
  businessId: string;
  status: string;
  progress: number;
  budget: number;
  startDate: string;
  endDate: string;
  manager: string;
  team: number;
  description: string;
}

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default";
    case "completed":
      return "outline";
    case "on-hold":
      return "secondary";
    case "cancelled":
      return "destructive";
    case "planning":
      return "secondary";
    default:
      return "outline";
  }
};

const ProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { selectedCompany } = useCompany();

  // Mock data for projects
  const projects: Project[] = [
    {
      id: 1,
      name: "Warehouse Expansion",
      business: "Logística Norte",
      businessId: "business-1",
      status: "active",
      progress: 75,
      budget: 450000,
      startDate: "2023-03-15",
      endDate: "2023-09-30",
      manager: "Carlos Mendoza",
      team: 8,
      description:
        "Expansion of the main warehouse to increase storage capacity",
    },
    {
      id: 2,
      name: "Fleet Modernization",
      business: "Transportes Rápidos",
      businessId: "business-3",
      status: "on-hold",
      progress: 30,
      budget: 280000,
      startDate: "2023-02-01",
      endDate: "2023-08-15",
      manager: "Ana Gutiérrez",
      team: 5,
      description: "Replacement of 15 transport vehicles with newer models",
    },
    {
      id: 3,
      name: "Inventory System Upgrade",
      business: "Logística Norte",
      businessId: "business-1",
      status: "active",
      progress: 60,
      budget: 120000,
      startDate: "2023-04-10",
      endDate: "2023-07-20",
      manager: "Roberto Sánchez",
      team: 4,
      description: "Implementation of new inventory tracking software",
    },
    {
      id: 4,
      name: "New Distribution Center",
      business: "Logística Sur",
      businessId: "business-2",
      status: "completed",
      progress: 100,
      budget: 850000,
      startDate: "2022-09-01",
      endDate: "2023-05-30",
      manager: "María Fernández",
      team: 12,
      description:
        "Construction and setup of new distribution center in the south region",
    },
    {
      id: 5,
      name: "Supply Chain Optimization",
      business: "Transportes Rápidos",
      businessId: "business-3",
      status: "active",
      progress: 45,
      budget: 75000,
      startDate: "2023-05-01",
      endDate: "2023-08-30",
      manager: "Javier López",
      team: 3,
      description:
        "Analysis and optimization of the current supply chain processes",
    },
    {
      id: 6,
      name: "Logistics Software Integration",
      business: "Logística Sur",
      businessId: "business-2",
      status: "planning",
      progress: 10,
      budget: 180000,
      startDate: "2023-07-01",
      endDate: "2023-12-15",
      manager: "Patricia Ramírez",
      team: 6,
      description:
        "Integration of new logistics software with existing systems",
    },
    {
      id: 7,
      name: "Warehouse Automation",
      business: "Logística Norte",
      businessId: "business-1",
      status: "planning",
      progress: 5,
      budget: 320000,
      startDate: "2023-08-15",
      endDate: "2024-02-28",
      manager: "Eduardo Torres",
      team: 7,
      description: "Implementation of automated systems in the main warehouse",
    },
  ];

  // Filter projects based on search term, status filter, and company
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.business.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    // Check if the project belongs to the selected company or any of its children
    const matchesCompany =
      selectedCompany === "all" ||
      selectedCompany === "group-1" ||
      selectedCompany === "group-2" ||
      project.businessId === selectedCompany;

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
              placeholder="Search projects..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
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
            New Project
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Projects ({filteredProjects.length})</CardTitle>
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
                <TableHead>Timeline</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    {project.name}
                    <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">
                      {project.description}
                    </div>
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
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">
                        {project.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>${project.budget.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="text-xs">
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span className="text-xs">{project.team} members</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {project.manager}
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

export default ProjectsList;
