"use client";

import React, { useState } from "react";
import {
  FormSelectModel,
  QuestionSelectModel,
  FieldOptionSelectModel,
} from "@/types/form-types";
import {
  Form as FormComponent,
  FormField as ShadcdnFormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { publishForm } from "../actions/mutateForm";
import { ThemeChange } from "@/components/ui/ThemeChange";
import FormPublishSucces from "./FormPublishSucces";

type Props = {
  form: Form;
  editMode?: boolean;
};

type QuestionWithOptionsModel = QuestionSelectModel & {
  fieldOptions: Array<FieldOptionSelectModel>;
};

interface Form extends FormSelectModel {
  questions: Array<QuestionWithOptionsModel>;
}

const Form = (props: Props) => {
  const { name, description, questions } = props.form;
  const form = useForm();
  const { editMode } = props;
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  console.log("props", props);

  const onSubmit = async (data: any) => {
    console.log(props.form.formID);
    if (editMode && props.form.formID !== null) {
      await publishForm(props.form.formID);
      setSuccessDialogOpen(true);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setSuccessDialogOpen(open);
  };
  return (
    <div
      className="text-center min-w-[520px] max-w-[620px] border px-8 py-4 rounded-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-gray-100
    "
    >
      <div className="hidden">
        <ThemeChange />
      </div>
      <h1 className="text-3xl font-semibold py-3">{name}</h1>
      <h3 className="text-md italic">{description}</h3>
      <FormComponent {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-3xl items-center gap-6 my-4 text-left"
        >
          {questions.map(
            (question: QuestionWithOptionsModel, index: number) => {
              return (
                <ShadcdnFormField
                  control={form.control}
                  name={`question_${question.id}`}
                  key={`${question.text}_${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base mt-3 mr-3">
                        {index + 1}. {question.text}
                      </FormLabel>
                      <FormControl>
                        <FormField
                          element={question}
                          key={index}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              );
            }
          )}
          <Button type="submit">{editMode ? "Publish" : "Submit"}</Button>
        </form>
      </FormComponent>
      <FormPublishSucces
        formId={props.form.formID || ""}
        open={successDialogOpen}
        onOpenChange={handleDialogChange}
      />
    </div>
  );
};

export default Form;
