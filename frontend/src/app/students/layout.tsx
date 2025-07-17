"use client";
import type { ReactNode } from "react";
import AppLayout from "@/components/AppLayout";

export default function StudentRegistrationLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}