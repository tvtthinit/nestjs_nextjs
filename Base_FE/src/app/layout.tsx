"use client";

import 'antd/dist/reset.css';
import './globals.css';
import React from "react";
import { usePathname } from "next/navigation";
import AdminLayout from '@/components/layout/AdminLayout';
import BooksLayout from '@/components/layout/BooksLayout';
import LoginLayout from '@/components/layout/LoginLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getLayout = () => {
    if (pathname.startsWith("/admin")) return <AdminLayout>{children}</AdminLayout>;
    if (pathname.startsWith("/login")) return <LoginLayout>{children}</LoginLayout>;
    return <BooksLayout>{children}</BooksLayout>;
  };

  return (
    <html lang="en">
      <body>{getLayout()}</body>
    </html>
  );
}