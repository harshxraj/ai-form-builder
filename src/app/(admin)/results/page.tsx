"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { InferSelectModel } from "drizzle-orm";
import Res from "./Res";
import { forms } from "@/db/schema";
import { getUserForms } from "@/app/actions/getUserForms";
import FormsPicker from "./FormPicker";

type Props = {};

const Page = (props: Props) => {
  const [selectOptions, setSelectOptions] = useState<
    { label: string; value: number }[]
  >([]);

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
      {selectOptions.length > 0 && <FormsPicker options={selectOptions} />}
      <Res />
    </NextUIProvider>
  );
};

export default Page;
