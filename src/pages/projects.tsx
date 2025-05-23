import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProjectsList from "@/components/projects/ProjectsList";

const Projects = () => {
  return (
    <MainLayout
      title="Projects"
      description="Manage and track all your logistics projects."
    >
      <ProjectsList />
    </MainLayout>
  );
};

export default Projects;
