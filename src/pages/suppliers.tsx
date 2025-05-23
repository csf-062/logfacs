import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SuppliersList from "@/components/suppliers/SuppliersList";

const Suppliers = () => {
  return (
    <MainLayout
      title="Suppliers"
      description="Manage your suppliers, contacts, and evaluations."
    >
      <SuppliersList />
    </MainLayout>
  );
};

export default Suppliers;
