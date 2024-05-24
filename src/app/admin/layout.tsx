import React from "react";
import AdminSidebar from "./AdminSidebar";
import type { Metadata } from "next";

interface AdminDashboardLayoutProps {
  children: React.ReactNode
}
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is Admin Dashboard",
};


const AdminDashboardLayout = ({
  children,
}:AdminDashboardLayoutProps) => {
  return (
    <div className="verflow-height flex items-start justify-between overflow-hidden ">
      <div className="min-h-[calc(100vh-150px)] overflow-hidden w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>
      <div className="overflow-hidden w-full lg:w-4/5 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}

export default AdminDashboardLayout