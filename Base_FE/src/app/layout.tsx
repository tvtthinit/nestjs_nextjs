import 'antd/dist/reset.css';
import './globals.css';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}