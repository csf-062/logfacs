import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AccountingList from "@/components/accounting/AccountingList";

const Accounting = () => {
  return (
    <MainLayout
      title="Accounting"
      description="Manage financial transactions, ledgers, and statements."
    >
      <AccountingList />
    </MainLayout>
  );
};

export default Accounting;
