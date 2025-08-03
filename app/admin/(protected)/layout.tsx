import ClientAuthGuard from "@/components/ClientAuthGuard";
import AdminProviders from "../../../components/admin/AdminProviders";
import PackageStatusGuard from "@/components/PackageStatusGuard";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: 'Admin Dashboard - Alumni Portal System',
  description: 'Manage your organization\'s alumni portal',
};

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <AuthProvider>
      <ClientAuthGuard>
        <PackageStatusGuard>
          {children}
        </PackageStatusGuard>
      </ClientAuthGuard>
      </AuthProvider>
    </AdminProviders>
  );
}
