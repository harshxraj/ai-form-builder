import React from "react";
import FormList from "@/app/forms/FormList";
import { getUserForms } from "@/app/actions/getUserForms";
import { InferSelectModel } from "drizzle-orm";
import { forms as dbForms } from "@/db/schema";

type Props = {};

const page = async (props: Props) => {
  const forms: InferSelectModel<typeof dbForms>[] = await getUserForms();
  return (
    <div>
      <h1 className="text-4xl font-normal px-4 m-5">My Forms</h1>
      <FormList forms={forms} />
    </div>
  );
};

export default page;
