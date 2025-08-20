import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AltBin - Dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}