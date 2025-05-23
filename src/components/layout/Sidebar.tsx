import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  ShoppingCart,
  Package,
  Users,
  Calculator,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
  isActive?: boolean;
}

const SidebarItem = ({
  icon,
  label,
  path,
  children,
  isActive = false,
}: SidebarItemProps) => {
  // Initialize isOpen to true if the item is active and has children
  const [isOpen, setIsOpen] = useState(isActive && children ? true : false);

  if (children) {
    return (
      <div className="w-full">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 px-3 py-2 text-left",
            isActive && "bg-accent text-accent-foreground",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center gap-3">
            {icon}
            <span className="flex-1">{label}</span>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        </Button>
        {isOpen && (
          <div className="ml-6 mt-1 space-y-1">
            {children.map((child, index) => (
              <Link to={child.path} key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-1.5 text-sm"
                >
                  {child.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link to={path || "#"}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 py-2",
          isActive && "bg-accent text-accent-foreground",
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <aside className="flex h-full w-[280px] flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">ERP</span>
          </div>
          <span className="font-semibold">Logistics ERP</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            path="/dashboard"
            isActive={activePath === "/dashboard"}
          />

          <SidebarItem
            icon={<Briefcase size={20} />}
            label="Projects"
            path="/projects"
            isActive={activePath.startsWith("/projects")}
            children={[
              { label: "All Projects", path: "/projects" },
              { label: "Create Project", path: "/projects/new" },
              { label: "Project Calendar", path: "/projects/calendar" },
            ]}
          />

          <SidebarItem
            icon={<ShoppingCart size={20} />}
            label="Purchases"
            path="/purchases"
            isActive={activePath.startsWith("/purchases")}
            children={[
              { label: "Requirements", path: "/purchases/requirements" },
              { label: "Purchase Orders", path: "/purchases/orders" },
              { label: "Receptions", path: "/purchases/receptions" },
            ]}
          />

          <SidebarItem
            icon={<Package size={20} />}
            label="Inventory"
            path="/inventory"
            isActive={activePath.startsWith("/inventory")}
            children={[
              { label: "Stock", path: "/inventory/stock" },
              { label: "Movements", path: "/inventory/movements" },
              { label: "Warehouses", path: "/inventory/warehouses" },
            ]}
          />

          <SidebarItem
            icon={<Users size={20} />}
            label="Suppliers"
            path="/suppliers"
            isActive={activePath.startsWith("/suppliers")}
          />

          <SidebarItem
            icon={<Calculator size={20} />}
            label="Accounting"
            path="/accounting"
            isActive={activePath.startsWith("/accounting")}
            children={[
              { label: "Transactions", path: "/accounting/transactions" },
              { label: "Ledger", path: "/accounting/ledger" },
              { label: "Financial Statements", path: "/accounting/statements" },
            ]}
          />

          <SidebarItem
            icon={<BarChart3 size={20} />}
            label="Reports"
            path="/reports"
            isActive={activePath.startsWith("/reports")}
            children={[
              { label: "Operational", path: "/reports/operational" },
              { label: "Management", path: "/reports/management" },
              { label: "Export Data", path: "/reports/export" },
            ]}
          />

          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            path="/settings"
            isActive={activePath.startsWith("/settings")}
            children={[
              { label: "Organization", path: "/settings/organization" },
              { label: "Users & Permissions", path: "/settings/users" },
              { label: "System Configuration", path: "/settings/system" },
            ]}
          />
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Log out of your account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
