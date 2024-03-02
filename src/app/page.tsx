import Image from "next/image";
import { Button } from "@/components/ui/button";
import FormGenerator from "./form-generator";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";
import { db } from "@/db";
import { forms as dbForms } from "@/db/schema";
import FormList from "@/forms/FormList";
import { v4 as uuidv4 } from "uuid";

export default async function Home() {
  const fetchedForms = await db.query.forms.findMany();
  console.log(fetchedForms);
  console.log("uuid", uuidv4());
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24 bg:dark">
        <h1 className="text-5xl">AI Form Builder</h1>
        <FormGenerator />
      </main>
    </SessionProvider>
  );
}
