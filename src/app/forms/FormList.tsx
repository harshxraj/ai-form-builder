import React from "react";
import { forms } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Form = InferSelectModel<typeof forms>;

type Props = {
  forms: Form[];
};

const FormList = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 m-5 p-4 gap-4">
      {props.forms.map((form: Form) => (
        <Card
          key={form.id}
          className="max-w-[350px] flex flex-col justify-center"
        >
          <CardHeader>
            <CardTitle className="font-normal">{form.name}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link className="w-1/2" href={`/forms/edit/${form.formID}`}>
              <div className="flex justify-center">
                <Button className="w-1/2">View</Button>
              </div>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FormList;
