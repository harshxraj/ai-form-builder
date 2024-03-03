import Image from "next/image";
import { Button } from "@/components/ui/button";
import FormGenerator from "./form-generator";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import LandingPage from "./landing-page";

export default async function Home() {
  return (
    <SessionProvider>
      <Header />

      <main className="flex min-h-screen flex-col items-center relative p-24 bg:dark z-10 antialiased">
        <LandingPage />
      </main>
    </SessionProvider>
  );
}
