import React from "react";
import { Toaster } from "@/components/ui/toaster";

const FormEditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </main>
      <Toaster />
    </>
  );
};

export default FormEditLayout;
