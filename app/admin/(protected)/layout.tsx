import ClientAuthGuard from "@/components/ClientAuthGuard";
import AdminProviders from "./AdminProviders";

export const metadata = {
  title: 'Admin Dashboard - Alumni Portal System',
  description: 'Manage your organization\'s alumni portal',
};

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <ClientAuthGuard>
        {children}
      </ClientAuthGuard>
    </AdminProviders>
  );
}
