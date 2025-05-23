import React, { useState, createContext, useContext } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Building2, BuildingIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyOption {
  id: string;
  name: string;
  type: "group" | "business" | "project";
  parentId?: string;
}

interface CompanySelectorProps {
  onCompanyChange?: (companyId: string, type: string) => void;
  className?: string;
}

// Create a context for company selection
export const CompanyContext = createContext<{
  selectedCompany: string;
  setSelectedCompany: (id: string) => void;
  getCompanyName: (id: string) => string;
  companies: CompanyOption[];
}>({
  selectedCompany: "group-1",
  setSelectedCompany: () => {},
  getCompanyName: () => "",
  companies: [],
});

// Hook to use the company context
export const useCompany = () => useContext(CompanyContext);

// Provider component
export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCompany, setSelectedCompany] = useState("group-1");

  const companies = [
    { id: "group-1", name: "Grupo Logística Global", type: "group" },
    { id: "group-2", name: "Grupo Transportes Unidos", type: "group" },
    {
      id: "business-1",
      name: "Logística Norte",
      type: "business",
      parentId: "group-1",
    },
    {
      id: "business-2",
      name: "Logística Sur",
      type: "business",
      parentId: "group-1",
    },
    {
      id: "business-3",
      name: "Transportes Rápidos",
      type: "business",
      parentId: "group-2",
    },
    {
      id: "project-1",
      name: "Proyecto Distribución A",
      type: "project",
      parentId: "business-1",
    },
    {
      id: "project-2",
      name: "Proyecto Almacenamiento B",
      type: "project",
      parentId: "business-1",
    },
    {
      id: "project-3",
      name: "Proyecto Logística C",
      type: "project",
      parentId: "business-2",
    },
  ];

  const getCompanyName = (id: string) => {
    const company = companies.find((c) => c.id === id);
    return company ? company.name : "";
  };

  return (
    <CompanyContext.Provider
      value={{ selectedCompany, setSelectedCompany, getCompanyName, companies }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

const CompanySelector = ({
  onCompanyChange,
  className,
}: CompanySelectorProps = {}) => {
  const { selectedCompany, setSelectedCompany, companies } = useCompany();
  const [open, setOpen] = useState(false);

  const handleSelect = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setSelectedCompany(company.id);
      if (onCompanyChange) {
        onCompanyChange(company.id, company.type);
      }
      setOpen(false);
    }
  };

  const getGroupedOptions = () => {
    const groups = companies.filter((c) => c.type === "group");
    const result = [];

    for (const group of groups) {
      result.push({
        group,
        businesses: companies.filter(
          (c) => c.type === "business" && c.parentId === group.id,
        ),
      });
    }

    return result;
  };

  const getProjects = (businessId: string) => {
    return companies.filter(
      (c) => c.type === "project" && c.parentId === businessId,
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "group":
        return <Building2 className="mr-2 h-4 w-4" />;
      case "business":
        return <BuildingIcon className="mr-2 h-4 w-4" />;
      case "project":
        return <div className="w-2 h-2 rounded-full bg-primary mr-4 ml-2" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn("relative", className)}
      style={{ backgroundColor: "var(--background)" }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              {getTypeIcon(
                companies.find((c) => c.id === selectedCompany)?.type ||
                  "group",
              )}
              <span>
                {companies.find((c) => c.id === selectedCompany)?.name ||
                  "Select Company"}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="max-h-[300px] overflow-auto p-1">
            {getGroupedOptions().map(({ group, businesses }) => (
              <div key={group.id} className="mb-2">
                <div
                  className={cn(
                    "flex items-center px-2 py-1.5 rounded-md cursor-pointer",
                    selectedCompany === group.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted",
                  )}
                  onClick={() => handleSelect(group.id)}
                >
                  {getTypeIcon(group.type)}
                  <span className="font-medium">{group.name}</span>
                  {selectedCompany === group.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </div>

                {businesses.map((business) => (
                  <div key={business.id} className="ml-4 mt-1">
                    <div
                      className={cn(
                        "flex items-center px-2 py-1.5 rounded-md cursor-pointer",
                        selectedCompany === business.id
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted",
                      )}
                      onClick={() => handleSelect(business.id)}
                    >
                      {getTypeIcon(business.type)}
                      <span>{business.name}</span>
                      {selectedCompany === business.id && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </div>

                    {getProjects(business.id).map((project) => (
                      <div
                        key={project.id}
                        className={cn(
                          "flex items-center px-2 py-1.5 rounded-md cursor-pointer ml-4 mt-1",
                          selectedCompany === project.id
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted",
                        )}
                        onClick={() => handleSelect(project.id)}
                      >
                        {getTypeIcon(project.type)}
                        <span>{project.name}</span>
                        {selectedCompany === project.id && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CompanySelector;
