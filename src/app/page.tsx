import Image from "next/image";
import { Button } from "@/components/ui/button";
import FormGenerator from "./form-generator";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg:dark">
        <h1 className="text-5xl">AI Form Builder</h1>
        <FormGenerator />
        <h1></h1>
      </main>
    </SessionProvider>
  );
}
