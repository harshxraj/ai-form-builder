"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Link2Icon, CopyIcon } from "@radix-ui/react-icons";

type Props = {
  formId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FormPublishSucces = (props: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(`${baseUrl}/forms/${props.formId}`)
      .then(() => {
        toast({
          description: "Link Copied To Clipboard!",
        });
      })
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
        <div className="flex justify-between items-center mt-2 gap-2 rounded-md">
          <Link2Icon className="h-5 w-5 mr-2" />
          <input
            className="w-full outline-none bg-transparent border-2 px-2 rounded-md border-gray-200"
            type="text"
            placeholder="link"
            disabled
            value={`${baseUrl}/forms/${props.formId}`}
          />{" "}
          <DialogClose asChild className="hover:cursor-pointer">
            <CopyIcon onClick={copyToClipboard} className="h-6 w-6" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormPublishSucces;
