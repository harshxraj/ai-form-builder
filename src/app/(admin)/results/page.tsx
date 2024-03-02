"use client";

import React, { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Res from "./Res";
import { getUserForms } from "@/app/actions/getUserForms";
import FormsPicker from "./FormPicker";
import { InferSelectModel } from "drizzle-orm";
import {
  forms,
  answers,
  formSubmissions,
  questions,
  fieldOptions,
} from "@/db/schema";

type Props = {};
type FieldOption = InferSelectModel<typeof fieldOptions>;

type Answer = InferSelectModel<typeof answers> & {
  fieldOption?: FieldOption | null;
};

type Question = InferSelectModel<typeof questions> & {
  fieldOptions: FieldOption[];
};

type FormSubmission = InferSelectModel<typeof formSubmissions> & {
  answers: Answer[];
};

export type Form =
  | (InferSelectModel<typeof forms> & {
      questions: Question[];
      submissions: FormSubmission[];
    })
  | undefined;

interface TableProps {
  data: FormSubmission[];
  columns: Question[];
}

const Page = (props: Props) => {
  const [selectOptions, setSelectOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [data, setData] = useState<TableProps | null>(null);
  const [cols, setCols] = useState<Question[] | null>(null);
  const [rows, setRows] = useState<FormSubmission[] | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const userForms: Array<InferSelectModel<typeof forms>> =
          await getUserForms();
        const options: { label: string; value: number }[] = userForms
          .filter((form) => form.name !== null) // Filter out forms with null names
          .map((form) => ({
            label: form.name!,
            value: form.id,
          }));
        setSelectOptions(options);
        console.log("userForms", userForms);
      } catch (err) {
        console.log(err);
      }
    };

    fetchForms();
  }, []);

  return (
    <NextUIProvider>
      {selectOptions.length > 0 && (
        <FormsPicker
          options={selectOptions}
          setData={setData}
          setCols={setCols}
          setRows={setRows}
        />
      )}
      <Res data={data} cols={cols} rows={rows} />
    </NextUIProvider>
  );
};

export default Page;
