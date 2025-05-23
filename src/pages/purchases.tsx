import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PurchasesList from "@/components/purchases/PurchasesList";

const Purchases = () => {
  return (
    <MainLayout
      title="Purchases"
      description="Manage purchase orders, requirements, and receptions."
    >
      <PurchasesList />
    </MainLayout>
  );
};

export default Purchases;
