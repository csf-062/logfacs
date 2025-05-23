import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SettingsList from "@/components/settings/SettingsList";

const Settings = () => {
  return (
    <MainLayout
      title="Settings"
      description="Configure your organization, users, and system settings."
    >
      <SettingsList />
    </MainLayout>
  );
};

export default Settings;
