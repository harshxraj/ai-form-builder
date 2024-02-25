import Image from "next/image";
import { Button } from "@/components/ui/button";
import FormGenerator from "./form-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FormGenerator />
    </main>
  );
}
