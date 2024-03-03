"use client";

import React from "react";
import Image from "next/image";
import FormGenerator from "../form-generator";
import { BackgroundBeams } from "@/components/ui/background-beams";

type Props = {};

const LandingPage: React.FC<Props> = (props) => {
  return (
    <div>
      <BackgroundBeams />
      <section className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full">
        <h1 className="text-4xl text-center tracking-tighter sm:text-5xl md:text-6xl leading-6">
          Create your forms <br />
          in seconds not hours
        </h1>
        <p className="max-w-[600px] mt-4 text-center text-gray-500 md:text-xl">
          Generate, publish and share your form right away with AI. Dive into
          insightful results, charts and analytics.
        </p>
        <FormGenerator />
        <div className="w-full h-24"></div>
      </section>
      <section
        className="flex flex-col items-center justify-center space-y-4 mt-12 pb-24"
        id="features"
      >
        <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl">
          How It Works
        </h2>
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl text-center">
          <li className="flex flex-col items-center space-y-4 relative">
            <p>1. Add a prompt and describe the requirements for your form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            <p>2. Generate the form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            <p>3. Check results, analytics and more.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
