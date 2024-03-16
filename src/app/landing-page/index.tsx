"use client";

import React from "react";
import Image from "next/image";
import FormGenerator from "../form-generator";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { StickyScrollReveal } from "@/components/Step";

type Props = {};

const LandingPage: React.FC<Props> = (props) => {
  return (
    <div>
      <BackgroundBeams />
      <section className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full">
        <h1 className="text-3xl text-center tracking-tighter sm:text-3xl md:text-6xl leading-6">
          Say goodbye to form-building headaches! <br />
        </h1>
        <p className="max-w-[600px] mt-4 text-center text-gray-500 md:text-xl sm:text-sm">
          Generate, publish, and share your forms with the power of AI. Explore
          insightful results, charts, and analytics effortlessly.
        </p>
        <FormGenerator />
        <div className="w-full h-24"></div>
      </section>
      
      {/* <StickyScrollReveal /> */}
      {/* <div className="flex flex-col gap-4 m-auto">
        <div className="flex items-center flex-col md:flex-row lg:flex-row">
          <div className="w-[80%] mb-4">
            <h1 className="text-4xl mb-4">Add a prompt</h1>
            Add a prompt to your form, providing detailed instructions or
            requirements for users filling out the form.
          </div>
          <div>
            <Image src="/s1.png" alt="Step 1" width={400} height={400} />
          </div>
        </div>

        <div className="flex items-center flex-col md:flex-row lg:flex-row">
          <div className="w-[80%] mb-4">
            <h1 className="text-4xl mb-4">Generate the form</h1>
            Once you've added the prompt, You will get form, that can include
            various input fields, checkboxes, or other elements depending on the
            information you need to collect
          </div>
          <div>
            <Image src="/s2.png" alt="Step 1" width={400} height={400} />
          </div>
        </div>

        <div className="flex items-center flex-col md:flex-row lg:flex-row">
          <div className="w-[80%] mb-4">
            <h1 className="text-4xl mb-4">Generate more fields</h1>
            You can generate more fields by clicking on "Generate more fields."
          </div>
          <div>
            <Image src="/s4.png" alt="Step 1" width={400} height={400} />
          </div>
        </div>

        <div className="flex items-center flex-col md:flex-row lg:flex-row">
          <div className="w-[80%] mb-4">
            <h1 className="text-4xl mb-4">Generate the form</h1>
            Once you've added the prompt, You will get form, that can include
            various input fields, checkboxes, or other elements depending on the
            information you need to collect
          </div>
          <div>
            <Image src="/s1.png" alt="Step 1" width={400} height={400} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LandingPage;
