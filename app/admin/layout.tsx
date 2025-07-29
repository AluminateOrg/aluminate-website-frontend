import AdminProviders from "./AdminProviders";

export const metadata = {
  title: 'Admin Dashboard - Alumni Portal System',
  description: 'Manage your organization\'s alumni portal',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminProviders>{children}</AdminProviders>;
}
