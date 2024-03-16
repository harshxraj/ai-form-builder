"use client";

import React, { useEffect, useState } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";
import { addMoreQuestion, publishForm } from "../actions/mutateForm";
import { ThemeChange } from "@/components/ui/ThemeChange";
import FormPublishSucces from "./FormPublishSucces";
import { deleteForm } from "../actions/mutateForm";
import { Trash2, RotateCw, RefreshCcw, Loader, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";
import { db } from "@/db";
import { InferInsertModel, eq } from "drizzle-orm";
import { getCurrentForm } from "../actions/getUserForms";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { forms, questions as dbQuestions, fieldOptions } from "@/db/schema";
const API_KEY = process.env.GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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

interface AllQuestionModel extends Array<string> {}

type Question = InferInsertModel<typeof dbQuestions>;

const Form = (props: Props) => {
  const [prompt, setPrompt] = useState<string>("");
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [currentFormId, setCurrentFormId] = useState({ formID: "", id: 0 });
  const [addingNewFields, setAddingNewFields] = useState(false);
  const [toatalQuestions, setTotalQuestions] = useState(0);
  const [submittingForm, setSubmittingForm] = useState(false);

  const { name, description, questions } = props.form;
  const form = useForm();
  const { editMode } = props;
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [deletingForm, setDeletingForm] = useState(false);
  console.log("props", props);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log(data);
    if (editMode && props.form.formID !== null) {
      await publishForm(props.form.formID);
      setSuccessDialogOpen(true);
    } else {
      setSubmittingForm(true);
      let answers = [];
      for (const [questionId, value] of Object.entries(data)) {
        const id = parseInt(questionId.replace("question_", ""));
        let fieldOptionsId = null;
        let textValue = null;

        if (typeof value == "string" && value.includes("answerId_")) {
          fieldOptionsId = parseInt(value.replace("answerId_", ""));
        } else {
          textValue = value as string;
        }

        answers.push({
          questionId: id,
          fieldOptionsId,
          value: textValue,
        });
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

      const response = await fetch(`${baseUrl}/api/form/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formId: props.form.id, answers }),
      });
      console.log(response);
      if (response.status === 200) {
        router.push(`/forms/${props.form.formID}/success`);
        // setSubmittingForm(false);
      } else {
        console.error("Error submitting form");
        alert("Error submitting form. Please try again later");
        setSubmittingForm(false);
      }
    }
  };

  const handleDialogChange = (open: boolean) => {
    setSuccessDialogOpen(open);
  };

  const handleDeleteForm = async () => {
    try {
      setDeletingForm(true);
      await deleteForm(props.form.formID || "");
      router.push("/view-forms");
    } catch (err) {
      console.log(err);
    } finally {
      setDeletingForm(false);
    }
  };

  const getCurrentFormInfo = async () => {
    try {
      const response = await getCurrentForm(props.form.formID || "");
      if (response) {
        setPrompt(response?.user_prompt || "");
        const currentQuestions = response?.questions
          .map((question) => question.text)
          .filter(Boolean) as AllQuestionModel;
        setAllQuestions(currentQuestions);
        console.log("ALL QUE", response.questions.length);
        setTotalQuestions(response.questions.length);
        setCurrentFormId({ formID: response?.formID || "", id: response.id });
        console.log("RESPONSE", response);
      } else {
        console.log("Form not found.");
      }
    } catch (err) {
      console.log("Error occurred while fetching current form:", err);
    }
  };

  console.log("CURENT FORM", currentFormId);

  const handleAllMoreQuestions = async () => {
    try {
      setAddingNewFields(true);
      const resp = await addMoreQuestion(
        prompt,
        currentFormId.id,
        props.form.formID || "",
        allQuestions.join(",")
      );
      if (resp !== undefined && resp !== null) {
        setAllQuestions((prevQuestions) => [...prevQuestions, ...resp]);
        setTotalQuestions(resp.length || 0);
        router.refresh();
        console.log(resp);
        console.log("Response:", resp);
      } else {
        console.log("Response is undefined or null");
      }
      // setAllQuestions((prevQuestions) => [...prevQuestions, ...resp]);
      // setTotalQuestions(resp?.length || 0);
    } catch (err) {
      console.log(err);
    } finally {
      setAddingNewFields(false);
    }
  };

  useEffect(() => {
    getCurrentFormInfo();
  }, []);
  console.log(allQuestions.length);
  return (
    <div
      className="text-center min-w-[320px] md:min-w-[540px] max-w-[620px] border px-8 py-4 rounded-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-gray-100
    "
    >
      <div className="hidden">
        <ThemeChange />
      </div>
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold py-3 text-red">{name}</h1>

        {editMode && !deletingForm && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2
                  className="hover:text-red-900 hover:cursor-pointer"
                  onClick={handleDeleteForm}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete this form!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {editMode && deletingForm && <RotateCw className="animate-spin" />}
      </div>

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
                      <div className="flex justify-around items-center">
                        <FormLabel className="text-base mt-3 mr-3 flex-1">
                          {index + 1}. {question.text}
                        </FormLabel>
                        {/* <Pencil
                          size={20}
                          className="hover:cursor-pointer"
                          onClick={() => console.log(question)}
                        /> */}
                      </div>
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
          {editMode && toatalQuestions < 8 && (
            <Button
              onClick={handleAllMoreQuestions}
              type="button"
              variant="outline"
              disabled={addingNewFields}
            >
              {!addingNewFields ? (
                <>
                  <PlusIcon className="mr-3 animate-ping" />
                  Generate More Fields
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-3 animate-spin" />
                  Generating...
                </>
              )}
            </Button>
          )}

          <Button type="submit" disabled={submittingForm}>
            {editMode ? (
              "Publish"
            ) : submittingForm ? (
              <>
                <Loader className="mr-3 animate-spin" />
                Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
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
