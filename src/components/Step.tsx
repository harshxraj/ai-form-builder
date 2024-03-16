"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Add a prompt",
    description:
      "You need to add a prompt to your form, providing detailed instructions or requirements for users filling out the form. This helps guide users through the form-filling process and ensures clarity on what information is needed.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image src="/s1.png" alt="Step 1" width={500} height={400} />
      </div>
    ),
  },
  {
    title: "Generate the form",
    description:
      "Once you've added the prompt, the form generation process begins. This step involves creating the actual form based on the requirements specified in the prompt. The form can include various input fields, checkboxes, or other elements depending on the information you need to collect",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/s2.png"
          width={300}
          height={400}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Check results, analytics and more.",
    description:
      "After users have filled out the form and submitted their responses, you can access various features such as viewing results, analyzing data, and managing submissions. This step allows you to track the progress of your form, analyze trends, and make informed decisions based on the collected data.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <Image src="/s3.png" width={300} height={400} alt="linear board demo" />
      </div>
    ),
  },
];
export function StickyScrollReveal() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
