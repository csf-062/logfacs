import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import InventoryList from "@/components/inventory/InventoryList";

const Inventory = () => {
  return (
    <MainLayout
      title="Inventory"
      description="Manage your stock, warehouses, and inventory movements."
    >
      <InventoryList />
    </MainLayout>
  );
};

export default Inventory;
