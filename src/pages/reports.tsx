import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ReportsList from "@/components/reports/ReportsList";

const Reports = () => {
  return (
    <MainLayout
      title="Reports"
      description="Access operational, financial, and management reports."
    >
      <ReportsList />
    </MainLayout>
  );
};

export default Reports;
