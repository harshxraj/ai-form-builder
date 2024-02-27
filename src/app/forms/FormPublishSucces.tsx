"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { error } from "console";
import { Link2Icon } from "@radix-ui/react-icons";

type Props = {
  formId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FormPublishSucces = (props: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${baseUrl}/forms/${props.formId}`)
      .then(() => alert("Copied to clipboard"))
      .catch((error) => alert("Failed to copy!"));
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Form Has Been Published Successfully!</DialogTitle>
          <DialogDescription>
            Your Form is now live and ready to be filled out by your users. You
            can now share your form using the link below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <p>Copy Link</p>
        </div>
        <div className="border-2 border-gray-200 flex justify-between items-center mt-2 pl-2 rounded-md">
          <Link2Icon className="h-5 w-5 mr-2" />
          <input
            className="w-full outline-none bg-transparent"
            type="text"
            placeholder="link"
            disabled
            value={`${baseUrl}/forms/${props.formId}`}
          />{" "}
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormPublishSucces;
